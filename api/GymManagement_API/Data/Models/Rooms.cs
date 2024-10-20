using NuGet.DependencyResolver;

namespace GymManagement_API.Data.Models
{
    public class Rooms
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid TrainerId { get; set; }  // Khóa ngoại tới Trainer
        public Guid ScheduleId { get; set; }
        public int MaxParticipants { get; set; }
    }
}
