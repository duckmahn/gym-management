using NuGet.DependencyResolver;

namespace GymManagement_API.Data.Models
{
    public class BookingTrainer
    {
        public Guid Id { get; set; }
        public Guid TrainerId { get; set; }
        public Guid UserId { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsConfirmed { get; set; }
    }
}
