using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.Shop.ValueObjects;

public sealed class RewardDetails : ValueObject
{
    public string Name { get; }
    public string Description { get; }
    public string? ImageUrl { get; }
    public IReadOnlyList<string> Restrictions { get; }

    private RewardDetails(
        string name,
        string description,
        string? imageUrl = null,
        IEnumerable<string>? restrictions = null)
    {
        Name = name;
        Description = description;
        ImageUrl = imageUrl;
        Restrictions = (restrictions?.ToList() ?? new List<string>()).AsReadOnly();
    }

    public static RewardDetails Create(
        string name,
        string description,
        string? imageUrl = null,
        IEnumerable<string>? restrictions = null)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Reward name cannot be null or empty.", nameof(name));

        if (string.IsNullOrWhiteSpace(description))
            throw new ArgumentException("Reward description cannot be null or empty.", nameof(description));

        if (name.Length > 100)
            throw new ArgumentException("Reward name cannot exceed 100 characters.", nameof(name));

        if (description.Length > 500)
            throw new ArgumentException("Reward description cannot exceed 500 characters.", nameof(description));

        return new RewardDetails(
            name.Trim(),
            description.Trim(),
            imageUrl?.Trim(),
            restrictions?.Where(r => !string.IsNullOrWhiteSpace(r)).Select(r => r.Trim()));
    }

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Name;
        yield return Description;
        yield return ImageUrl ?? string.Empty;
        foreach (var restriction in Restrictions)
            yield return restriction;
    }
}