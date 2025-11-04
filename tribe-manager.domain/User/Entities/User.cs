using tribe_manager.domain.Common.Models;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.domain.User.Entities;

public sealed class User : AggregateRoot<UserId>
{
    public Email Email { get; private set; }
    public UserProfile Profile { get; private set; }
    public UserPreferences Preferences { get; private set; }
    public SecuritySettings SecuritySettings { get; private set; }
    public string PasswordHash { get; private set; }
    public string Salt { get; private set; }
    public DateTime? LastLoginDateTime { get; private set; }
    public bool IsActive { get; private set; }
    public DateTime CreatedDateTime { get; private set; }
    public DateTime UpdatedDateTime { get; private set; }

    private User(
        UserId id,
        Email email,
        UserProfile profile,
        string passwordHash,
        string salt,
        UserPreferences? preferences = null,
        SecuritySettings? securitySettings = null) : base(id)
    {
        Email = email;
        Profile = profile;
        PasswordHash = passwordHash;
        Salt = salt;
        Preferences = preferences ?? UserPreferences.Default;
        SecuritySettings = securitySettings ?? SecuritySettings.Default;
        IsActive = true;
        CreatedDateTime = DateTime.UtcNow;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public static User Create(
        Email email,
        UserProfile profile,
        string passwordHash,
        string salt,
        UserPreferences? preferences = null,
        SecuritySettings? securitySettings = null)
    {
        if (string.IsNullOrWhiteSpace(passwordHash))
            throw new ArgumentException("Password hash cannot be null or empty.", nameof(passwordHash));

        if (string.IsNullOrWhiteSpace(salt))
            throw new ArgumentException("Salt cannot be null or empty.", nameof(salt));

        return new User(
            UserId.CreateNew(),
            email,
            profile,
            passwordHash,
            salt,
            preferences,
            securitySettings);
    }

    public void UpdateProfile(UserProfile newProfile)
    {
        Profile = newProfile ?? throw new ArgumentNullException(nameof(newProfile));
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void UpdatePreferences(UserPreferences newPreferences)
    {
        Preferences = newPreferences ?? throw new ArgumentNullException(nameof(newPreferences));
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void UpdateSecuritySettings(SecuritySettings newSecuritySettings)
    {
        SecuritySettings = newSecuritySettings ?? throw new ArgumentNullException(nameof(newSecuritySettings));
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void ChangePassword(string newPasswordHash, string newSalt)
    {
        if (string.IsNullOrWhiteSpace(newPasswordHash))
            throw new ArgumentException("Password hash cannot be null or empty.", nameof(newPasswordHash));

        if (string.IsNullOrWhiteSpace(newSalt))
            throw new ArgumentException("Salt cannot be null or empty.", nameof(newSalt));

        PasswordHash = newPasswordHash;
        Salt = newSalt;
        SecuritySettings = SecuritySettings.Create(
            SecuritySettings.TwoFactorEnabled,
            DateTime.UtcNow,
            SecuritySettings.SessionTimeoutMinutes);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void RecordLogin()
    {
        LastLoginDateTime = DateTime.UtcNow;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void Deactivate()
    {
        IsActive = false;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void Activate()
    {
        IsActive = true;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void ChangeEmail(Email newEmail)
    {
        Email = newEmail ?? throw new ArgumentNullException(nameof(newEmail));
        UpdatedDateTime = DateTime.UtcNow;
    }
}