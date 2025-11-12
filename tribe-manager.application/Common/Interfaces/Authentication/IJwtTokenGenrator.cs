using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.application.Common.Interfaces.Authentication
{
    public interface IJwtTokenGenrator
    {
        string GenerateToken(UserId userId, string firstName, string lastName);
        (string passwordHash, string salt) GeneratePasswordHash(string password);
        bool VerifyPassword(string password, string storedHash, string storedSalt);
    }
}
