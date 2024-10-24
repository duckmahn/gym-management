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
        public string Avatar {  get; set; }
        public string Type {  get; set; }
    }
}
