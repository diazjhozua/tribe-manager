using ErrorOr;
using MediatR;
using tribe_manager.application.Common.Interfaces.Authentication;
using tribe_manager.application.Common.Interfaces.Persistence;
using tribe_manager.application.Services.Authentication;
using tribe_manager.domain.Common.Errors;
using tribe_manager.domain.User.Entities;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.application.Services.Authentication.Commands.Register;

public class RegisterCommandHandler(
    IUserRepository userRepository,
    IJwtTokenGenrator jwtTokenGenerator) : IRequestHandler<RegisterCommand, ErrorOr<AuthenticationResult>>
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly IJwtTokenGenrator _jwtTokenGenerator = jwtTokenGenerator;

    public async Task<ErrorOr<AuthenticationResult>> Handle(
        RegisterCommand request,
        CancellationToken cancellationToken)
    {
        // Create email value object and validate
        Email email = Email.Create(request.Email);

        // Check if user already exists
        if (await _userRepository.ExistsByEmailAsync(email, cancellationToken))
        {
            return Errors.User.DuplicateEmail;
        }

        // Create user profile
        UserProfile userProfile = UserProfile.Create(
            firstName: request.FirstName,
            lastName: request.LastName,
            displayName: request.DisplayName,
            bio: request.Bio,
            avatarUrl: request.AvatarUrl,
            timezone: request.Timezone);

        // Generate password hash and salt
        (string passwordHash, string salt) = _jwtTokenGenerator.GeneratePasswordHash(request.Password);

        // Create user entity
        User user = User.Create(
            email: email,
            profile: userProfile,
            passwordHash: passwordHash,
            salt: salt);

        // Save user to database
        await _userRepository.AddAsync(user, cancellationToken);
        await _userRepository.SaveChangesAsync(cancellationToken);

        // Generate JWT token
        string token = _jwtTokenGenerator.GenerateToken(
            userId: user.Id,
            firstName: user.Profile.FirstName,
            lastName: user.Profile.LastName);

        // Return successful result
        return new AuthenticationResult(
            UserId: user.Id.Value,
            Email: user.Email.Value,
            FirstName: user.Profile.FirstName,
            LastName: user.Profile.LastName,
            Token: token);
    }
}