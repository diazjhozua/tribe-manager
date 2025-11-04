using tribe_manager.domain.Common.Models;
using tribe_manager.domain.Task.ValueObjects;

namespace tribe_manager.domain.Tribe.ValueObjects;

public sealed class PointsEarned : ValueObject
{
    public int TotalPoints { get; private set; }
    public int CurrentSprintPoints { get; private set; }
    public int LastSprintPoints { get; private set; }
    public IReadOnlyList<PointHistoryEntry> PointHistory { get; private set; }

    private readonly List<PointHistoryEntry> _pointHistory;

    private PointsEarned(
        int totalPoints = 0,
        int currentSprintPoints = 0,
        int lastSprintPoints = 0,
        IEnumerable<PointHistoryEntry>? pointHistory = null)
    {
        TotalPoints = totalPoints;
        CurrentSprintPoints = currentSprintPoints;
        LastSprintPoints = lastSprintPoints;
        _pointHistory = pointHistory?.ToList() ?? new List<PointHistoryEntry>();
        PointHistory = _pointHistory.AsReadOnly();
    }

    public static PointsEarned Create() => new();

    public PointsEarned AddPoints(TaskId taskId, int points, string reason, TaskId? subtaskId = null)
    {
        if (points <= 0)
            throw new ArgumentException("Points must be greater than 0.", nameof(points));

        var entry = PointHistoryEntry.Create(taskId, points, reason, subtaskId);
        var newHistory = _pointHistory.Concat(new[] { entry });

        return new PointsEarned(
            TotalPoints + points,
            CurrentSprintPoints + points,
            LastSprintPoints,
            newHistory);
    }

    public PointsEarned ResetSprintPoints()
    {
        return new PointsEarned(
            TotalPoints,
            0,
            CurrentSprintPoints,
            _pointHistory);
    }

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return TotalPoints;
        yield return CurrentSprintPoints;
        yield return LastSprintPoints;
        foreach (var entry in PointHistory)
            yield return entry;
    }
}

public sealed class PointHistoryEntry : ValueObject
{
    public TaskId TaskId { get; }
    public TaskId? SubtaskId { get; }
    public int Points { get; }
    public DateTime EarnedDateTime { get; }
    public string Reason { get; }

    private PointHistoryEntry(TaskId taskId, int points, string reason, TaskId? subtaskId = null)
    {
        TaskId = taskId;
        SubtaskId = subtaskId;
        Points = points;
        Reason = reason;
        EarnedDateTime = DateTime.UtcNow;
    }

    public static PointHistoryEntry Create(TaskId taskId, int points, string reason, TaskId? subtaskId = null)
    {
        if (string.IsNullOrWhiteSpace(reason))
            throw new ArgumentException("Reason cannot be null or empty.", nameof(reason));

        return new PointHistoryEntry(taskId, points, reason.Trim(), subtaskId);
    }

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return TaskId;
        yield return SubtaskId?.Value ?? Guid.Empty;
        yield return Points;
        yield return EarnedDateTime;
        yield return Reason;
    }
}