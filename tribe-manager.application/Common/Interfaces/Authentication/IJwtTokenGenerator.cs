using tribe_manager.domain.Entities;

namespace tribe_manager.application.Common.Interfaces.Authentication
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
    }
}
