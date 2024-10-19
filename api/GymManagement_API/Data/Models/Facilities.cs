namespace GymManagement_API.Data.Models
{
    public class Facilities
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public Guid RoomId { get; set; }
        public Rooms Rooms { get; set; }
        public DateTime LastMaintenanceDate { get; set; }
    }
}
