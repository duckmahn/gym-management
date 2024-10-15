namespace GymManagement_API.Data.Models
{
    public class Trainers
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int Phone {  get; set; }
        public string Specialty { get; set; }
        public string Experience { get; set; }
        public ICollection<Rooms> Rooms { get; set; }
        public ICollection<Schedule> Schedules { get; set; }
    }
}
