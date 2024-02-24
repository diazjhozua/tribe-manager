using tribe_manager.application.Common.Interfaces.Authentication;
using tribe_manager.application.Common.Interfaces.Persistence;
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

        public AuthenticationResult Login(string email, string password)
        {
            if (_userRepository.GetUserByEmail(email) is not User user)
            {
                throw new Exception("Invalid Credentials");
            }

            if (password != user.Password)
            {
                throw new Exception("Invalid Credentials");
            }

            string token = _jwtTokenGenerator.GenerateToken(user);

            return new AuthenticationResult(user, token);
        }

        public AuthenticationResult Register(string firstName, string lastName, string email, string password)
        {
            if(_userRepository.GetUserByEmail(email) != null)
            {
                throw new Exception("User with given email already exists");
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
