using tribe_manager.domain.Common.Models;
using tribe_manager.domain.Task.Enums;
using tribe_manager.domain.Task.ValueObjects;
using tribe_manager.domain.Tribe.ValueObjects;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.domain.Task.Entities;

public sealed class Task : AggregateRoot<TaskId>
{
    public string Title { get; private set; }
    public string Description { get; private set; }
    public WorkItemStatus Status { get; private set; }
    public TaskPriority Priority { get; private set; }
    public TribeId TribeId { get; private set; }
    public UserId CreatedByUserId { get; private set; }
    public TaskPoints Points { get; private set; }
    public int EstimatedHours { get; private set; }
    public int ActualHours { get; private set; }
    public DateTime? DueDate { get; private set; }
    public DateTime CreatedDateTime { get; private set; }
    public DateTime UpdatedDateTime { get; private set; }

    private readonly List<UserId> _assignedToUserIds;
    private readonly List<string> _tags;
    private readonly List<TaskComment> _comments;
    private readonly List<TaskAttachment> _attachments;
    private readonly List<Subtask> _subtasks;

    public IReadOnlyList<UserId> AssignedToUserIds => _assignedToUserIds.AsReadOnly();
    public IReadOnlyList<string> Tags => _tags.AsReadOnly();
    public IReadOnlyList<TaskComment> Comments => _comments.AsReadOnly();
    public IReadOnlyList<TaskAttachment> Attachments => _attachments.AsReadOnly();
    public IReadOnlyList<Subtask> Subtasks => _subtasks.AsReadOnly();

    // Parameterless constructor for EF Core
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    private Task() : base()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    {
        _assignedToUserIds = new List<UserId>();
        _tags = new List<string>();
        _comments = new List<TaskComment>();
        _attachments = new List<TaskAttachment>();
        _subtasks = new List<Subtask>();
    }

    private Task(
        TaskId id,
        string title,
        string description,
        TribeId tribeId,
        UserId createdByUserId,
        TaskPoints points,
        TaskPriority priority = TaskPriority.Medium,
        int estimatedHours = 0,
        DateTime? dueDate = null) : base(id)
    {
        Title = title;
        Description = description;
        Status = WorkItemStatus.Pending;
        Priority = priority;
        TribeId = tribeId;
        CreatedByUserId = createdByUserId;
        Points = points;
        EstimatedHours = estimatedHours;
        ActualHours = 0;
        DueDate = dueDate;
        CreatedDateTime = DateTime.UtcNow;
        UpdatedDateTime = DateTime.UtcNow;

        _assignedToUserIds = new List<UserId>();
        _tags = new List<string>();
        _comments = new List<TaskComment>();
        _attachments = new List<TaskAttachment>();
        _subtasks = new List<Subtask>();
    }

    public static Task Create(
        string title,
        string description,
        TribeId tribeId,
        UserId createdByUserId,
        TaskPoints points,
        TaskPriority priority = TaskPriority.Medium,
        int estimatedHours = 0,
        DateTime? dueDate = null)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Task title cannot be null or empty.", nameof(title));

        if (string.IsNullOrWhiteSpace(description))
            throw new ArgumentException("Task description cannot be null or empty.", nameof(description));

        if (estimatedHours < 0)
            throw new ArgumentException("Estimated hours cannot be negative.", nameof(estimatedHours));

        if (dueDate.HasValue && dueDate.Value <= DateTime.UtcNow)
            throw new ArgumentException("Due date must be in the future.", nameof(dueDate));

