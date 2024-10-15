namespace GymManagement_API.Data.Models
{
    public class Payment
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }  
        public Users User { get; set; }
        public int MembershipId { get; set; }
        public Membership Membership { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime PaymentDate { get; set; }
        public string Status { get; set; }
    }
}
