using FluentValidation;

namespace tribe_manager.application.Services.Authentication.Commands.Register;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Email must be a valid email address.")
            .MaximumLength(255)
            .WithMessage("Email cannot exceed 255 characters.");

        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("Password is required.")
            .MinimumLength(8)
            .WithMessage("Password must be at least 8 characters long.")
            .MaximumLength(100)
            .WithMessage("Password cannot exceed 100 characters.")
            .Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]")
            .WithMessage("Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.");

        RuleFor(x => x.FirstName)
            .NotEmpty()
            .WithMessage("First name is required.")
            .MaximumLength(100)
            .WithMessage("First name cannot exceed 100 characters.")
            .Matches(@"^[a-zA-Z\s'-]+$")
            .WithMessage("First name can only contain letters, spaces, hyphens, and apostrophes.");

        RuleFor(x => x.LastName)
            .NotEmpty()
            .WithMessage("Last name is required.")
            .MaximumLength(100)
            .WithMessage("Last name cannot exceed 100 characters.")
            .Matches(@"^[a-zA-Z\s'-]+$")
            .WithMessage("Last name can only contain letters, spaces, hyphens, and apostrophes.");

        When(x => !string.IsNullOrEmpty(x.DisplayName), () =>
        {
            RuleFor(x => x.DisplayName)
                .MaximumLength(200)
                .WithMessage("Display name cannot exceed 200 characters.");
        });

        When(x => !string.IsNullOrEmpty(x.Bio), () =>
        {
            RuleFor(x => x.Bio)
                .MaximumLength(1000)
                .WithMessage("Bio cannot exceed 1000 characters.");
        });

        When(x => !string.IsNullOrEmpty(x.AvatarUrl), () =>
        {
            RuleFor(x => x.AvatarUrl)
                .MaximumLength(500)
                .WithMessage("Avatar URL cannot exceed 500 characters.")
                .Must(BeAValidUrl)
                .WithMessage("Avatar URL must be a valid URL.");
        });

        When(x => !string.IsNullOrEmpty(x.Timezone), () =>
        {
            RuleFor(x => x.Timezone)
                .MaximumLength(50)
                .WithMessage("Timezone cannot exceed 50 characters.");
        });
    }

    private static bool BeAValidUrl(string? url)
    {
        if (string.IsNullOrEmpty(url))
            return true;

        return Uri.TryCreate(url, UriKind.Absolute, out var result)
               && (result.Scheme == Uri.UriSchemeHttp || result.Scheme == Uri.UriSchemeHttps);
    }
}