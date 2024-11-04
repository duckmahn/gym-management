using GymManagement_API.Data;
using GymManagement_API.Data.DTO;
using GymManagement_API.Data.Models;
using GymManagement_API.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ScheduleController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataService _service;

        public ScheduleController(DataContext context, IDataService service)
        {
            _context = context;
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Schedule>>> GetSchedules()
        {
            var schedules = await _context.Schedules.ToListAsync();
            if (schedules == null)
            {
                return BadRequest();
            }
            return Ok(schedules);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Schedule>>> GetScheduleById(Guid id)
        {
            var schedule = await _context.Schedules.FindAsync(id);
            if (schedule == null)
            {
                return BadRequest();
            }
            return Ok(schedule);
        }

        [HttpPost()]
        public async Task<ActionResult<List<Schedule>>> AddSchedule(ScheduleDTO scheduleDTO, Guid roomId, Guid trainerId)
        {
            var trainer = await _context.Trainers.FindAsync(trainerId);
            if (trainer == null)
            {
                return NotFound("Trainer not found.");
            }
            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null)
            {
                return NotFound("Room not found.");
            }
            var schedule = new Schedule
            {
                Id = Guid.NewGuid(),
                RoomId = room.Id,
                TrainerId = trainer.Id,
                StartTime = scheduleDTO.StartTime,
                EndTime = scheduleDTO.EndTime,
                Date = scheduleDTO.Date,
            };
            _context.Schedules.Add(schedule);
            await _context.SaveChangesAsync();
            return Ok(schedule);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSchedule(Guid id, ScheduleDTO scheduleDTO, Guid roomId, Guid trainerId)
        {
            var schedule = await _context.Schedules.FindAsync(id);
            if (schedule == null)
            {
                return NotFound("Schedule not found.");
            }
            var trainer = await _context.Trainers.FindAsync(trainerId);
            if (trainer == null)
            {
                return NotFound("Trainer not found.");
            }
            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null)
            {
                return NotFound("Room not found.");
            }
            schedule.RoomId = room.Id;
            schedule.TrainerId = trainer.Id;
            schedule.StartTime = scheduleDTO.StartTime;
            schedule.EndTime = scheduleDTO.EndTime;
            schedule.Date = scheduleDTO.Date;
            await _context.SaveChangesAsync();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleExists(id))
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
        public async Task<IActionResult> DeleteSchedule(Guid id)
        {
            var schedule = await _context.Schedules.FindAsync(id);
            if (schedule == null)
            {
                return NotFound("Schedule not found.");
            }
            _context.Schedules.Remove(schedule);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private bool ScheduleExists(Guid id)
        {
            return _context.Schedules.Any(e => e.Id == id);
        }
    }
}
