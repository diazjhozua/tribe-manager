using tribe_manager.application.Common.Interfaces.Services;

namespace tribe_manager.infrastructure.Services
{
    public class DateTimeProvider : IDateTimeProvider
    {
        public DateTimeOffset Now => DateTime.UtcNow;
    }
}
