using GymManagement_API.Data;
using GymManagement_API.Data.DTO;
using GymManagement_API.Data.Models;
using GymManagement_API.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GymManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    
    public class CourseController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataService _service;

        public CourseController(DataContext context, IDataService service)
        {
            _context = context;
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Courses>>> GetCourse()
        {
            var courses = await _context.Courses.ToListAsync();
            if(courses == null)
            {
                return BadRequest();
            }
            return Ok(courses);
        }

        // GET api/<CourseController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Courses>>> GetCourseById(Guid id)
        {
            var courses = await _context.Courses.FindAsync(id);
            if (courses == null)
            {
                return BadRequest();
            }
            return Ok(courses);
        }

        // POST api/<CourseController>
        [HttpPost]
        public async Task<ActionResult<List<Courses>>> AddCourse(CoursesDTO coursesDTO)
        {
            var courses = new Courses
            {
                Id = Guid.NewGuid(),
                Name = coursesDTO.Name,
                Description = coursesDTO.Description,
                StartDate = coursesDTO.StartDate,
                EndDate = coursesDTO.EndDate,
                Price = coursesDTO.Price,
            };
            _context.Courses.Add(courses);
            await _context.SaveChangesAsync();
            return Ok(courses);
        }

        // PUT api/<CourseController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(Guid id, CoursesDTO coursesDTO)
        {
            var courses = await _context.Courses.FindAsync(id);
            if(courses == null)
            {
                return BadRequest();
            }
            courses.Name = coursesDTO.Name;
            courses.Description = coursesDTO.Description;
            courses.StartDate = coursesDTO.StartDate;
            courses.EndDate = coursesDTO.EndDate;
            courses.Price = coursesDTO.Price;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE api/<CourseController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(Guid id)
        {
            var courses = await _context.Courses.FindAsync(id);
            if(courses == null)
            {
                return BadRequest();
            }
            _context.Courses.Remove(courses);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
