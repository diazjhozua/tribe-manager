using tribe_manager.domain.Common.Models;
using tribe_manager.domain.Tribe.Enums;
using tribe_manager.domain.Tribe.ValueObjects;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.domain.Tribe.Entities;

public sealed class TribeMember : Entity<UserId>
{
    public MemberRole Role { get; private set; }
    public Permission Permissions { get; private set; }
    public DateTime JoinedDateTime { get; private set; }
    public PointsEarned PointsEarned { get; private set; }

    private TribeMember(
        UserId userId,
        MemberRole role,
        DateTime? joinedDateTime = null) : base(userId)
    {
        Role = role;
        Permissions = GetPermissionsForRole(role);
        JoinedDateTime = joinedDateTime ?? DateTime.UtcNow;
        PointsEarned = ValueObjects.PointsEarned.Create();
    }

    public static TribeMember Create(UserId userId, MemberRole role)
    {
        return new TribeMember(userId, role);
    }

    public void ChangeRole(MemberRole newRole)
    {
        Role = newRole;
        Permissions = GetPermissionsForRole(newRole);
    }

    public void AwardPoints(Task.ValueObjects.TaskId taskId, int points, string reason, Task.ValueObjects.TaskId? subtaskId = null)
    {
        PointsEarned = PointsEarned.AddPoints(taskId, points, reason, subtaskId);
    }

    public void ResetSprintPoints()
    {
        PointsEarned = PointsEarned.ResetSprintPoints();
    }

    public bool HasPermission(Permission permission)
    {
        return Permissions.HasFlag(permission);
    }

    private static Permission GetPermissionsForRole(MemberRole role)
    {
        return role switch
        {
            MemberRole.Observer => Permission.ObserverPermissions,
            MemberRole.Member => Permission.MemberPermissions,
            MemberRole.TribeLeader => Permission.LeaderPermissions,
            _ => Permission.None
        };
    }
}