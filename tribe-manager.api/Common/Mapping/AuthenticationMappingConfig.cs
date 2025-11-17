using Mapster;
using tribe_manager.application.Services.Authentication;
using tribe_manager.application.Services.Authentication.Commands.Login;
using tribe_manager.application.Services.Authentication.Commands.Register;
using tribe_manager.contracts.Authentication;

namespace tribe_manager.api.Common.Mapping
{
    public class AuthenticationMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<LoginRequest, LoginCommand>();
            config.NewConfig<RegisterRequest, RegisterCommand>();

            config.NewConfig<AuthenticationResult, AuthenticationResponse>()
                .Map(dest => dest.Id, src => src.UserId);
        }
    }
}
