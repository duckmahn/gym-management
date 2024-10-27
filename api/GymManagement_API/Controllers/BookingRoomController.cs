using GymManagement_API.Data;
using GymManagement_API.Data.DTO;
using GymManagement_API.Data.Models;
using GymManagement_API.Service.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingRoomController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataService _service;

        public BookingRoomController(DataContext context, IDataService dataService)
        {
            _context = context;
            _service = dataService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingRoom>>> GetBookingRooms()
        {
            // Lấy danh sách tất cả các bookings
            var bookings =await _context.BookingRooms.ToListAsync();

            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<BookingRoom>>> GetBooking(Guid id)
        {
            var booking = await _context.BookingRooms.FirstOrDefaultAsync(b => b.Id == id); // Only allow access to user's bookings
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

        [HttpPost()]
        public async Task<ActionResult<BookingRoom>> BookRoom(Guid roomId, [FromBody] BookingRoomDTO bookingDTO, Guid userId)
        {

            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null)
            {
                return NotFound("Room not found.");
            }

            //var existingBooking = await _context.BookingRooms
            //    .FirstOrDefaultAsync(b => b.RoomId == room.Id &&
            //                               (b.StartTime < bookingDTO.EndTime && b.EndTime > bookingDTO.StartTime));

            //if (existingBooking != null)
            //{
            //    return Conflict("Room is already booked for the requested time.");
            //}

            if (bookingDTO.NumberOfParticipants > room.MaxParticipants)
            {
                return BadRequest("Number of participants exceeds room capacity.");
            }

            var booking = new BookingRoom
            {
                Id = Guid.NewGuid(),
                RoomId = roomId, 
                UserId = userId,
                StartTime = bookingDTO.StartTime,
                EndTime = bookingDTO.EndTime,
                NumberOfParticipants = bookingDTO.NumberOfParticipants,
                IsConfirmed = true
            };

            _context.BookingRooms.Add(booking);
            await _context.SaveChangesAsync();

            return Ok(booking);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(Guid id, BookingRoomDTO bookingDTO, Guid roomId)
        {
            var booking = await _context.BookingRooms.FindAsync(id);
            if (booking == null)
            {
                return NotFound("Booking not found.");
            }

            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null)
            {
                return NotFound("Room not found.");
            }

            var conflictingBooking = await _context.BookingRooms
                .Where(b => b.RoomId == room.Id && b.Id != id)
                .FirstOrDefaultAsync(b => b.StartTime < bookingDTO.EndTime && b.EndTime > bookingDTO.StartTime);

            if (conflictingBooking != null)
            {
                return Conflict("Room is already booked for the requested time.");
            }


            if (bookingDTO.NumberOfParticipants > room.MaxParticipants)
            {
                return BadRequest("Number of participants exceeds room capacity.");
            }

            booking.StartTime = bookingDTO.StartTime;
            booking.EndTime = bookingDTO.EndTime;
            booking.NumberOfParticipants = bookingDTO.NumberOfParticipants;
            booking.IsConfirmed = bookingDTO.IsConfirmed;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(Guid id)
        {

            var booking = await _context.BookingRooms.FindAsync(id);

            _context.BookingRooms.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
