using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.User.ValueObjects;

public sealed class UserPreferences : ValueObject
{
    public bool EmailNotifications { get; }
    public bool SlackIntegration { get; }
    public bool DarkMode { get; }
    public string Language { get; }

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