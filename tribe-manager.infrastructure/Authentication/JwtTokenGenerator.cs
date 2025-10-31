using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using tribe_manager.application.Common.Interfaces.Authentication;
using tribe_manager.application.Common.Interfaces.Services;

namespace tribe_manager.infrastructure.Authentication
{
    public class JwtTokenGenerator(IDateTimeProvider dateTimeProvider, IOptions<JwtSettings> jwtSettings) : IJwtTokenGenrator
    {
        private readonly IDateTimeProvider _dateTimeProvider = dateTimeProvider;
        private readonly JwtSettings _jwtSettings = jwtSettings.Value;

        public string GenerateToken(Guid userId, string firstName, string lastName)
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
    }
}
