using tribe_manager.application.Common.Interfaces.Authentication;

namespace tribe_manager.application.Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public AuthenticationService(IJwtTokenGenerator jwtTokenGenerator)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public AuthenticationResult Login(string email, string password)
        {

            Guid userId = Guid.NewGuid();
            string token = _jwtTokenGenerator.GenerateToken(userId, "Jhozua", "Diaz");

            return new AuthenticationResult(userId, "Jhozua", "Diaz", email, token);
        }

        public AuthenticationResult Register(string firstName, string lastName, string email, string password)
        {
            // TODO: Check if user already exists
            // TODO: Create user (generate unique ID)

            Guid userId = Guid.NewGuid();
            string token = _jwtTokenGenerator.GenerateToken(userId, firstName, lastName);

            return new AuthenticationResult(userId, firstName, lastName, email, token);
        }
    }
}
