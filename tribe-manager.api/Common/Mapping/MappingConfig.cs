using Mapster;
using tribe_manager.application.Services.Authentication.Common;
using tribe_manager.contracts.Authentication;

namespace tribe_manager.api.Common.Mapping
{
    public class MappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<AuthenticationResult, AuthenticationResponse>()
                .Map(dest => dest.Id, src => src.User.Id)
                .Map(dest => dest.FirstName, src => src.User.FirstName)
                .Map(dest => dest.LastName, src => src.User.LastName)
                .Map(dest => dest.Email, src => src.User.Email);
        }
    }
}
