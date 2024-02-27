using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using tribe_manager.application.Services.Authentication.Commands.Register;
using tribe_manager.application.Services.Authentication.Common;
using tribe_manager.application.Services.Authentication.Queries.Login;
using tribe_manager.contracts.Authentication;

namespace tribe_manager.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController(ISender mediator) : ApiController(mediator)
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            LoginQuery loginQry = new(
                Email: request.Email,
                Password: request.Password
            );

            ErrorOr<AuthenticationResult> loginResult = await _mediator.Send(loginQry);

            return loginResult.Match(
                result => Ok(
                    new AuthenticationResponse(
                            Id: result.User.Id,
                            FirstName: result.User.FirstName,
                            LastName: result.User.LastName,
                            Email: result.User.Email,
                            Token:  result.Token)
                    ),
                Problem);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            RegisterCommand registerCmd = new(
                FirstName: request.FirstName, 
                LastName: request.LastName, 
                Email: request.Email, 
                Password: request.Password);

            ErrorOr<AuthenticationResult> registerResult = await _mediator.Send(registerCmd);

            return registerResult.Match(
                result => Ok(
                    new AuthenticationResponse(
                            Id: result.User.Id,
                            FirstName: result.User.FirstName,
                            LastName: result.User.LastName,
                            Email: result.User.Email,
                            Token: result.Token)
                    ),
                Problem);
        }
    }
}
