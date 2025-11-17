using Mapster;
using tribe_manager.application.Services.Authentication;
using tribe_manager.contracts.Authentication;

namespace tribe_manager.api.Common.Mapping
{
    public class AuthenticationMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<AuthenticationResult, AuthenticationResponse>();
        }
    }
}
