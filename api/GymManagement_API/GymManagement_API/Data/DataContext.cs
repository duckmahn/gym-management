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
    }
}
