using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.Shop.ValueObjects;

public sealed class PurchaseId : ValueObject
{
    public Guid Value { get; }

    private PurchaseId(Guid value)
    {
        Value = value;
    }

    public static PurchaseId CreateNew() => new(Guid.NewGuid());

    public static PurchaseId Create(Guid value) => new(value);

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public override string ToString() => Value.ToString();
}