using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.Tribe.ValueObjects;

public sealed class TribeSettings : ValueObject
{
    public bool IsPublic { get; }
    public bool AllowSelfJoin { get; }
    public int MaxMembers { get; }

    private TribeSettings(bool isPublic, bool allowSelfJoin, int maxMembers)
    {
        IsPublic = isPublic;
        AllowSelfJoin = allowSelfJoin;
        MaxMembers = maxMembers;
    }

    public static TribeSettings Create(
        bool isPublic = true,
        bool allowSelfJoin = false,
        int maxMembers = 50)
    {
        if (maxMembers <= 0)
            throw new ArgumentException("Max members must be greater than 0.", nameof(maxMembers));

        if (maxMembers > 500)
            throw new ArgumentException("Max members cannot exceed 500.", nameof(maxMembers));

        return new TribeSettings(isPublic, allowSelfJoin, maxMembers);
    }

    public static TribeSettings Default => Create();

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return IsPublic;
        yield return AllowSelfJoin;
        yield return MaxMembers;
    }
}