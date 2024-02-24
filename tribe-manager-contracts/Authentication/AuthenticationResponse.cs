namespace tribe_manager.contracts.Authentication
{
    public record AuthenticationResponse(
        Guid Id,
        string FirstName,
        string LastName,
        string Email,
        string Token);
}
