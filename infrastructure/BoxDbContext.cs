using Domain.Enteties;
using Microsoft.EntityFrameworkCore;

namespace infrastructure;

public class BoxDbContext : DbContext
{
    public BoxDbContext(DbContextOptions<BoxDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Box>()
            .Property(b => b.Id)
            .ValueGeneratedOnAdd();
    }
    
    public DbSet<Box> BoxTable { get; set; }
}