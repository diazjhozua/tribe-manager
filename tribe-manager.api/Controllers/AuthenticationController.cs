using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using tribe_manager.application.Services.Authentication;
using tribe_manager.contracts.Authentication;

namespace tribe_manager.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ApiController
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            ErrorOr<AuthenticationResult> loginResult = _authenticationService.Login(request.Email, request.Password);

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
        public IActionResult Register(RegisterRequest request)
        {
            ErrorOr<AuthenticationResult> registerResult = _authenticationService.Register(
                request.FirstName, request.LastName, request.Email, request.Password);

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
