namespace GymManagement_API.Data.DTO
{
    public class MembershipDTO
    {
        public string Type { get; set; }
        public decimal Price { get; set; }
        public int Duration { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid UserId { get; set; }
    }
}
