using tribe_manager.domain.Common.Models;
using tribe_manager.domain.Shop.Enums;
using tribe_manager.domain.Shop.ValueObjects;
using tribe_manager.domain.Tribe.ValueObjects;
using tribe_manager.domain.User.ValueObjects;

namespace tribe_manager.domain.Shop.Entities;

public sealed class Shop : AggregateRoot<ShopId>
{
    public TribeId TribeId { get; private set; }
    public string Name { get; private set; }
    public string Description { get; private set; }
    public bool IsActive { get; private set; }
    public ShopSettings Settings { get; private set; }
    public ShopStatistics Statistics { get; private set; }
    public DateTime CreatedDateTime { get; private set; }
    public DateTime UpdatedDateTime { get; private set; }

    private readonly List<RewardItem> _rewardItems;
    private readonly List<Purchase> _purchases;

    public IReadOnlyList<RewardItem> RewardItems => _rewardItems.AsReadOnly();
    public IReadOnlyList<Purchase> Purchases => _purchases.AsReadOnly();

    // Parameterless constructor for EF Core
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    private Shop() : base()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    {
        _rewardItems = new List<RewardItem>();
        _purchases = new List<Purchase>();
    }

    private Shop(
        ShopId id,
        TribeId tribeId,
        string name,
        string description,
        ShopSettings? settings = null) : base(id)
    {
        TribeId = tribeId;
        Name = name;
        Description = description;
        IsActive = true;
        Settings = settings ?? ShopSettings.Default;
        Statistics = ShopStatistics.Empty;
        CreatedDateTime = DateTime.UtcNow;
        UpdatedDateTime = DateTime.UtcNow;

        _rewardItems = new List<RewardItem>();
        _purchases = new List<Purchase>();
    }

    public static Shop Create(
        TribeId tribeId,
        string name,
        string description,
        ShopSettings? settings = null)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Shop name cannot be null or empty.", nameof(name));

        if (string.IsNullOrWhiteSpace(description))
            throw new ArgumentException("Shop description cannot be null or empty.", nameof(description));

