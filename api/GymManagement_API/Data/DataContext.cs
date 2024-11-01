using GymManagement_API.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace GymManagement_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Users> Users { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }
        public DbSet<Trainers> Trainers { get; set; }
        public DbSet<Membership> Memberships { get; set; }
        public DbSet<Rooms> Rooms { get; set; }
        public DbSet<Healinfo> HealInfos { get; set; }
        public DbSet<BookingRoom> BookingRooms { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Facilities> Facilities { get; set; }
        public DbSet<BookingTrainer> BookingTrainers { get; set; }
        public DbSet<Courses> Courses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed an admin user
            modelBuilder.Entity<Users>().HasData(new Users
            {
                Id = Guid.NewGuid(),
                Email = "admin@gym.com",
                Username = "admin",
                Firstname = "Admin",
                Lastname = "User",
                Password = "Admin@123", // Note: In a real application, ensure passwords are hashed
                IsAdmin = true,
            });
        }
    }



}
