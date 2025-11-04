using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.Task.ValueObjects;

public sealed class TaskPoints : ValueObject
{
    public int Value { get; }

    private TaskPoints(int value)
    {
        Value = value;
    }

    public static TaskPoints Create(int points)
    {
        if (points < 0)
            throw new ArgumentException("Points cannot be negative.", nameof(points));

        if (points > 100)
            throw new ArgumentException("Points cannot exceed 100.", nameof(points));

        return new TaskPoints(points);
    }

    public static TaskPoints Zero => new(0);

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public override string ToString() => Value.ToString();

    public static implicit operator int(TaskPoints points) => points.Value;
}