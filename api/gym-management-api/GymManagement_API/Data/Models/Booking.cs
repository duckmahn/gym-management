namespace GymManagement_API.Data.Models
{
    public class Booking
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }  // Khóa ngoại tới User
        public Users User { get; set; }
        public Guid RoomId { get; set; }  // Khóa ngoại tới Room
        public Rooms Room { get; set; }
        public int ScheduleId { get; set; }  // Khóa ngoại tới Schedule
        public Schedule Schedule { get; set; }
        public DateTime BookingDate { get; set; }
        public string Status { get; set; }
    }
}
