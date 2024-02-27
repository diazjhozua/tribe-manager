using ErrorOr;
using MediatR;
using tribe_manager.application.Services.Authentication.Common;

namespace tribe_manager.application.Services.Authentication.Queries.Login
{
    public record LoginQuery(
        string Email,
        string Password) : IRequest<ErrorOr<AuthenticationResult>>;
}
