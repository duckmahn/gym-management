using GymManagement_API.Data;
using GymManagement_API.Data.DTO;
using GymManagement_API.Data.Models;
using GymManagement_API.Service.Implement;
using GymManagement_API.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataService _service;

        public BookingController(DataContext context, IDataService dataService)
        {
            _context = context;
            _service = dataService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBookings()
        {
            var token = Request.Headers["Authorization"].ToString();
            var userId = _service.GetUserId(token);
            var bookings = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Room)
                .Include(b => b.Schedule)
                .Where(b => b.UserId == new Guid(userId)) // Get bookings for the current user
                .ToListAsync();
            return Ok(bookings);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(Guid id)
        {
            var token = Request.Headers["Authorization"].ToString();
            var userId = _service.GetUserId(token); // Get user ID from token
            var booking = await _context.Bookings
            .Include(b => b.User)
            .Include(b => b.Room)
            .Include(b => b.Schedule)
            .FirstOrDefaultAsync(b => b.Id == id && b.UserId == new Guid(userId)); // Only allow access to user's bookings
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }
        [HttpPost]
        public async Task<ActionResult<Booking>> CreateBooking(BookingDTO bookingDTO)
        {
            var token = Request.Headers["Authorization"].ToString();
            var userId = _service.GetUserId(token);
            var booking = new Booking
            {
                Id = Guid.NewGuid(),
                UserId = bookingDTO.UserId,
                RoomId = bookingDTO.RoomId,
                ScheduleId = bookingDTO.ScheduleId,
                BookingDate = bookingDTO.BookingDate,
                Status = bookingDTO.Status
            };
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, booking);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(Guid id, BookingDTO bookingDTO)
        {
     
            var token = Request.Headers["Authorization"].ToString();
            var userId = _service.GetUserId(token); // Get user ID from token

            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null || booking.UserId != new Guid(userId)) // Ensure the booking belongs to the current user
            {
                return NotFound();
            }

            // Update the booking entity with values from BookingDto
            booking.RoomId = bookingDTO.RoomId;
            booking.ScheduleId = bookingDTO.ScheduleId;
            booking.BookingDate = bookingDTO.BookingDate;
            booking.Status = bookingDTO.Status;

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
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
        public async Task<IActionResult> DeleteBooking(Guid id)
        {
            var token = Request.Headers["Authorization"].ToString();
            var userId = _service.GetUserId(token); // Get user ID from token

            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null || booking.UserId != new Guid(userId)) // Ensure the booking belongs to the current user
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool BookingExists(Guid id)
        {
            return _context.Bookings.Any(e => e.Id == id);
        }
    }
}
