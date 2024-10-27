namespace GymManagement_API.Data.Models
{
    public class Membership
    {
        public Guid Id { get; set; }
        public string Type {  get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
        public Guid UserId { get; set; }
    }
}
