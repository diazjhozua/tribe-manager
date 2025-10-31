using Microsoft.AspNetCore.Mvc;

namespace tribe_manager.api.Controllers
{
    /// <summary>
    /// Controller for handling global application errors.
    /// </summary>
    public class ErrorController : ControllerBase
    {
        /// <summary>
        /// Handles unhandled exceptions and returns a generic 500 error response.
        /// </summary>
        /// <returns>An IActionResult with status code 500.</returns>
        [Route("/error")]
        public IActionResult Error()
        {
            return Problem(statusCode: 500);
        }
    }
}
