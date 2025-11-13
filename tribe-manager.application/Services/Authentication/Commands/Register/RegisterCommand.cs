using ErrorOr;
using MediatR;
using tribe_manager.application.Services.Authentication;

namespace tribe_manager.application.Services.Authentication.Commands.Register;

public record RegisterCommand(
    string Email,
    string Password,
    string FirstName,
    string LastName,
    string? DisplayName = null,
    string? Bio = null,
    string? AvatarUrl = null,
    string? Timezone = null) : IRequest<ErrorOr<AuthenticationResult>>;