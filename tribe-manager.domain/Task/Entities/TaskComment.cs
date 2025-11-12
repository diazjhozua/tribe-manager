using tribe_manager.domain.Common.Models;
using tribe_manager.domain.Task.ValueObjects;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.domain.Task.Entities;

public sealed class TaskComment : Entity<TaskId>
{
    public UserId UserId { get; private set; }
    public string Content { get; private set; }
    public DateTime CreatedDateTime { get; private set; }

    // Parameterless constructor for EF Core
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    private TaskComment() : base()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    {
    }

    private TaskComment(
        TaskId id,
        UserId userId,
        string content) : base(id)
    {
        UserId = userId;
        Content = content;
        CreatedDateTime = DateTime.UtcNow;
    }

    public static TaskComment Create(UserId userId, string content)
    {
        if (string.IsNullOrWhiteSpace(content))
            throw new ArgumentException("Comment content cannot be null or empty.", nameof(content));

        if (content.Length > 2000)
            throw new ArgumentException("Comment content cannot exceed 2000 characters.", nameof(content));

        return new TaskComment(
            TaskId.CreateNew(),
            userId,
            content.Trim());
    }

    public void UpdateContent(string newContent)
    {
        if (string.IsNullOrWhiteSpace(newContent))
            throw new ArgumentException("Comment content cannot be null or empty.", nameof(newContent));

        if (newContent.Length > 2000)
            throw new ArgumentException("Comment content cannot exceed 2000 characters.", nameof(newContent));

        Content = newContent.Trim();
    }
}