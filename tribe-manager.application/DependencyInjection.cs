using FluentValidation.Internal;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using tribe_manager.application.Common.Behaviors;

namespace tribe_manager.application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Extensions).Assembly));

            services.AddScoped(
                typeof(IPipelineBehavior<,>),
                typeof(ValidationBehavior<,>));


            return services;
        }
    }
}
