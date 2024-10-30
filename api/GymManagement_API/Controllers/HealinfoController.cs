using GymManagement_API.Data;
using GymManagement_API.Data.DTO;
using GymManagement_API.Data.Models;
using GymManagement_API.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HealinfoController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataService _service;

        public HealinfoController(DataContext context, IDataService service)
        {
            _context = context;
            _service = service;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Healinfo>>> GetHealinfo()
        {
            var healinfos = await _context.HealInfos.ToListAsync();
            return Ok(healinfos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Healinfo>>> GetHealinfoById(Guid id)
        {
            var healinfo = await _context.HealInfos.FindAsync(id);
            if (healinfo == null)
            {
                return BadRequest();
            }
            return Ok(healinfo);
        }

        [HttpGet("suggest-food/{id}")]
        public async Task<ActionResult<string>> GetFoodSuggestion(Guid id)
        {
            var healinfo = await _context.HealInfos.FindAsync(id);
            if (healinfo == null)
            {
                return NotFound();
            }

            string suggestion = SuggestFood(healinfo.DailyCalories ?? 0);
            return Ok(suggestion);
        }

        [HttpPost]
        public async Task<ActionResult<HealinfoDTO>> PostHealinfo(HealinfoDTO healinfoDto)
        {
            var tokenData = _service.GetTokenData();
            if (tokenData == null)
            {
                return Unauthorized("User is not authenticated.");
            }
            var userId = tokenData.Id;

            // Calculate daily calories based on provided info
            var dailyCalories = CalculateDailyCalorieTarget(
                healinfoDto.Weight ?? 0,
                healinfoDto.Height ?? 0,
                healinfoDto.Age ?? 0,
                healinfoDto.Gender,
                healinfoDto.ActivityLevel
            );

            var healinfo = new Healinfo
            {
                Id = Guid.NewGuid(),
                Height = healinfoDto.Height,
                Weight = healinfoDto.Weight,
                BMI = healinfoDto.BMI,
                CaloriesAvg = healinfoDto.CaloriesAvg,
                DailyCalories = dailyCalories,
                LastHealthCheckDate = healinfoDto.LastHealthCheckDate,
                Notes = healinfoDto.Notes,
                UsersId = userId
            };

            _context.HealInfos.Add(healinfo);
            await _context.SaveChangesAsync();

            return Ok(healinfo);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutHealinfo(Guid id, HealinfoDTO healinfoDto)
        {
            var healinfo = await _context.HealInfos.FindAsync(id);
            if (healinfo == null)
            {
                return NotFound();
            }

            healinfo.Height = healinfoDto.Height;
            healinfo.Weight = healinfoDto.Weight;
            healinfo.Gender = healinfoDto.Gender;
            healinfo.BMI = healinfoDto.BMI;
            healinfo.CaloriesAvg = healinfoDto.CaloriesAvg;
            healinfo.DailyCalories = healinfoDto.DailyCalories;
            healinfo.LastHealthCheckDate = healinfoDto.LastHealthCheckDate;
            healinfo.Notes = healinfoDto.Notes;

            _context.Entry(healinfo).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHealinfo(Guid id)
        {

            var healinfos = await _context.HealInfos.FindAsync(id);

            _context.HealInfos.Remove(healinfos);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private int CalculateDailyCalorieTarget(decimal weight, decimal height, int age, string gender, string activityLevel)
        {
            decimal bmr = gender == "Male"
                ? (10 * weight) + (6.25m * height) - (5 * age) + 5
                : (10 * weight) + (6.25m * height) - (5 * age) - 161;

            decimal activityMultiplier = activityLevel switch
            {
                "Sedentary" => 1.2m,
                "Lightly Active" => 1.375m,
                "Moderately Active" => 1.55m,
                "Very Active" => 1.725m,
                "Super Active" => 1.9m,
                _ => 1.2m
            };

            return (int)(bmr * activityMultiplier * 0.8m); // Apply 20% calorie deficit
        }

        private string SuggestFood(int dailyCalories)
        {
            if (dailyCalories < 1500)
                return "Try a seafood salad with leafy greens, grilled chicken, or vegetable stir-fry.";
            if (dailyCalories >= 1500 && dailyCalories <= 2000)
                return "Include lean proteins, mixed vegetables, and whole grains like quinoa or brown rice.";
            return "Balanced meals with moderate carbs, lean proteins, and healthy fats to stay energized.";
        }
    }
}
