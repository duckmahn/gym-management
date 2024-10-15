namespace GymManagement_API.Data.Models
{
    public class Healinfo
    {
        public Guid Id { get; set; }
        public double Weight { get; set; }
        public double Height { get; set; }
        public double Bmi { get; set; }
        public string Goal { get; set; }
        public string ProgressNote { get; set; }

        public ICollection<Users> Users { get; set; }
    }
}
