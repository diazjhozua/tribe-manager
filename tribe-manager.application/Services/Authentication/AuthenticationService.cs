using ErrorOr;
using tribe_manager.application.Common.Interfaces.Authentication;
using tribe_manager.application.Common.Interfaces.Persistence;
using tribe_manager.domain.Common.Errors;
using tribe_manager.domain.Entities;

namespace tribe_manager.application.Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IUserRepository _userRepository;

        public AuthenticationService(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
            _userRepository = userRepository;
        }

        public ErrorOr<AuthenticationResult> Login(string email, string password)
        {
            if (_userRepository.GetUserByEmail(email) is not User user)
            {
                return Errors.Authentication.InvalidCredentials;
            }

            if (password != user.Password)
            {
                return Errors.Authentication.InvalidCredentials;
            }

            string token = _jwtTokenGenerator.GenerateToken(user);

            return new AuthenticationResult(user, token);
        }

        public ErrorOr<AuthenticationResult> Register(string firstName, string lastName, string email, string password)
        {
            if(_userRepository.GetUserByEmail(email) != null)
            {
                return Errors.User.DuplicateEmail;
            }

            User newUser = new()
            {
                Email = email,
                FirstName = firstName,
                LastName = lastName,
                Password = password,
            };
            
            _userRepository.Add(newUser);

            string token = _jwtTokenGenerator.GenerateToken(newUser);

            return new AuthenticationResult(newUser, token);
        }
    }
}