        return new Shop(
            ShopId.CreateNew(),
            tribeId,
            name.Trim(),
            description.Trim(),
            settings);
    }

    public void UpdateDetails(string name, string description)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Shop name cannot be null or empty.", nameof(name));

        if (string.IsNullOrWhiteSpace(description))
            throw new ArgumentException("Shop description cannot be null or empty.", nameof(description));

        Name = name.Trim();
        Description = description.Trim();
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void UpdateSettings(ShopSettings newSettings)
    {
        Settings = newSettings ?? throw new ArgumentNullException(nameof(newSettings));
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void Activate()
    {
        IsActive = true;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void Deactivate()
    {
        IsActive = false;
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void AddRewardItem(RewardItem rewardItem)
    {
        if (rewardItem == null)
            throw new ArgumentNullException(nameof(rewardItem));

        if (_rewardItems.Any(r => r.Id == rewardItem.Id))
            throw new InvalidOperationException($"Reward item {rewardItem.Id} already exists in shop.");

        _rewardItems.Add(rewardItem);
        RecalculateStatistics();
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void RemoveRewardItem(RewardItemId rewardItemId)
    {
        var rewardItem = GetRewardItem(rewardItemId);

        // Check if there are any pending or approved purchases for this item
        var activePurchases = _purchases.Where(p =>
            p.RewardItemId == rewardItemId &&
            (p.Status == PurchaseStatus.Pending || p.Status == PurchaseStatus.Approved)).ToList();

        if (activePurchases.Any())
            throw new InvalidOperationException($"Cannot remove reward item with {activePurchases.Count} active purchases.");

        _rewardItems.Remove(rewardItem);
        RecalculateStatistics();
        UpdatedDateTime = DateTime.UtcNow;
    }

    public Purchase PurchaseReward(
        UserId userId,
        RewardItemId rewardItemId,
        int userPointBalance,
        string? notes = null)
    {
        if (!IsActive)
            throw new InvalidOperationException("Shop is not active.");

        var rewardItem = GetRewardItem(rewardItemId);

        if (!rewardItem.CanBePurchased())
            throw new InvalidOperationException($"Reward item {rewardItemId} cannot be purchased.");

        if (userPointBalance < rewardItem.PointsCost)
            throw new InvalidOperationException($"Insufficient points. Required: {rewardItem.PointsCost}, Available: {userPointBalance}");

        // Check purchase limits
        var userPendingPurchases = _purchases.Count(p =>
            p.UserId == userId &&
            (p.Status == PurchaseStatus.Pending || p.Status == PurchaseStatus.Approved));

        if (userPendingPurchases >= Settings.MaxPendingPurchases)
            throw new InvalidOperationException($"User has reached maximum pending purchases limit of {Settings.MaxPendingPurchases}.");

        // Create purchase
        var expirationDate = DateTime.UtcNow.AddDays(rewardItem.ValidityDays);
        var purchase = Purchase.Create(
            userId,
            rewardItemId,
            rewardItem.PointsCost,
            expirationDate,
            notes);

        // Auto-approve if not required
        if (!rewardItem.RequiresApproval && !Settings.RequireManagerApproval)
        {
            purchase.Approve(userId); // Self-approved
        }

        _purchases.Add(purchase);

        // Decrement stock
        rewardItem.DecrementStock();

        RecalculateStatistics();
        UpdatedDateTime = DateTime.UtcNow;

        return purchase;
    }

    public void ApprovePurchase(PurchaseId purchaseId, UserId approvedByUserId)
    {
        var purchase = GetPurchase(purchaseId);
        purchase.Approve(approvedByUserId);
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void RejectPurchase(PurchaseId purchaseId, UserId rejectedByUserId)
    {
        var purchase = GetPurchase(purchaseId);
        var rewardItem = GetRewardItem(purchase.RewardItemId);

        purchase.Reject(rejectedByUserId);

        // Restore stock
        rewardItem.IncrementStock();

        UpdatedDateTime = DateTime.UtcNow;
    }

    public void RedeemPurchase(PurchaseId purchaseId)
    {
        var purchase = GetPurchase(purchaseId);
        purchase.Redeem();
        UpdatedDateTime = DateTime.UtcNow;
    }

    public void CancelPurchase(PurchaseId purchaseId)
    {
        var purchase = GetPurchase(purchaseId);
        var rewardItem = GetRewardItem(purchase.RewardItemId);

        purchase.Cancel();

        // Restore stock
        rewardItem.IncrementStock();

        UpdatedDateTime = DateTime.UtcNow;
    }

    public void ProcessExpiredPurchases()
    {
        var expiredPurchases = _purchases.Where(p =>
            p.IsExpired() &&
            p.Status != PurchaseStatus.Expired &&
            p.Status != PurchaseStatus.Redeemed &&
            p.Status != PurchaseStatus.Cancelled).ToList();

        foreach (var purchase in expiredPurchases)
        {
            purchase.MarkAsExpired();

            // Restore stock
            var rewardItem = GetRewardItem(purchase.RewardItemId);
            rewardItem.IncrementStock();
        }

        if (expiredPurchases.Any())
        {
            UpdatedDateTime = DateTime.UtcNow;
        }
    }

    public IEnumerable<Purchase> GetPendingPurchases() =>
        _purchases.Where(p => p.Status == PurchaseStatus.Pending);

    public IEnumerable<Purchase> GetUserPurchases(UserId userId) =>
        _purchases.Where(p => p.UserId == userId);

    public IEnumerable<RewardItem> GetAvailableRewards() =>
        _rewardItems.Where(r => r.CanBePurchased());

    public IEnumerable<RewardItem> GetRewardsByCategory(RewardCategory category) =>
        _rewardItems.Where(r => r.Category == category);

    public RewardItem GetRewardItem(RewardItemId rewardItemId)
    {
        var rewardItem = _rewardItems.FirstOrDefault(r => r.Id == rewardItemId);
        return rewardItem ?? throw new InvalidOperationException($"Reward item {rewardItemId} not found.");
    }

    public Purchase GetPurchase(PurchaseId purchaseId)
    {
        var purchase = _purchases.FirstOrDefault(p => p.Id == purchaseId);
        return purchase ?? throw new InvalidOperationException($"Purchase {purchaseId} not found.");
    }

    public int GetTotalPointsSpentByUser(UserId userId) =>
        _purchases
            .Where(p => p.UserId == userId && p.Status == PurchaseStatus.Redeemed)
            .Sum(p => p.PointsSpent);

    private void RecalculateStatistics()
    {
        var totalRewards = _rewardItems.Count;
        var totalPurchases = _purchases.Count(p => p.Status == PurchaseStatus.Redeemed);
        var totalPointsSpent = _purchases
            .Where(p => p.Status == PurchaseStatus.Redeemed)
            .Sum(p => p.PointsSpent);

        // Calculate most popular reward
        var mostPopularRewardId = _purchases
            .Where(p => p.Status == PurchaseStatus.Redeemed)
            .GroupBy(p => p.RewardItemId)
            .OrderByDescending(g => g.Count())
            .FirstOrDefault()?.Key;

        Statistics = ShopStatistics.Create(
            totalRewards,
            totalPurchases,
            totalPointsSpent,
            mostPopularRewardId);
    }
}