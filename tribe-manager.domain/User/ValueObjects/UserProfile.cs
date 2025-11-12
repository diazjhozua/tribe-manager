using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.User.ValueObjects;

public sealed class UserProfile : ValueObject
{
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string? DisplayName { get; private set; }
    public string? Bio { get; private set; }
    public string? AvatarUrl { get; private set; }
    public string? Timezone { get; private set; }

    // Parameterless constructor for EF Core
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    private UserProfile()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    {
    }

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