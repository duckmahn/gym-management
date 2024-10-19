using GymManagement_API.Data.Models;
using Microsoft.EntityFrameworkCore;
using NuGet.DependencyResolver;

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
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Facilities> Facilities { get; set; }
    }
}
