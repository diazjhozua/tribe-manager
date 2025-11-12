using Microsoft.EntityFrameworkCore;
using tribe_manager.domain.User.Entities;
using tribe_manager.infrastructure.Persistence.Configurations;

namespace tribe_manager.infrastructure.Persistence;

public class TribeManagerDbContext : DbContext
{
    public TribeManagerDbContext(DbContextOptions<TribeManagerDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserConfigurations());

        base.OnModelCreating(modelBuilder);
    }
}