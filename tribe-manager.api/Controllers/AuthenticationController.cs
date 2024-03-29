﻿using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tribe_manager.application.Services.Authentication.Commands.Register;
using tribe_manager.application.Services.Authentication.Common;
using tribe_manager.application.Services.Authentication.Queries.Login;
using tribe_manager.contracts.Authentication;

namespace tribe_manager.api.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class AuthenticationController(ISender mediator, IMapper mapper) : ApiController(mediator, mapper)
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
                result => Ok(_mapper.Map<AuthenticationResponse>(result)),
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
                result => Ok(_mapper.Map<AuthenticationResponse>(result)),
                Problem);
        }
    }
}
