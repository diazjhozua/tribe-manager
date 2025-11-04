using tribe_manager.domain.Common.Models;
using tribe_manager.domain.Task.ValueObjects;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.domain.Task.Entities;

public sealed class TaskAttachment : Entity<TaskId>
{
    public string FileName { get; private set; }
    public string FilePath { get; private set; }
    public UserId UploadedByUserId { get; private set; }
    public DateTime UploadedDateTime { get; private set; }
    public long FileSizeBytes { get; private set; }
    public string? ContentType { get; private set; }

    private TaskAttachment(
        TaskId id,
        string fileName,
        string filePath,
        UserId uploadedByUserId,
        long fileSizeBytes,
        string? contentType = null) : base(id)
    {
        FileName = fileName;
        FilePath = filePath;
        UploadedByUserId = uploadedByUserId;
        UploadedDateTime = DateTime.UtcNow;
        FileSizeBytes = fileSizeBytes;
        ContentType = contentType;
    }

    public static TaskAttachment Create(
        string fileName,
        string filePath,
        UserId uploadedByUserId,
        long fileSizeBytes,
        string? contentType = null)
    {
        if (string.IsNullOrWhiteSpace(fileName))
            throw new ArgumentException("File name cannot be null or empty.", nameof(fileName));

        if (string.IsNullOrWhiteSpace(filePath))
            throw new ArgumentException("File path cannot be null or empty.", nameof(filePath));

        if (fileSizeBytes <= 0)
            throw new ArgumentException("File size must be greater than 0.", nameof(fileSizeBytes));

        const long maxFileSizeBytes = 50 * 1024 * 1024; // 50MB
        if (fileSizeBytes > maxFileSizeBytes)
            throw new ArgumentException($"File size cannot exceed {maxFileSizeBytes / (1024 * 1024)}MB.", nameof(fileSizeBytes));

        return new TaskAttachment(
            TaskId.CreateNew(),
            fileName.Trim(),
            filePath.Trim(),
            uploadedByUserId,
            fileSizeBytes,
            contentType?.Trim());
    }

    public string GetFileSizeFormatted()
    {
        string[] sizes = { "B", "KB", "MB", "GB" };
        double size = FileSizeBytes;
        int order = 0;

        while (size >= 1024 && order < sizes.Length - 1)
        {
            order++;
            size /= 1024;
        }

        return $"{size:0.##} {sizes[order]}";
    }
}