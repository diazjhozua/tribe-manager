using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace tribe_manager.api.Controllers
{
    /// <summary>
    /// Base API controller providing shared functionality for all controllers, such as error handling and dependency injection.
    /// </summary>
    [ApiController]
    public class ApiController : ControllerBase
    {
        /// <summary>
        /// Returns a standardized error response based on a list of errors.
        /// </summary>
        /// <param name="errors">The list of errors to process.</param>
        /// <returns>An IActionResult representing the error response.</returns>
        protected IActionResult Problem(List<Error> errors)
        {
            if (errors.All(error => error.Type == ErrorType.Validation))
            {
                return ValidationProblem(errors);
            }

            Error firstError = errors[0];

            return DefaultProblem(firstError);
        }

        /// <summary>
        /// Returns a default error response based on the first error's type.
        /// </summary>
        /// <param name="firstError">The first error in the list.</param>
        /// <returns>An IActionResult with the appropriate status code and message.</returns>
        private IActionResult DefaultProblem(Error firstError)
        {
            int statusCode = firstError.Type switch
            {
                ErrorType.Conflict => StatusCodes.Status409Conflict,
                ErrorType.Validation => StatusCodes.Status400BadRequest,
                ErrorType.NotFound => StatusCodes.Status404NotFound,
                _ => StatusCodes.Status500InternalServerError
            };

            return Problem(statusCode: statusCode, title: firstError.Description);
        }

        /// <summary>
        /// Returns a validation error response with model state errors.
        /// </summary>
        /// <param name="errors">The list of validation errors.</param>
        /// <returns>An IActionResult with validation problem details.</returns>
        private IActionResult ValidationProblem(List<Error> errors)
        {
            ModelStateDictionary modelStateDictionary = new();

            foreach (Error error in errors)
            {
                modelStateDictionary.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem(modelStateDictionary);
        }
    }
}
