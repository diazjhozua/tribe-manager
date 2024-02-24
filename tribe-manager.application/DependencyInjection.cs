using Microsoft.Extensions.DependencyInjection;
using tribe_manager.application.Services.Authentication;

namespace tribe_manager.application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();

            return services;
        }
    }
}
