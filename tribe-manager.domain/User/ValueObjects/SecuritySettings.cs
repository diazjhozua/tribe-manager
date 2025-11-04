using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.User.ValueObjects;

public sealed class SecuritySettings : ValueObject
{
    public bool TwoFactorEnabled { get; }
    public DateTime LastPasswordChange { get; }
    public int SessionTimeoutMinutes { get; }

    private SecuritySettings(
        bool twoFactorEnabled,
        DateTime lastPasswordChange,
        int sessionTimeoutMinutes)
    {
        TwoFactorEnabled = twoFactorEnabled;
        LastPasswordChange = lastPasswordChange;
        SessionTimeoutMinutes = sessionTimeoutMinutes;
    }

    public static SecuritySettings Create(
        bool twoFactorEnabled = false,
        DateTime? lastPasswordChange = null,
        int sessionTimeoutMinutes = 480) // 8 hours default
    {
        if (sessionTimeoutMinutes <= 0)
            throw new ArgumentException("Session timeout must be greater than 0.", nameof(sessionTimeoutMinutes));

        if (sessionTimeoutMinutes > 1440) // 24 hours max
            throw new ArgumentException("Session timeout cannot exceed 24 hours.", nameof(sessionTimeoutMinutes));

        return new SecuritySettings(
            twoFactorEnabled,
            lastPasswordChange ?? DateTime.UtcNow,
            sessionTimeoutMinutes);
    }

    public static SecuritySettings Default => Create();

    public bool IsPasswordExpired(int maxDays = 90) =>
        DateTime.UtcNow.Subtract(LastPasswordChange).TotalDays > maxDays;

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return TwoFactorEnabled;
        yield return LastPasswordChange;
        yield return SessionTimeoutMinutes;
    }
}