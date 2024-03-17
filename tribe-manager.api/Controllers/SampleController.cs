using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace tribe_manager.api.Controllers
{
    [Route("api/[controller]")]
    public class SampleController(ISender mediator, IMapper mapper) : ApiController(mediator, mapper)
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(Array.Empty<string>());
        }
    }
}
