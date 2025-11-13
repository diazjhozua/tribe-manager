using ErrorOr;
using FluentValidation;
using MediatR;

namespace tribe_manager.application.Common.Behaviors
{
    public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null) :
        IPipelineBehavior<TRequest, TResponse>
            where TRequest : IRequest<TResponse>
            where TResponse : IErrorOr
    {

        private readonly IValidator<TRequest>? _validator = validator;

        public async Task<TResponse> Handle(
            TRequest request,
            RequestHandlerDelegate<TResponse> next,
            CancellationToken cancellationToken)
        {

            if (_validator is null)
            {
                return await next(cancellationToken);
            }

            FluentValidation.Results.ValidationResult validationResult = await _validator.ValidateAsync(request, cancellationToken);

            if (validationResult.IsValid)
            {
                return await next(cancellationToken);
            }

            List<Error> errors = validationResult.Errors
                .ConvertAll(validationFailure => Error.Validation(
                    validationFailure.PropertyName,
                    validationFailure.ErrorMessage));

            return (dynamic)errors;
        }
    }
}
