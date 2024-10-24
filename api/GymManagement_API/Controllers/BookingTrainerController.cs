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
    public class BookingTrainerController : ControllerBase
    {
        private readonly DataContext _context;

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
        public async Task<ActionResult<BookingTrainer>> BookTrainer([FromBody] BookingTrainerDTO bookingDTO, Guid trainerId, Guid userId)
        {
            var trainer = await _context.Trainers.FindAsync(trainerId);
            if (trainer == null)
            {
                return NotFound("Trainer not found.");
            }


            //var existingBooking = await _context.BookingTrainers
            //    .FirstOrDefaultAsync(b => b.TrainerId == trainer.Id &&
            //                              b.BookingDate == bookingDTO.BookingDate &&
            //                              ((b.StartTime < bookingDTO.EndTime && b.EndTime > bookingDTO.StartTime)));

            //if (existingBooking != null)
            //{
            //    return Conflict("Trainer is already booked for the requested time.");
            //}
            
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


            var existingBooking = await _context.BookingTrainers
                .FirstOrDefaultAsync(b => b.TrainerId == trainer.Id &&
                                          b.BookingDate == bookingDTO.BookingDate &&
                                          ((b.StartTime < bookingDTO.EndTime && b.EndTime > bookingDTO.StartTime)));


            if (existingBooking != null)
            {
                return Conflict("Room is already booked for the requested time.");
            }


            booking.StartTime = bookingDTO.StartTime;
            booking.EndTime = bookingDTO.EndTime;
            booking.IsConfirmed = bookingDTO.IsConfirmed;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
