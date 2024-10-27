using GymManagement_API.Data.Models;

namespace GymManagement_API.Data.DTO
{
    public class RoomDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int MaxParticipants { get; set; }
        public string RoomType { get; set; }
    }
}
