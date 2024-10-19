using GymManagement_API.Data;
using GymManagement_API.Data.DTO;
using GymManagement_API.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.DependencyResolver;

namespace GymManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainersController : ControllerBase
    {
        private readonly DataContext _context;

        public TrainersController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Trainers>>> GetAllTrainer()
        {
            if (_context.Trainers == null)
            {
                return NotFound();
            }
            var trainer = await _context.Trainers.ToListAsync();
            return Ok(trainer);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Trainers>>> GetTrainerById(Guid id)
        {
            if (_context.Trainers == null)
            {
                return NotFound();
            }
            var trainer = await _context.Trainers.FirstOrDefaultAsync(t => t.Id == id);
            if (trainer == null)
            {
                return NotFound();
            }
            return Ok(trainer);
        }

        [HttpPost]
        public async Task<ActionResult<Trainers>> AddTrainer(TrainerDTO trainerDTO)
        {
            var trainers = new Trainers
            {
                Id = Guid.NewGuid(),
                Name = trainerDTO.Name,
                Email = trainerDTO.Email,
                Phone = trainerDTO.Phone,
                Specialty = trainerDTO.Specialty,
                Experience = trainerDTO.Experience,
            };

            _context.Trainers.Add(trainers);
            await _context.SaveChangesAsync();
            return Ok(trainers);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTrainer(Guid id, TrainerDTO trainerDTO)
        {
            var trainer = await _context.Trainers.FindAsync(id);
            if (trainer == null)
            {
                return NotFound();
            }
            trainer.Name = trainerDTO.Name;
            trainer.Email = trainerDTO.Email;
            trainer.Phone = trainerDTO.Phone;
            trainer.Specialty = trainerDTO.Specialty;
            trainer.Experience = trainerDTO.Experience;
            _context.Entry(trainer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TrainerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTrainer(Guid id)
        {

            var trainer = await _context.Trainers.FindAsync(id);
            if (trainer == null)
            {
                return NotFound();
            }

            _context.Trainers.Remove(trainer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool TrainerExists(Guid id)
        {
            return _context.Trainers.Any(e => e.Id == id);
        }
    }
}
