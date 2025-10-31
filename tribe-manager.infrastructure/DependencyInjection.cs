using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using tribe_manager.application.Common.Interfaces.Authentication;
using tribe_manager.application.Common.Interfaces.Services;
using tribe_manager.infrastructure.Authentication;
using tribe_manager.infrastructure.Services;

namespace tribe_manager.infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, ConfigurationManager configuration)
        {
            services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));

            services.AddSingleton<IJwtTokenGenrator, JwtTokenGenerator>();
            services.AddSingleton<IDateTimeProvider, DateTimeProvider>();   

            return services;
        }
    }
}
