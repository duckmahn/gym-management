﻿using GymManagement_API.Data;
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
            if(_context.Rooms == null)
            {
                return NotFound();
            }
            var classes = await _context.Rooms.ToListAsync();
            return Ok(classes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Rooms>>> GetClassById(Guid id)
        {

            if (_context.Rooms == null)
            {
                return NotFound();
            }
            var rooms = await _context.Rooms.FirstOrDefaultAsync(r => r.Id == id);
            if(rooms == null)
            {
                return NotFound();
            }    
            return Ok(rooms);
        }

        [HttpPost()]
        public async Task<ActionResult<Rooms>> AddClass(RoomDTO roomDTO)
        {
            var rooms = new Rooms
            {
                Id = Guid.NewGuid(),
                Name = roomDTO.Name,
                Description = roomDTO.Description,
                MaxParticipants = roomDTO.MaxParticipants,
                RoomType = roomDTO.RoomType,
            };
            if(rooms.MaxParticipants < 1 ||  rooms.MaxParticipants > 50)
            {
                return BadRequest();
            }
            _context.Rooms.Add(rooms);
            await _context.SaveChangesAsync();
            return Ok(rooms);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateClass(Guid id, RoomDTO roomDTO)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return BadRequest();
            }


            room.Name = roomDTO.Name;
            room.Description = roomDTO.Description;
            room.MaxParticipants = roomDTO.MaxParticipants;
            room.RoomType = roomDTO.RoomType;
            if (room.MaxParticipants < 1 || room.MaxParticipants > 50)
            {
                return BadRequest();
            }
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
        public async Task<IActionResult> DeleteRoom(Guid id)
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
