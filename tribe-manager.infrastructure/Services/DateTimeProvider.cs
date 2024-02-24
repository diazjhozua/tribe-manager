using tribe_manager.application.Common.Services;

namespace tribe_manager.infrastructure.Services
{
    public class DateTimeProvider : IDateTimeProvider
    {
        public DateTime UtcNow => DateTime.UtcNow;
    }
}
