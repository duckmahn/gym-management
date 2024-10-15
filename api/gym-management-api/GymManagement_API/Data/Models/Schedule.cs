using NuGet.DependencyResolver;

namespace GymManagement_API.Data.Models
{
    public class Schedule
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public Guid TrainerId { get; set; }
        public Trainers Trainer { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Location { get; set; }
    }
}
