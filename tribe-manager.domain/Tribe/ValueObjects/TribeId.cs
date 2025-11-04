using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.Tribe.ValueObjects;

public sealed class TribeId : ValueObject
{
    public Guid Value { get; }

    private TribeId(Guid value)
    {
        Value = value;
    }

    public static TribeId CreateNew() => new(Guid.NewGuid());

    public static TribeId Create(Guid value) => new(value);

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public override string ToString() => Value.ToString();
}