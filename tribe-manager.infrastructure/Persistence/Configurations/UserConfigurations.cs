using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using tribe_manager.domain.User.Entities;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.infrastructure.Persistence.Configurations;

public class UserConfigurations : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        ConfigureUsersTable(builder);
        ConfigureValueObjects(builder);
    }

    private static void ConfigureUsersTable(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        // Primary Key - UserId
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Id)
            .ValueGeneratedNever()
            .HasConversion(
                id => id.Value,
                value => UserId.Create(value))
            .HasColumnName("Id");

        // Email - Value Object
        builder.Property(u => u.Email)
            .HasConversion(
                email => email.Value,
                value => Email.Create(value))
            .HasMaxLength(255)
            .IsRequired()
            .HasColumnName("Email");

        // Create unique index on Email
        builder.HasIndex(u => u.Email)
            .IsUnique()
            .HasDatabaseName("IX_Users_Email");

        // Password fields
        builder.Property(u => u.PasswordHash)
            .HasMaxLength(512)
            .IsRequired()
            .HasColumnName("PasswordHash");

        builder.Property(u => u.Salt)
            .HasMaxLength(256)
            .IsRequired()
            .HasColumnName("Salt");

        // Tracking fields
        builder.Property(u => u.LastLoginDateTime)
            .HasColumnName("LastLoginDateTime");

        builder.Property(u => u.IsActive)
            .IsRequired()
            .HasColumnName("IsActive");

        builder.Property(u => u.CreatedDateTime)
            .IsRequired()
            .HasColumnName("CreatedDateTime");

        builder.Property(u => u.UpdatedDateTime)
            .IsRequired()
            .HasColumnName("UpdatedDateTime");
    }

    private static void ConfigureValueObjects(EntityTypeBuilder<User> builder)
    {
        // UserProfile Value Object
        builder.OwnsOne(u => u.Profile, profile =>
        {
            profile.Property(p => p.FirstName)
                .HasMaxLength(100)
                .IsRequired()
                .HasColumnName("FirstName");

            profile.Property(p => p.LastName)
                .HasMaxLength(100)
                .IsRequired()
                .HasColumnName("LastName");

            profile.Property(p => p.DisplayName)
                .HasMaxLength(200)
                .HasColumnName("DisplayName");

            profile.Property(p => p.Bio)
                .HasMaxLength(1000)
                .HasColumnName("Bio");

            profile.Property(p => p.AvatarUrl)
                .HasMaxLength(500)
                .HasColumnName("AvatarUrl");

            profile.Property(p => p.Timezone)
                .HasMaxLength(50)
                .HasColumnName("Timezone");

            profile.Ignore(p => p.FullName); // Computed property, not stored
        });

        // UserPreferences Value Object
        builder.OwnsOne(u => u.Preferences, preferences =>
        {
            preferences.Property(p => p.EmailNotifications)
                .IsRequired()
                .HasColumnName("EmailNotifications");

            preferences.Property(p => p.SlackIntegration)
                .IsRequired()
                .HasColumnName("SlackIntegration");

            preferences.Property(p => p.DarkMode)
                .IsRequired()
                .HasColumnName("DarkMode");

            preferences.Property(p => p.Language)
                .HasMaxLength(10)
                .IsRequired()
                .HasColumnName("Language");
        });

        // SecuritySettings Value Object
        builder.OwnsOne(u => u.SecuritySettings, security =>
        {
            security.Property(s => s.TwoFactorEnabled)
                .IsRequired()
                .HasColumnName("TwoFactorEnabled");

            security.Property(s => s.LastPasswordChange)
                .IsRequired()
                .HasColumnName("LastPasswordChange");

            security.Property(s => s.SessionTimeoutMinutes)
                .IsRequired()
                .HasColumnName("SessionTimeoutMinutes");

            // Note: IsPasswordExpired is a method, not a property, so it's automatically ignored
        });
    }
}