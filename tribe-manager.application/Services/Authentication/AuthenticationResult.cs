using tribe_manager.domain.Entities;

namespace tribe_manager.application.Services.Authentication
{
    public record AuthenticationResult(
        User User,
        string Token);
}
