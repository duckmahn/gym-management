namespace GymManagement_API.Data.Models
{
    public class Healinfo
    {
        public Guid Id { get; set; }
        public decimal Height { get; set; } 

        public decimal Weight { get; set; } 

        public int Age { get; set; } 

        public string BloodType { get; set; }

        public decimal BodyFatPercentage { get; set; }

        public decimal BMI { get; set; } 

        public string MedicalConditions { get; set; } 

        public string Allergies { get; set; } 

        public DateTime LastHealthCheckDate { get; set; }

        public string Notes { get; set; }

        public Guid UsersId { get; set; }
    }
}
