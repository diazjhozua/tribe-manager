using Microsoft.Extensions.DependencyInjection;

namespace tribe_manager.application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            return services;
        }
    }
}
