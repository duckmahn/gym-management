using GymManagement_API.Data;
using GymManagement_API.Data.DTO;
using GymManagement_API.Data.Models;
using GymManagement_API.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataService _dataService;

        public RoomsController(DataContext context, IDataService dataService)
        {
            _context = context;
            _dataService = dataService;
        }
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Rooms>>> GetAllClasses()
        {
            //var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            //var currentUserId = _dataService.GetUserId(token);
            var classes = await _context.Rooms
                .Include(r => r.Trainer)
                .Include(r => r.Schedules)
                .ToListAsync();
            return Ok(classes);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Rooms>>> GetClassById(Guid id)
        {
            //var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            //var currentUserId = _dataService.GetUserId(token);
            var rooms = await _context.Rooms
                .Include(r => r.Trainer)
                .Include(r => r.Schedules)
                .FirstOrDefaultAsync(r => r.Id == id);
            if(rooms == null)
            {
                return NotFound();
            }    
            return Ok(rooms);
        }
        [HttpPost()]
        public async Task<ActionResult<Rooms>> CreateClass(RoomDTO roomDTO)
        {
            //var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            //var currentUserId = _dataService.GetUserId(token);
            var trainer = await _context.Trainers.FindAsync(roomDTO.TrainerId);
            var schedule = await _context.Schedules.FindAsync(roomDTO.ScheduleId);
            if (trainer == null || schedule == null)
            {
                return BadRequest("Invalid TrainerId or ScheduleId.");
            }
            var rooms = new Rooms
            {
                Id = Guid.NewGuid(),
                Name = roomDTO.Name,
                Description = roomDTO.Description,
                TrainerId = roomDTO.TrainerId,
                Trainer = trainer,
                ScheduleId = roomDTO.ScheduleId,
                Schedules = schedule,
                MaxParticipants = roomDTO.MaxParticipants,
            };
            _context.Rooms.Add(rooms);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetClassById), new { id = rooms.Id }, rooms);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateClass(Guid id, RoomDTO roomDTO)
        {
            //var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            //var currentUserId = _dataService.GetUserId(token);
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound();
            }
            var trainer = await _context.Trainers.FindAsync(roomDTO.TrainerId);
            var schedule = await _context.Schedules.FindAsync(roomDTO.ScheduleId);

            if (trainer == null || schedule == null)
            {
                return BadRequest("Invalid TrainerId or ScheduleId.");
            }
            room.Name = roomDTO.Name;
            room.Description = roomDTO.Description;
            room.TrainerId = roomDTO.TrainerId;
            room.Trainer = trainer;
            room.Schedules = schedule;
            room.ScheduleId = roomDTO.ScheduleId;
            room.MaxParticipants = roomDTO.MaxParticipants;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!ClassExists(id))
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
        private bool ClassExists(Guid id)
        {
            return _context.Rooms.Any(e => e.Id == id);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(Guid id, RoomDTO roomDTO)
        {
            var room = await _context.Rooms.FindAsync(id);
            if(room == null)
            {
                return NotFound();
            }
            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
