 namespace GymManagement_API.Data.Models
{
    public class BookingRoom
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public Guid UserId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int NumberOfParticipants { get; set; }
        public bool IsConfirmed { get; set; }
    }
}
