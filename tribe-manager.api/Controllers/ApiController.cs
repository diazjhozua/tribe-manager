using ErrorOr;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace tribe_manager.api.Controllers
{
    /// <summary>
    /// Base API controller providing shared functionality for all controllers in the tribe management system.
    /// Implements ErrorOr pattern for consistent error handling and provides MediatR integration for CQRS operations.
    /// </summary>
    /// <remarks>
    /// This controller serves as the foundation for all API endpoints, providing:
    /// - Standardized error response formatting using RFC 7807 Problem Details
    /// - MediatR integration for command/query handling
    /// - Mapster integration for object mapping
    /// - Validation error processing with model state integration
    /// </remarks>
    /// <param name="mediator">The MediatR sender instance for dispatching commands and queries.</param>
    /// <param name="mapper">The Mapster mapper instance for object transformation.</param>
    [ApiController]
    public class ApiController(ISender mediator, IMapper mapper) : ControllerBase
    {
        /// <summary>
        /// Mediator instance for dispatching commands and queries through the MediatR pipeline.
        /// Enables CQRS pattern implementation with request/response handling, validation, and behaviors.
        /// </summary>
        protected readonly ISender _mediator = mediator;

        /// <summary>
        /// Mapster mapper instance for transforming domain objects to DTOs and vice versa.
        /// Provides high-performance object mapping with compile-time code generation.
        /// </summary>
        protected readonly IMapper _mapper = mapper;

        /// <summary>
        /// Converts ErrorOr errors into standardized HTTP problem responses following RFC 7807.
        /// Automatically detects validation errors and formats them appropriately for client consumption.
        /// </summary>
        /// <param name="errors">The collection of errors from ErrorOr pattern to convert into HTTP responses.</param>
        /// <returns>
        /// An IActionResult representing either:
        /// - ValidationProblem for validation errors (400 Bad Request with model state)
        /// - Problem for other error types with appropriate HTTP status codes
        /// </returns>
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
        /// Creates an HTTP problem response based on the error type, mapping domain errors to appropriate HTTP status codes.
        /// Follows REST API conventions for error handling and provides consistent client experience.
        /// </summary>
        /// <param name="firstError">The primary error to process, used to determine the response type and status code.</param>
        /// <returns>
        /// An IActionResult with HTTP status code mapping:
        /// - 409 Conflict for domain conflicts
        /// - 400 Bad Request for validation errors
        /// - 404 Not Found for missing resources
        /// - 500 Internal Server Error for unexpected errors
        /// </returns>
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
        /// Transforms validation errors into ASP.NET Core ModelState format for consistent client-side validation handling.
        /// Creates a structured validation response that front-end applications can easily consume and display.
        /// </summary>
        /// <param name="errors">The collection of validation errors to transform into ModelState entries.</param>
        /// <returns>
        /// A ValidationProblem response (400 Bad Request) containing:
        /// - Structured error details with field-specific validation messages
        /// - RFC 7807 compliant problem details format
        /// - ModelState dictionary for framework integration
        /// </returns>
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
