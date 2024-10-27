using GymManagement_API.Data.Models;

namespace GymManagement_API.Data.DTO
{
    public class BookingRoomDTO
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int NumberOfParticipants { get; set; }
        public bool IsConfirmed { get; set; }
    }
}
