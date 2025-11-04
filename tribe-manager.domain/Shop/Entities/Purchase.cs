using tribe_manager.domain.Common.Models;
using tribe_manager.domain.Shop.Enums;
using tribe_manager.domain.Shop.ValueObjects;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.domain.Shop.Entities;

public sealed class Purchase : Entity<PurchaseId>
{
    public UserId UserId { get; private set; }
    public RewardItemId RewardItemId { get; private set; }
    public int PointsSpent { get; private set; }
    public PurchaseStatus Status { get; private set; }
    public DateTime PurchaseDateTime { get; private set; }
    public DateTime? ApprovalDateTime { get; private set; }
    public UserId? ApprovedByUserId { get; private set; }
    public DateTime? RedeemedDateTime { get; private set; }
    public DateTime ExpirationDateTime { get; private set; }
    public string? Notes { get; private set; }

    private Purchase(
        PurchaseId id,
        UserId userId,
        RewardItemId rewardItemId,
        int pointsSpent,
        DateTime expirationDateTime,
        string? notes = null) : base(id)
    {
        UserId = userId;
        RewardItemId = rewardItemId;
        PointsSpent = pointsSpent;
        Status = PurchaseStatus.Pending;
        PurchaseDateTime = DateTime.UtcNow;
        ExpirationDateTime = expirationDateTime;
        Notes = notes;
    }

    public static Purchase Create(
        UserId userId,
        RewardItemId rewardItemId,
        int pointsSpent,
        DateTime expirationDateTime,
        string? notes = null)
    {
        if (pointsSpent <= 0)
            throw new ArgumentException("Points spent must be greater than 0.", nameof(pointsSpent));

        if (expirationDateTime <= DateTime.UtcNow)
            throw new ArgumentException("Expiration date must be in the future.", nameof(expirationDateTime));

        if (!string.IsNullOrWhiteSpace(notes) && notes.Length > 500)
            throw new ArgumentException("Notes cannot exceed 500 characters.", nameof(notes));

        return new Purchase(
            PurchaseId.CreateNew(),
            userId,
            rewardItemId,
            pointsSpent,
            expirationDateTime,
            notes?.Trim());
    }

    public void Approve(UserId approvedByUserId)
    {
        if (Status != PurchaseStatus.Pending)
            throw new InvalidOperationException($"Cannot approve purchase with status {Status}.");

        if (IsExpired())
            throw new InvalidOperationException("Cannot approve expired purchase.");

        Status = PurchaseStatus.Approved;
        ApprovalDateTime = DateTime.UtcNow;
        ApprovedByUserId = approvedByUserId;
    }

    public void Reject(UserId rejectedByUserId)
    {
        if (Status != PurchaseStatus.Pending)
            throw new InvalidOperationException($"Cannot reject purchase with status {Status}.");

        Status = PurchaseStatus.Rejected;
        ApprovalDateTime = DateTime.UtcNow;
        ApprovedByUserId = rejectedByUserId;
    }

    public void Redeem()
    {
        if (Status != PurchaseStatus.Approved && Status != PurchaseStatus.Pending)
            throw new InvalidOperationException($"Cannot redeem purchase with status {Status}.");

        if (IsExpired())
            throw new InvalidOperationException("Cannot redeem expired purchase.");

        Status = PurchaseStatus.Redeemed;
        RedeemedDateTime = DateTime.UtcNow;

        // Auto-approve if not already approved
        if (Status == PurchaseStatus.Pending)
        {
            ApprovalDateTime = DateTime.UtcNow;
        }
    }

    public void Cancel()
    {
        if (Status == PurchaseStatus.Redeemed)
            throw new InvalidOperationException("Cannot cancel redeemed purchase.");

        if (Status == PurchaseStatus.Expired)
            throw new InvalidOperationException("Cannot cancel expired purchase.");

        Status = PurchaseStatus.Cancelled;
    }

    public void MarkAsExpired()
    {
        if (Status == PurchaseStatus.Redeemed)
            throw new InvalidOperationException("Cannot expire redeemed purchase.");

        if (Status == PurchaseStatus.Cancelled)
            throw new InvalidOperationException("Cannot expire cancelled purchase.");

        Status = PurchaseStatus.Expired;
    }

    public void UpdateNotes(string? newNotes)
    {
        if (!string.IsNullOrWhiteSpace(newNotes) && newNotes.Length > 500)
            throw new ArgumentException("Notes cannot exceed 500 characters.", nameof(newNotes));

        Notes = newNotes?.Trim();
    }

    public void ExtendExpiration(int additionalDays)
    {
        if (additionalDays <= 0)
            throw new ArgumentException("Additional days must be greater than 0.", nameof(additionalDays));

        if (Status == PurchaseStatus.Expired)
            throw new InvalidOperationException("Cannot extend expiration of expired purchase.");

        if (Status == PurchaseStatus.Redeemed)
            throw new InvalidOperationException("Cannot extend expiration of redeemed purchase.");

        ExpirationDateTime = ExpirationDateTime.AddDays(additionalDays);
    }

    public bool IsExpired() => DateTime.UtcNow > ExpirationDateTime;

    public bool RequiresApproval() => Status == PurchaseStatus.Pending;

    public bool CanBeRedeemed() =>
        (Status == PurchaseStatus.Approved || Status == PurchaseStatus.Pending) &&
        !IsExpired();

    public int DaysUntilExpiration() =>
        (int)Math.Ceiling((ExpirationDateTime - DateTime.UtcNow).TotalDays);
}