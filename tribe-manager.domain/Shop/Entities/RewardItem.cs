using tribe_manager.domain.Common.Models;
using tribe_manager.domain.Shop.Enums;
using tribe_manager.domain.Shop.ValueObjects;

namespace tribe_manager.domain.Shop.Entities;

public sealed class RewardItem : Entity<RewardItemId>
{
    public RewardDetails Details { get; private set; }
    public RewardCategory Category { get; private set; }
    public RewardType Type { get; private set; }
    public PointsCost PointsCost { get; private set; }
    public bool IsAvailable { get; private set; }
    public int? StockQuantity { get; private set; }
    public int ValidityDays { get; private set; }
    public bool RequiresApproval { get; private set; }
    public DateTime CreatedDateTime { get; private set; }
    public DateTime UpdatedDateTime { get; private set; }

    // Parameterless constructor for EF Core
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    private RewardItem() : base()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    {
    }

    private RewardItem(
        RewardItemId id,
        RewardDetails details,
        RewardCategory category,
        RewardType type,
        PointsCost pointsCost,
        int validityDays = 30,
        bool requiresApproval = false,
        int? stockQuantity = null) : base(id)
    {
        Details = details;
        Category = category;
        Type = type;
        PointsCost = pointsCost;
        ValidityDays = validityDays;
        RequiresApproval = requiresApproval;
        StockQuantity = stockQuantity;
        IsAvailable = true;
        CreatedDateTime = DateTime.UtcNow;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public static RewardItem Create(
        RewardDetails details,
        RewardCategory category,
        RewardType type,
        PointsCost pointsCost,
        int validityDays = 30,
        bool requiresApproval = false,
        int? stockQuantity = null)
    {
        if (validityDays <= 0)
            throw new ArgumentException("Validity days must be greater than 0.", nameof(validityDays));

        if (validityDays > 365)
            throw new ArgumentException("Validity days cannot exceed 365.", nameof(validityDays));

        if (stockQuantity.HasValue && stockQuantity.Value < 0)
            throw new ArgumentException("Stock quantity cannot be negative.", nameof(stockQuantity));

        return new RewardItem(
            RewardItemId.CreateNew(),
            details,
            category,
            type,
            pointsCost,
            validityDays,
            requiresApproval,
            stockQuantity);
    }

    public void UpdateDetails(RewardDetails newDetails)
    {
        Details = newDetails ?? throw new ArgumentNullException(nameof(newDetails));
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void UpdatePricing(PointsCost newPointsCost)
    {
        PointsCost = newPointsCost ?? throw new ArgumentNullException(nameof(newPointsCost));
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void SetAvailability(bool isAvailable)
    {
        IsAvailable = isAvailable;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void UpdateStock(int? newStockQuantity)
    {
        if (newStockQuantity.HasValue && newStockQuantity.Value < 0)
            throw new ArgumentException("Stock quantity cannot be negative.", nameof(newStockQuantity));

        StockQuantity = newStockQuantity;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void DecrementStock(int quantity = 1)
    {
        if (!StockQuantity.HasValue)
            return; // Unlimited stock

        if (quantity <= 0)
            throw new ArgumentException("Quantity must be greater than 0.", nameof(quantity));

        if (StockQuantity.Value < quantity)
            throw new InvalidOperationException($"Insufficient stock. Available: {StockQuantity.Value}, Requested: {quantity}");

        StockQuantity -= quantity;

        if (StockQuantity == 0)
            IsAvailable = false;

        UpdatedDateTime = DateTime.UtcNow;
    }

    public void IncrementStock(int quantity = 1)
    {
        if (!StockQuantity.HasValue)
            return; // Unlimited stock

        if (quantity <= 0)
            throw new ArgumentException("Quantity must be greater than 0.", nameof(quantity));

        StockQuantity += quantity;

        if (!IsAvailable && StockQuantity > 0)
            IsAvailable = true;

        UpdatedDateTime = DateTime.UtcNow;
    }

    public void UpdateValidityDays(int newValidityDays)
    {
        if (newValidityDays <= 0)
            throw new ArgumentException("Validity days must be greater than 0.", nameof(newValidityDays));

        if (newValidityDays > 365)
            throw new ArgumentException("Validity days cannot exceed 365.", nameof(newValidityDays));

        ValidityDays = newValidityDays;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void SetApprovalRequirement(bool requiresApproval)
    {
        RequiresApproval = requiresApproval;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public bool IsInStock() => !StockQuantity.HasValue || StockQuantity.Value > 0;

    public bool CanBePurchased() => IsAvailable && IsInStock();
}