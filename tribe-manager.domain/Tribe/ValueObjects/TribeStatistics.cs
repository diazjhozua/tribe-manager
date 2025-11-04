using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.Tribe.ValueObjects;

public sealed class TribeStatistics : ValueObject
{
    public int TotalTasks { get; }
    public int CompletedTasks { get; }
    public int TotalPoints { get; }
    public int CompletedPoints { get; }

    private TribeStatistics(int totalTasks, int completedTasks, int totalPoints, int completedPoints)
    {
        TotalTasks = totalTasks;
        CompletedTasks = completedTasks;
        TotalPoints = totalPoints;
        CompletedPoints = completedPoints;
    }

    public static TribeStatistics Create(
        int totalTasks = 0,
        int completedTasks = 0,
        int totalPoints = 0,
        int completedPoints = 0)
    {
        if (completedTasks > totalTasks)
            throw new ArgumentException("Completed tasks cannot exceed total tasks.");

        if (completedPoints > totalPoints)
            throw new ArgumentException("Completed points cannot exceed total points.");

        return new TribeStatistics(totalTasks, completedTasks, totalPoints, completedPoints);
    }

    public static TribeStatistics Empty => Create();

    public double CompletionPercentage =>
        TotalTasks == 0 ? 0 : (double)CompletedTasks / TotalTasks * 100;

    public double PointsCompletionPercentage =>
        TotalPoints == 0 ? 0 : (double)CompletedPoints / TotalPoints * 100;

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return TotalTasks;
        yield return CompletedTasks;
        yield return TotalPoints;
        yield return CompletedPoints;
    }
}