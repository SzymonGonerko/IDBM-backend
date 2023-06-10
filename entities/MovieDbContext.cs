using Microsoft.EntityFrameworkCore;

namespace IDBM.entities
{
    public class MovieDbContext : DbContext
    {
        private string _connectionsString = "Server=(localdb)\\mssqllocaldb;Database=MoviesDb;Trusted_Connection=True;";
        public DbSet<Movie> Movies { get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Movie>()
                .Property(r => r.Title)
                .HasMaxLength(100);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionsString);
        }
    }
}
