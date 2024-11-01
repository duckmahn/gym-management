namespace GymManagement_API.Data.Models
{
    public class Courses
    {
        public Guid Id { get; set; }     
        public string? Name { get; set; }            
        public string? Description { get; set; }     
        public DateTime? StartDate { get; set; }      
        public DateTime? EndDate { get; set; }
        public decimal? Price { get; set; }
    }
}
