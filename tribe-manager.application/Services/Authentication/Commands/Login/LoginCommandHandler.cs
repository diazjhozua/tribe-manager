using ErrorOr;
using MediatR;
using tribe_manager.application.Common.Interfaces.Authentication;
using tribe_manager.application.Common.Interfaces.Persistence;
using tribe_manager.domain.Common.Errors;
using tribe_manager.domain.User.Entities;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.application.Services.Authentication.Commands.Login;

public class LoginCommandHandler(
    IUserRepository userRepository,
    IJwtTokenGenrator jwtTokenGenerator) : IRequestHandler<LoginCommand, ErrorOr<AuthenticationResult>>
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly IJwtTokenGenrator _jwtTokenGenerator = jwtTokenGenerator;

    public async Task<ErrorOr<AuthenticationResult>> Handle(
        LoginCommand request,
        CancellationToken cancellationToken)
    {
        // Create email value object and validate
        Email email = Email.Create(request.Email);

        // Get user by email
        User? user = await _userRepository.GetByEmailAsync(email, cancellationToken);
        if (user is null)
        {
            return Errors.Authentication.InvalidCredentials;
        }

        // Check if user is active
        if (!user.IsActive)
        {
            return Errors.User.InactiveUser;
        }

        // Verify password
        if (!_jwtTokenGenerator.VerifyPassword(request.Password, user.PasswordHash, user.Salt))
        {
            return Errors.Authentication.InvalidCredentials;
        }

        // Update last login time
        user.RecordLogin();
        await _userRepository.UpdateAsync(user, cancellationToken);
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