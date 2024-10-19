namespace GymManagement_API.Data.Models
{
    public class Booking
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }  // Khóa ngoại tới User
        public Guid RoomId { get; set; }  // Khóa ngoại tới Room
        public Guid ScheduleId { get; set; }  // Khóa ngoại tới Schedule
        public DateTime BookingDate { get; set; }
        public string Status { get; set; }
        public Guid? TrainersId { get; set; }
    }
}
