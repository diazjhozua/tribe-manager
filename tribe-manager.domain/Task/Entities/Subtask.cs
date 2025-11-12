using tribe_manager.domain.Common.Models;
using tribe_manager.domain.Task.ValueObjects;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.domain.Task.Entities;

public sealed class Subtask : Entity<TaskId>
{
    public string Title { get; private set; }
    public TaskPoints Points { get; private set; }
    public bool IsCompleted { get; private set; }
    public DateTime? CompletedDateTime { get; private set; }
    public UserId? CompletedByUserId { get; private set; }
    public bool PointsAwarded { get; private set; }

    // Parameterless constructor for EF Core
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    private Subtask() : base()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    {
    }

    private Subtask(
        TaskId id,
        string title,
        TaskPoints points) : base(id)
    {
        Title = title;
        Points = points;
        IsCompleted = false;
        CompletedDateTime = null;
        CompletedByUserId = null;
        PointsAwarded = false;
    }

    public static Subtask Create(string title, TaskPoints points)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Subtask title cannot be null or empty.", nameof(title));

        if (title.Length > 200)
            throw new ArgumentException("Subtask title cannot exceed 200 characters.", nameof(title));

        return new Subtask(
            TaskId.CreateNew(),
            title.Trim(),
            points);
    }

    public void UpdateTitle(string newTitle)
    {
        if (string.IsNullOrWhiteSpace(newTitle))
            throw new ArgumentException("Subtask title cannot be null or empty.", nameof(newTitle));

        if (newTitle.Length > 200)
            throw new ArgumentException("Subtask title cannot exceed 200 characters.", nameof(newTitle));

        Title = newTitle.Trim();
    }

    public void UpdatePoints(TaskPoints newPoints)
    {
        if (IsCompleted && PointsAwarded)
            throw new InvalidOperationException("Cannot update points for a completed subtask where points have already been awarded.");

        Points = newPoints;
    }

    public void MarkAsCompleted(UserId completedByUserId)
    {
        if (IsCompleted)
            throw new InvalidOperationException("Subtask is already completed.");

        IsCompleted = true;
        CompletedDateTime = DateTime.UtcNow;
        CompletedByUserId = completedByUserId;
    }

    public void MarkAsIncomplete()
    {
        if (PointsAwarded)
            throw new InvalidOperationException("Cannot mark subtask as incomplete after points have been awarded.");

        IsCompleted = false;
        CompletedDateTime = null;
        CompletedByUserId = null;
    }

    public void AwardPoints()
    {
        if (!IsCompleted)
            throw new InvalidOperationException("Cannot award points for an incomplete subtask.");

        if (PointsAwarded)
            throw new InvalidOperationException("Points have already been awarded for this subtask.");

        PointsAwarded = true;
    }

    public void RevokePoints()
    {
        if (!PointsAwarded)
            throw new InvalidOperationException("Points have not been awarded for this subtask.");

        PointsAwarded = false;
    }
}