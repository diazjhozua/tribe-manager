using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using tribe_manager.application.Services.Authentication;
using tribe_manager.application.Services.Authentication.Commands.Login;
using tribe_manager.application.Services.Authentication.Commands.Register;
using tribe_manager.contracts.Authentication;

namespace tribe_manager.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController(ISender mediator, IMapper mapper) : ApiController(mediator, mapper)
    {

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            LoginCommand command = _mapper.Map<LoginCommand>(request);

            ErrorOr<AuthenticationResult> authResult = await _mediator.Send(command);

            return authResult.Match(
                authResult => Ok(_mapper.Map<AuthenticationResponse>(authResult)),
                Problem);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            RegisterCommand command = _mapper.Map<RegisterCommand>(request);

            ErrorOr<AuthenticationResult> authResult = await _mediator.Send(command);

            return authResult.Match(
                authResult => Ok(_mapper.Map<AuthenticationResponse>(authResult)),
                Problem);
        }
    }
}
