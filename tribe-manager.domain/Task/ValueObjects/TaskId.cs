using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.Task.ValueObjects;

public sealed class TaskId : ValueObject
{
    public Guid Value { get; }

    private TaskId(Guid value)
    {
        Value = value;
    }

    public static TaskId CreateNew() => new(Guid.NewGuid());

    public static TaskId Create(Guid value) => new(value);

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }

    public override string ToString() => Value.ToString();
}