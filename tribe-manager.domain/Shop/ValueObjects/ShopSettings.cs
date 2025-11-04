using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.Shop.ValueObjects;

public sealed class ShopSettings : ValueObject
{
    public bool AllowPartialPointSpending { get; }
    public bool RequireManagerApproval { get; }
    public int MaxPendingPurchases { get; }
    public int PointExpirationDays { get; }

    private ShopSettings(
        bool allowPartialPointSpending,
        bool requireManagerApproval,
        int maxPendingPurchases,
        int pointExpirationDays)
    {
        AllowPartialPointSpending = allowPartialPointSpending;
        RequireManagerApproval = requireManagerApproval;
        MaxPendingPurchases = maxPendingPurchases;
        PointExpirationDays = pointExpirationDays;
    }

    public static ShopSettings Create(
        bool allowPartialPointSpending = false,
        bool requireManagerApproval = true,
        int maxPendingPurchases = 3,
        int pointExpirationDays = 365)
    {
        if (maxPendingPurchases <= 0)
            throw new ArgumentException("Max pending purchases must be greater than 0.", nameof(maxPendingPurchases));

        if (maxPendingPurchases > 10)
            throw new ArgumentException("Max pending purchases cannot exceed 10.", nameof(maxPendingPurchases));

        if (pointExpirationDays <= 0)
            throw new ArgumentException("Point expiration days must be greater than 0.", nameof(pointExpirationDays));

        if (pointExpirationDays > 1095) // 3 years max
            throw new ArgumentException("Point expiration cannot exceed 3 years.", nameof(pointExpirationDays));

        return new ShopSettings(
            allowPartialPointSpending,
            requireManagerApproval,
            maxPendingPurchases,
            pointExpirationDays);
    }

    public static ShopSettings Default => Create();

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return AllowPartialPointSpending;
        yield return RequireManagerApproval;
        yield return MaxPendingPurchases;
        yield return PointExpirationDays;
    }
}