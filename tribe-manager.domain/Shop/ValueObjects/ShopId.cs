using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.Shop.ValueObjects;

public sealed class ShopId : ValueObject
{
    public Guid Value { get; }

    private ShopId(Guid value)
    {
        Value = value;
    }

    public static ShopId CreateNew() => new(Guid.NewGuid());

    public static ShopId Create(Guid value) => new(value);

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public override string ToString() => Value.ToString();
}