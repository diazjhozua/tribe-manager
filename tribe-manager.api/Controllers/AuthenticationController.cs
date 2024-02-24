using Microsoft.AspNetCore.Mvc;
using tribe_manager.application.Services.Authentication;
using tribe_manager.contracts.Authentication;

namespace tribe_manager.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            AuthenticationResult loginResult = _authenticationService.Login(request.Email, request.Password);

            return Ok(new AuthenticationResponse(
                Id: loginResult.User.Id, 
                FirstName: loginResult.User.FirstName, 
                LastName: loginResult.User.LastName, 
                Email: loginResult.User.Email, 
                Token: loginResult.Token));
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest request)
        {
            AuthenticationResult registerResult = _authenticationService.Register(
                request.FirstName, request.LastName, request.Email, request.Password);

            return Ok(new AuthenticationResponse(
                Id: registerResult.User.Id,
                FirstName: registerResult.User.FirstName,
                LastName: registerResult.User.LastName,
                Email: registerResult.User.Email,
                Token: registerResult.Token));
        }
    }
}
