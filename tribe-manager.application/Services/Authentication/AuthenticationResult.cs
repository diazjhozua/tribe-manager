namespace tribe_manager.application.Services.Authentication;

public record AuthenticationResult(
    Guid UserId,
    string Email,
    string FirstName,
    string LastName,
    string Token);