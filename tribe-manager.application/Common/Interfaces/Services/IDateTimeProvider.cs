namespace tribe_manager.application.Common.Interfaces.Services
{
    public interface IDateTimeProvider
    {
        DateTimeOffset Now { get; }
    }
}
