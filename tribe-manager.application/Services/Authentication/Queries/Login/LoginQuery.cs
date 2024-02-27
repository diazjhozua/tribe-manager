using ErrorOr;
using MediatR;

namespace tribe_manager.application.Services.Authentication.Queries.Login
{
    public record LoginQuery(
        string Email,
        string Password) : IRequest<ErrorOr<AuthenticationResult>>;
}
