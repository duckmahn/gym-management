using GymManagement_API.Data;
using GymManagement_API.Data.DTO;
using GymManagement_API.Data.Models;
using GymManagement_API.Service.Implement;
using GymManagement_API.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.DependencyResolver;

namespace GymManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookingTrainerController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataService _service;

        public BookingTrainerController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingTrainer>>> GetBookingTrainer()
        {
            // Lấy danh sách tất cả các bookings
            var bookings = await _context.BookingTrainers.ToListAsync();

            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<BookingTrainer>>> GetBookingTrainerById(Guid id)
        {
            var booking = await _context.BookingRooms.FirstOrDefaultAsync(b => b.Id == id); // Only allow access to user's bookings
            if (booking == null)
            {
                return NotFound();
            }
            return Ok(booking);
        }

        [HttpPost]
        public async Task<ActionResult<BookingTrainer>> BookTrainer([FromBody] BookingTrainerDTO bookingDTO, Guid trainerId)
        {
            var trainer = await _context.Trainers.FindAsync(trainerId);
            if (trainer == null)
            {
                return NotFound("Trainer not found.");
            }
            var tokenData = _service.GetTokenData();
            if (tokenData == null)
            {
                return Unauthorized("User is not authenticated.");
            }
            var userId = tokenData.Id;
            var booking = new BookingTrainer
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                TrainerId = trainerId,
                BookingDate = bookingDTO.BookingDate,
                StartTime = bookingDTO.StartTime,
                EndTime = bookingDTO.EndTime,
                IsConfirmed = bookingDTO.IsConfirmed
            };

            _context.BookingTrainers.Add(booking);
            await _context.SaveChangesAsync();

            return Ok(booking);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(Guid id, BookingTrainerDTO bookingDTO, Guid trainerId)
        {
            var booking = await _context.BookingTrainers.FindAsync(id);
            if (booking == null)
            {
                return NotFound("Booking not found.");
            }

            var trainer = await _context.Trainers.FindAsync(trainerId);
            if (trainer == null)
            {
                return NotFound("Trainer not found.");
            }

            booking.StartTime = bookingDTO.StartTime;
            booking.EndTime = bookingDTO.EndTime;
            booking.IsConfirmed = bookingDTO.IsConfirmed;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(Guid id)
        {

            var booking = await _context.BookingTrainers.FindAsync(id);

            _context.BookingTrainers.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
