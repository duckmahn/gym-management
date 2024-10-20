using GymManagement_API.Data.Models;

namespace GymManagement_API.Data.DTO
{
    public class ScheduleDTO
    {
        public Guid RoomId { get; set; }
        public Guid TrainerId { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Location { get; set; }
    }
}
