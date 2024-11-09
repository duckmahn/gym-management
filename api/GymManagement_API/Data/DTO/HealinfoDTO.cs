namespace GymManagement_API.Data.DTO
{
    public class HealinfoDTO
    {
        public Guid Id { get; set; }
        public decimal? Height { get; set; }
        public decimal? Weight { get; set; }
        public int? Age { get; set; }
        public decimal? BMI { get; set; }
        public int? CaloriesAvg { get; set; }
        public int? DailyCalories { get; set; }
        public DateTime? LastHealthCheckDate { get; set; }
        public string? Notes { get; set; }
        public Guid UsersId { get; set; }
        public string? Gender { get; set; }
        public string? ActivityLevel { get; set; }
    }
}
