using tribe_manager.domain.Entities;

namespace tribe_manager.application.Common.Interfaces.Persistence
{
    public interface IUserRepository
    {
        User? GetUserByEmail (string email);
        void Add(User user);
    }
}
