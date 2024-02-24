using Microsoft.AspNetCore.Mvc;

namespace tribe_manager.api.Controllers
{
    public class ErrorController : ControllerBase
    {
        [Route("/error")]
        public IActionResult Error()
        {
            return Problem();
        }
    }
}
