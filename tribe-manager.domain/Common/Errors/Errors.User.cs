using ErrorOr;

namespace tribe_manager.domain.Common.Errors;

public static partial class Errors
{
    public static class User
    {
        public static Error DuplicateEmail => Error.Conflict(
            code: "User.DuplicateEmail",
            description: "A user with this email already exists.");

        public static Error NotFound => Error.NotFound(
            code: "User.NotFound",
            description: "User not found.");

        public static Error InactiveUser => Error.Forbidden(
            code: "User.InactiveUser",
            description: "User account is inactive.");
    }
}