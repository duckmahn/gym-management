namespace GymManagement_API.Data.DTO
{
    public class MembershipDTO
    {
        public string Type { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}