        return new Task(
            TaskId.CreateNew(),
            title.Trim(),
            description.Trim(),
            tribeId,
            createdByUserId,
            points,
            priority,
            estimatedHours,
            dueDate);
    }

    public void UpdateDetails(string title, string description, int estimatedHours = 0, DateTime? dueDate = null)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Task title cannot be null or empty.", nameof(title));

        if (string.IsNullOrWhiteSpace(description))
            throw new ArgumentException("Task description cannot be null or empty.", nameof(description));

        if (estimatedHours < 0)
            throw new ArgumentException("Estimated hours cannot be negative.", nameof(estimatedHours));

        if (dueDate.HasValue && dueDate.Value <= DateTime.UtcNow)
            throw new ArgumentException("Due date must be in the future.", nameof(dueDate));

        Title = title.Trim();
        Description = description.Trim();
        EstimatedHours = estimatedHours;
        DueDate = dueDate;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void ChangeStatus(WorkItemStatus newStatus)
    {
        if (newStatus == WorkItemStatus.Completed && _subtasks.Any(s => !s.IsCompleted))
            throw new InvalidOperationException("Cannot complete task while subtasks are incomplete.");

        Status = newStatus;
        UpdatedDateTime = DateTime.UtcNow;

        // Auto-adjust priority for overdue tasks
        if (IsOverdue() && Status != WorkItemStatus.Completed && Status != WorkItemStatus.Cancelled)
        {
            Priority = TaskPriority.High;
        }
    }

    public void ChangePriority(TaskPriority newPriority)
    {
        Priority = newPriority;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void AssignToUsers(params UserId[] userIds)
    {
        if (userIds == null || userIds.Length == 0)
            throw new ArgumentException("At least one user must be assigned.", nameof(userIds));

        _assignedToUserIds.Clear();
        _assignedToUserIds.AddRange(userIds.Distinct());
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void AddAssignee(UserId userId)
    {
        if (_assignedToUserIds.Contains(userId))
            throw new InvalidOperationException($"User {userId} is already assigned to this task.");

        _assignedToUserIds.Add(userId);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void RemoveAssignee(UserId userId)
    {
        if (!_assignedToUserIds.Remove(userId))
            throw new InvalidOperationException($"User {userId} is not assigned to this task.");

        UpdatedDateTime = DateTime.UtcNow;
    }

    public void AddTag(string tag)
    {
        if (string.IsNullOrWhiteSpace(tag))
            throw new ArgumentException("Tag cannot be null or empty.", nameof(tag));

        var normalizedTag = tag.Trim().ToLowerInvariant();
        if (_tags.Contains(normalizedTag))
            throw new InvalidOperationException($"Tag '{tag}' already exists.");

        _tags.Add(normalizedTag);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void RemoveTag(string tag)
    {
        if (string.IsNullOrWhiteSpace(tag))
            throw new ArgumentException("Tag cannot be null or empty.", nameof(tag));

        var normalizedTag = tag.Trim().ToLowerInvariant();
        if (!_tags.Remove(normalizedTag))
            throw new InvalidOperationException($"Tag '{tag}' does not exist.");

        UpdatedDateTime = DateTime.UtcNow;
    }

    public void AddComment(UserId userId, string content)
    {
        var comment = TaskComment.Create(userId, content);
        _comments.Add(comment);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void AddAttachment(string fileName, string filePath, UserId uploadedByUserId, long fileSizeBytes, string? contentType = null)
    {
        var attachment = TaskAttachment.Create(fileName, filePath, uploadedByUserId, fileSizeBytes, contentType);
        _attachments.Add(attachment);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void RemoveAttachment(TaskId attachmentId)
    {
        var attachment = _attachments.FirstOrDefault(a => a.Id == attachmentId);
        if (attachment == null)
            throw new InvalidOperationException($"Attachment {attachmentId} not found.");

        _attachments.Remove(attachment);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void AddSubtask(string title, TaskPoints points)
    {
        var subtask = Subtask.Create(title, points);
        _subtasks.Add(subtask);

        // Recalculate total points
        RecalculatePoints();
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void RemoveSubtask(TaskId subtaskId)
    {
        var subtask = _subtasks.FirstOrDefault(s => s.Id == subtaskId);
        if (subtask == null)
            throw new InvalidOperationException($"Subtask {subtaskId} not found.");

        if (subtask.PointsAwarded)
            throw new InvalidOperationException("Cannot remove subtask after points have been awarded.");

        _subtasks.Remove(subtask);
        RecalculatePoints();
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void CompleteSubtask(TaskId subtaskId, UserId completedByUserId)
    {
        var subtask = GetSubtask(subtaskId);
        subtask.MarkAsCompleted(completedByUserId);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void UpdateActualHours(int hours)
    {
        if (hours < 0)
            throw new ArgumentException("Actual hours cannot be negative.", nameof(hours));

        ActualHours = hours;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public bool IsOverdue() => DueDate.HasValue && DateTime.UtcNow > DueDate.Value;

    public bool IsAssignedToUser(UserId userId) => _assignedToUserIds.Contains(userId);

    public int GetCompletedSubtasksCount() => _subtasks.Count(s => s.IsCompleted);

    public double GetCompletionPercentage()
    {
        if (_subtasks.Count == 0) return Status == WorkItemStatus.Completed ? 100 : 0;
        return (double)GetCompletedSubtasksCount() / _subtasks.Count * 100;
    }

    public Subtask GetSubtask(TaskId subtaskId)
    {
        var subtask = _subtasks.FirstOrDefault(s => s.Id == subtaskId);
        return subtask ?? throw new InvalidOperationException($"Subtask {subtaskId} not found.");
    }

    private void RecalculatePoints()
    {
        var totalSubtaskPoints = _subtasks.Sum(s => s.Points.Value);
        if (totalSubtaskPoints > 0)
        {
            Points = TaskPoints.Create(totalSubtaskPoints);
        }
    }
}