using ErrorOr;
using MediatR;
using tribe_manager.application.Services.Authentication.Common;

namespace tribe_manager.application.Services.Authentication.Commands.Register
{
    public record RegisterCommand(
        string FirstName,
        string LastName,
        string Email,
        string Password) : IRequest<ErrorOr<AuthenticationResult>>;
}
