using tribe_manager.domain.Common.Models;

namespace tribe_manager.domain.Shop.ValueObjects;

public sealed class ShopStatistics : ValueObject
{
    public int TotalRewards { get; }
    public int TotalPurchases { get; }
    public int TotalPointsSpent { get; }
    public RewardItemId? MostPopularRewardId { get; }
    public double AveragePointsPerPurchase { get; }

    private ShopStatistics(
        int totalRewards,
        int totalPurchases,
        int totalPointsSpent,
        RewardItemId? mostPopularRewardId,
        double averagePointsPerPurchase)
    {
        TotalRewards = totalRewards;
        TotalPurchases = totalPurchases;
        TotalPointsSpent = totalPointsSpent;
        MostPopularRewardId = mostPopularRewardId;
        AveragePointsPerPurchase = averagePointsPerPurchase;
    }

    public static ShopStatistics Create(
        int totalRewards = 0,
        int totalPurchases = 0,
        int totalPointsSpent = 0,
        RewardItemId? mostPopularRewardId = null)
    {
        if (totalRewards < 0)
            throw new ArgumentException("Total rewards cannot be negative.", nameof(totalRewards));

        if (totalPurchases < 0)
            throw new ArgumentException("Total purchases cannot be negative.", nameof(totalPurchases));

        if (totalPointsSpent < 0)
            throw new ArgumentException("Total points spent cannot be negative.", nameof(totalPointsSpent));

        var averagePointsPerPurchase = totalPurchases == 0 ? 0 : (double)totalPointsSpent / totalPurchases;

        return new ShopStatistics(
            totalRewards,
            totalPurchases,
            totalPointsSpent,
            mostPopularRewardId,
            averagePointsPerPurchase);
    }

    public static ShopStatistics Empty => Create();

    public ShopStatistics AddPurchase(int pointsSpent)
    {
        return Create(
            TotalRewards,
            TotalPurchases + 1,
            TotalPointsSpent + pointsSpent,
            MostPopularRewardId);
    }

    public ShopStatistics UpdateMostPopularReward(RewardItemId rewardId)
    {
        return new ShopStatistics(
            TotalRewards,
            TotalPurchases,
            TotalPointsSpent,
            rewardId,
            AveragePointsPerPurchase);
    }

    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return TotalRewards;
        yield return TotalPurchases;
        yield return TotalPointsSpent;
        yield return MostPopularRewardId?.Value ?? Guid.Empty;
        yield return AveragePointsPerPurchase;
    }
}