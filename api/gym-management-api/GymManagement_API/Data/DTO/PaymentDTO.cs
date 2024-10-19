using GymManagement_API.Data.Models;

namespace GymManagement_API.Data.DTO
{
    public class PaymentDTO
    {
        public Guid UserId { get; set; }
        public Guid MembershipId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public DateTime PaymentDate { get; set; }
        public string Status { get; set; }
    }
}
