namespace GymManagement_API.Data.DTO
{
    public class BookingTrainerDTO
    {
        public DateTime BookingDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsConfirmed { get; set; }
    }
}
