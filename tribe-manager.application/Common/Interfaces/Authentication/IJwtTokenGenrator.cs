namespace tribe_manager.application.Common.Interfaces.Authentication
{
    public interface IJwtTokenGenrator
    {
        string GenerateToken(Guid userId, string firstName, string lastName);
    }
}
