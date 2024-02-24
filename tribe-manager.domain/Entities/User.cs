namespace tribe_manager.domain.Entities
{
    public class User
    {
        public Guid Id { get; set; } = new Guid();
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;

        // TEMPORARY - IT WILL BE CHANGED LATER ONCE WE INTEGRATE THE ENTITY TO DOTNET EF CORE
        public string Password { get; set; } = null!;
    }
}
