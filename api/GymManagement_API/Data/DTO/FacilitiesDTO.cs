using GymManagement_API.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace GymManagement_API.Data.DTO
{
    public class FacilitiesDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public Guid RoomId { get; set; }
        public Rooms Rooms { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime LastMaintenanceDate { get; set; }
    }
}
