using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.User.ValueObjects;

public sealed class UserPreferences : ValueObject
{
    public bool EmailNotifications { get; private set; }
    public bool SlackIntegration { get; private set; }
    public bool DarkMode { get; private set; }
    public string Language { get; private set; }

    // Parameterless constructor for EF Core
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    private UserPreferences()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    {
    }

    private UserPreferences(
        bool emailNotifications,
        bool slackIntegration,
        bool darkMode,
        string language)
    {
        EmailNotifications = emailNotifications;
        SlackIntegration = slackIntegration;
        DarkMode = darkMode;
        Language = language;
    }

    public static UserPreferences Create(
        bool emailNotifications = true,
        bool slackIntegration = false,
        bool darkMode = false,
        string language = "en-US")
    {
        if (string.IsNullOrWhiteSpace(language))
            throw new ArgumentException("Language cannot be null or empty.", nameof(language));

        return new UserPreferences(
            emailNotifications,
            slackIntegration,
            darkMode,
            language.Trim());
    }

    public static UserPreferences Default => Create();

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return EmailNotifications;
        yield return SlackIntegration;
        yield return DarkMode;
        yield return Language;
    }
}