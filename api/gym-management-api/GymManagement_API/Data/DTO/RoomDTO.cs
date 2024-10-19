using GymManagement_API.Data.Models;

namespace GymManagement_API.Data.DTO
{
    public class RoomDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid TrainerId { get; set; }  // Khóa ngoại tới Trainer
        public Guid ScheduleId { get; set; }
        public int MaxParticipants { get; set; }
    }
}
