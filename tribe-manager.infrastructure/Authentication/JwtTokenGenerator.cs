using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using tribe_manager.application.Common.Interfaces.Authentication;
using tribe_manager.application.Common.Interfaces.Services;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.infrastructure.Authentication
{
    public class JwtTokenGenerator(IDateTimeProvider dateTimeProvider, IOptions<JwtSettings> jwtSettings) : IJwtTokenGenrator
    {
        private readonly IDateTimeProvider _dateTimeProvider = dateTimeProvider;
        private readonly JwtSettings _jwtSettings = jwtSettings.Value;

        public string GenerateToken(UserId userId, string firstName, string lastName)
        {
            SigningCredentials signingCredentials = new(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
                SecurityAlgorithms.HmacSha256);

            Claim[] claims =
            [
                new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new Claim(JwtRegisteredClaimNames.GivenName, firstName),
                new Claim(JwtRegisteredClaimNames.FamilyName, lastName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            ];

            JwtSecurityToken securityToken = new(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                expires: _dateTimeProvider.Now.AddMinutes(_jwtSettings.ExpiryMinutes),
                claims: claims,
                signingCredentials: signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public (string passwordHash, string salt) GeneratePasswordHash(string password)
        {
            // Generate a random salt
            using RandomNumberGenerator rng = RandomNumberGenerator.Create();
            byte[] saltBytes = new byte[32];
            rng.GetBytes(saltBytes);
            string salt = Convert.ToBase64String(saltBytes);

            // Hash the password with the salt using PBKDF2
            using Rfc2898DeriveBytes pbkdf2 = new(password, saltBytes, 10000, HashAlgorithmName.SHA256);
            byte[] hashBytes = pbkdf2.GetBytes(32);
            string passwordHash = Convert.ToBase64String(hashBytes);

            return (passwordHash, salt);
        }

        public bool VerifyPassword(string password, string storedHash, string storedSalt)
        {
            try
            {
                // Convert stored salt back to bytes
                byte[] saltBytes = Convert.FromBase64String(storedSalt);

                // Hash the provided password with the stored salt
                using Rfc2898DeriveBytes pbkdf2 = new(password, saltBytes, 10000, HashAlgorithmName.SHA256);
                byte[] hashBytes = pbkdf2.GetBytes(32);
                string computedHash = Convert.ToBase64String(hashBytes);

                // Compare hashes using secure comparison
                return CryptographicOperations.FixedTimeEquals(
                    Convert.FromBase64String(storedHash),
                    Convert.FromBase64String(computedHash));
            }
            catch
            {
                // If any conversion fails, password is invalid
                return false;
            }
        }
    }
}
