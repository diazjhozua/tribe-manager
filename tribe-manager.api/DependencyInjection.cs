using tribe_manager.api.Common.Mapping;

namespace tribe_manager.api
{
    public static class Extensions
    {
        public static IServiceCollection AddPresentation(
        this IServiceCollection services)
        {
            services.AddMappings();
            services.AddControllers();

            return services;
        }
    }
}
