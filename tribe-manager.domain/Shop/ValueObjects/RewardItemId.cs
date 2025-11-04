using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.Shop.ValueObjects;

public sealed class RewardItemId : ValueObject
{
    public Guid Value { get; }

    private RewardItemId(Guid value)
    {
        Value = value;
    }

    public static RewardItemId CreateNew() => new(Guid.NewGuid());

    public static RewardItemId Create(Guid value) => new(value);

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public override string ToString() => Value.ToString();
}