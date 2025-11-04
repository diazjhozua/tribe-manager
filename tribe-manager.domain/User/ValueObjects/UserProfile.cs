using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.User.ValueObjects;

public sealed class UserProfile : ValueObject
{
    public string FirstName { get; }
    public string LastName { get; }
    public string? DisplayName { get; }
    public string? Bio { get; }
    public string? AvatarUrl { get; }
    public string? Timezone { get; }

    private UserProfile(
        string firstName,
        string lastName,
        string? displayName = null,
        string? bio = null,
        string? avatarUrl = null,
        string? timezone = null)
    {
        FirstName = firstName;
        LastName = lastName;
        DisplayName = displayName ?? $"{firstName} {lastName}";
        Bio = bio;
        AvatarUrl = avatarUrl;
        Timezone = timezone ?? "UTC";
    }

    public static UserProfile Create(
        string firstName,
        string lastName,
        string? displayName = null,
        string? bio = null,
        string? avatarUrl = null,
        string? timezone = null)
    {
        if (string.IsNullOrWhiteSpace(firstName))
            throw new ArgumentException("First name cannot be null or empty.", nameof(firstName));

        if (string.IsNullOrWhiteSpace(lastName))
            throw new ArgumentException("Last name cannot be null or empty.", nameof(lastName));

        return new UserProfile(
            firstName.Trim(),
            lastName.Trim(),
            displayName?.Trim(),
            bio?.Trim(),
            avatarUrl?.Trim(),
            timezone?.Trim());
    }

    public string FullName => $"{FirstName} {LastName}";

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return FirstName;
        yield return LastName;
        yield return DisplayName ?? string.Empty;
        yield return Bio ?? string.Empty;
        yield return AvatarUrl ?? string.Empty;
        yield return Timezone ?? string.Empty;
    }
}