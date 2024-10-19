using GymManagement_API.Data;
using GymManagement_API.Data.DTO;
using GymManagement_API.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacilitiesController : ControllerBase
    {
        private readonly DataContext _context;

        public FacilitiesController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Facilities>>> GetFacilites()
        {
            if(_context.Facilities == null)
            {
                return NotFound();
            }
            var facilities = await _context.Facilities.ToListAsync();
            return Ok(facilities);
        }
        [HttpPost()]
        public async Task<ActionResult<Facilities>> AddFacility(FacilitiesDTO facilityDTO)
        {
            var facility = new Facilities
            {
                Id = Guid.NewGuid(),
                Name = facilityDTO.Name,
                Description = facilityDTO.Description,
                Status = facilityDTO.Status,
                LastMaintenanceDate = facilityDTO.LastMaintenanceDate
            };

            _context.Facilities.Add(facility);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFacilites), new { id = facility.Id }, facility);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFacility(Guid id, FacilitiesDTO facilityDTO)
        {
            var facility = await _context.Facilities.FindAsync(id);
            if (facility == null)
            {
                return NotFound();
            }

            facility.Name = facilityDTO.Name;
            facility.Description = facilityDTO.Description;
            facility.Status = facilityDTO.Status;
            facility.LastMaintenanceDate = facilityDTO.LastMaintenanceDate;

            _context.Entry(facility).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();   
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFacility(Guid id)
        {
            var facility = await _context.Facilities.FindAsync(id);
            if (facility == null)
            {
                return NotFound();
            }

            _context.Facilities.Remove(facility);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
