using NuGet.DependencyResolver;

namespace GymManagement_API.Data.Models
{
    public class Rooms
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int MaxParticipants { get; set; }
        public string RoomType {  get; set; }
    }
}
