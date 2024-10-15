namespace GymManagement_API.Data.Models
{
    public class Membership
    {
        public Guid Id { get; set; }
        public string Type {  get; set; }
        public decimal Price { get; set; }
        public int Duration { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ICollection<Users> Users { get; set; }
    }
}
