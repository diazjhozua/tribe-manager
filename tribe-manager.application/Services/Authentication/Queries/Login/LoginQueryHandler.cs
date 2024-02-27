using ErrorOr;
using MediatR;
using tribe_manager.application.Common.Interfaces.Authentication;
using tribe_manager.application.Common.Interfaces.Persistence;
using tribe_manager.application.Services.Authentication.Common;
using tribe_manager.domain.Common.Errors;
using tribe_manager.domain.Entities;

namespace tribe_manager.application.Services.Authentication.Queries.Login
{
    public class LoginQueryHandler : IRequestHandler<LoginQuery, ErrorOr<AuthenticationResult>>
    {
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IUserRepository _userRepository;

        public LoginQueryHandler(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
            _userRepository = userRepository;
        }

        public async Task<ErrorOr<AuthenticationResult>> Handle(LoginQuery request, CancellationToken cancellationToken)
        {
            if (_userRepository.GetUserByEmail(request.Email) is not User user)
            {
                return Errors.Authentication.InvalidCredentials;
            }

            if (request.Password != user.Password)
            {
                return Errors.Authentication.InvalidCredentials;
            }

            string token = _jwtTokenGenerator.GenerateToken(user);

            return new AuthenticationResult(user, token);
        }
    }
}
