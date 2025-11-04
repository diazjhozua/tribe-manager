using tribe_manager.domain.Common.Models;
using tribe_manager.domain.Task.ValueObjects;
using tribe_manager.domain.Tribe.Enums;
using tribe_manager.domain.Tribe.ValueObjects;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.domain.Tribe.Entities;

public sealed class Tribe : AggregateRoot<TribeId>
{
    public string Name { get; private set; }
    public string Description { get; private set; }
    public TribeStatus Status { get; private set; }
    public string? Color { get; private set; }
    public string? AvatarUrl { get; private set; }
    public TribeSettings Settings { get; private set; }
    public TribeStatistics Statistics { get; private set; }
    public DateTime CreatedDateTime { get; private set; }
    public DateTime UpdatedDateTime { get; private set; }

    private readonly List<TribeMember> _members;
    private readonly List<TaskId> _taskIds;

    public IReadOnlyList<TribeMember> Members => _members.AsReadOnly();
    public IReadOnlyList<TaskId> TaskIds => _taskIds.AsReadOnly();

    private Tribe(
        TribeId id,
        string name,
        string description,
        string? color = null,
        string? avatarUrl = null,
        TribeSettings? settings = null) : base(id)
    {
        Name = name;
        Description = description;
        Status = TribeStatus.Active;
        Color = color;
        AvatarUrl = avatarUrl;
        Settings = settings ?? TribeSettings.Default;
        Statistics = TribeStatistics.Empty;
        CreatedDateTime = DateTime.UtcNow;
        UpdatedDateTime = DateTime.UtcNow;
        _members = new List<TribeMember>();
        _taskIds = new List<TaskId>();
    }

    public static Tribe Create(
        string name,
        string description,
        string? color = null,
        string? avatarUrl = null,
        TribeSettings? settings = null)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Tribe name cannot be null or empty.", nameof(name));

        if (string.IsNullOrWhiteSpace(description))
            throw new ArgumentException("Tribe description cannot be null or empty.", nameof(description));

        return new Tribe(
            TribeId.CreateNew(),
            name.Trim(),
            description.Trim(),
            color?.Trim(),
            avatarUrl?.Trim(),
            settings);
    }

    public void UpdateDetails(string name, string description, string? color = null, string? avatarUrl = null)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Tribe name cannot be null or empty.", nameof(name));

        if (string.IsNullOrWhiteSpace(description))
            throw new ArgumentException("Tribe description cannot be null or empty.", nameof(description));

        Name = name.Trim();
        Description = description.Trim();
        Color = color?.Trim();
        AvatarUrl = avatarUrl?.Trim();
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void UpdateSettings(TribeSettings newSettings)
    {
        Settings = newSettings ?? throw new ArgumentNullException(nameof(newSettings));
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void AddMember(UserId userId, MemberRole role = MemberRole.Member)
    {
        if (_members.Any(m => m.Id == userId))
            throw new InvalidOperationException($"User {userId} is already a member of this tribe.");

        if (_members.Count >= Settings.MaxMembers)
            throw new InvalidOperationException($"Tribe has reached maximum capacity of {Settings.MaxMembers} members.");

        var member = TribeMember.Create(userId, role);
        _members.Add(member);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void RemoveMember(UserId userId)
    {
        var member = _members.FirstOrDefault(m => m.Id == userId);
        if (member == null)
            throw new InvalidOperationException($"User {userId} is not a member of this tribe.");

        // Ensure at least one leader remains
        if (member.Role == MemberRole.TribeLeader &&
            _members.Count(m => m.Role == MemberRole.TribeLeader) == 1)
        {
            throw new InvalidOperationException("Cannot remove the last tribe leader. Assign another leader first.");
        }

        _members.Remove(member);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void ChangeStatus(TribeStatus newStatus)
    {
        Status = newStatus;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void ChangeMemberRole(UserId userId, MemberRole newRole)
    {
        var member = GetMember(userId);

        // Ensure at least one leader remains
        if (member.Role == MemberRole.TribeLeader &&
            newRole != MemberRole.TribeLeader &&
            _members.Count(m => m.Role == MemberRole.TribeLeader) == 1)
        {
            throw new InvalidOperationException("Cannot change role of the last tribe leader. Assign another leader first.");
        }

        member.ChangeRole(newRole);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void AddTask(TaskId taskId)
    {
        if (_taskIds.Contains(taskId))
            throw new InvalidOperationException($"Task {taskId} is already associated with this tribe.");

        _taskIds.Add(taskId);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void RemoveTask(TaskId taskId)
    {
        if (!_taskIds.Remove(taskId))
            throw new InvalidOperationException($"Task {taskId} is not associated with this tribe.");

        UpdatedDateTime = DateTime.UtcNow;
    }

    public void AwardPointsToMember(UserId userId, TaskId taskId, int points, string reason, TaskId? subtaskId = null)
    {
        var member = GetMember(userId);
        member.AwardPoints(taskId, points, reason, subtaskId);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void UpdateStatistics(TribeStatistics newStatistics)
    {
        Statistics = newStatistics ?? throw new ArgumentNullException(nameof(newStatistics));
        UpdatedDateTime = DateTime.UtcNow;
    }

    public bool CanUserJoin(UserId userId)
    {
        return Settings.AllowSelfJoin &&
               !_members.Any(m => m.Id == userId) &&
               _members.Count < Settings.MaxMembers;
    }

    public bool HasMember(UserId userId) => _members.Any(m => m.Id == userId);

    public TribeMember GetMember(UserId userId)
    {
        var member = _members.FirstOrDefault(m => m.Id == userId);
        return member ?? throw new InvalidOperationException($"User {userId} is not a member of this tribe.");
    }

    public bool CanUserPerformAction(UserId userId, Permission requiredPermission)
    {
        if (!HasMember(userId))
            return false;

        var member = GetMember(userId);
        return member.HasPermission(requiredPermission);
    }

    public IEnumerable<TribeMember> GetLeaders() =>
        _members.Where(m => m.Role == MemberRole.TribeLeader);

    public int GetTotalPointsEarned() =>
        _members.Sum(m => m.PointsEarned.TotalPoints);

    public int GetCurrentSprintPoints() =>
        _members.Sum(m => m.PointsEarned.CurrentSprintPoints);
}