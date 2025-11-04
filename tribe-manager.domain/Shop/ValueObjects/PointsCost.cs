using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.Shop.ValueObjects;

public sealed class PointsCost : ValueObject
{
    public int Value { get; }

    private PointsCost(int value)
    {
        Value = value;
    }

    public static PointsCost Create(int points)
    {
        if (points < 0)
            throw new ArgumentException("Points cost cannot be negative.", nameof(points));

        if (points > 1000)
            throw new ArgumentException("Points cost cannot exceed 1000.", nameof(points));

        return new PointsCost(points);
    }

    public static PointsCost Free => new(0);

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public override string ToString() => $"{Value} points";

    public static implicit operator int(PointsCost cost) => cost.Value;

    public static bool operator >(PointsCost left, PointsCost right) => left.Value > right.Value;
    public static bool operator <(PointsCost left, PointsCost right) => left.Value < right.Value;
    public static bool operator >=(PointsCost left, PointsCost right) => left.Value >= right.Value;
    public static bool operator <=(PointsCost left, PointsCost right) => left.Value <= right.Value;
}