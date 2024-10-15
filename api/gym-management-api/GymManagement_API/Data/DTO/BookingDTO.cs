using GymManagement_API.Data.Models;

namespace GymManagement_API.Data.DTO
{
    public class BookingDTO
    {
        public Guid UserId { get; set; }
        public Users User { get; set; }
        public Guid RoomId { get; set; } 
        public Rooms Room { get; set; }
        public int ScheduleId { get; set; }
        public Schedule Schedule { get; set; }
        public DateTime BookingDate { get; set; }
        public string Status { get; set; }
    }
}
