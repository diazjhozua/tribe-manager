using ErrorOr;
using MediatR;
using tribe_manager.application.Services.Authentication;

namespace tribe_manager.application.Services.Authentication.Commands.Login;

public record LoginCommand(
    string Email,
    string Password) : IRequest<ErrorOr<AuthenticationResult>>;