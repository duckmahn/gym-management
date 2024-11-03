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
    public class FacilitiesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataService _service;
        public FacilitiesController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Facilities>>> GetAllFacilities()
        {

            var facilities = await _context.Facilities.ToListAsync();
            if (facilities == null)
            {
                return BadRequest();
            }
            return Ok(facilities);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Facilities>>> GetFacilitesById(Guid id)
        {

            var facilities = await _context.Facilities.FindAsync(id);
            if(facilities == null)
            {
                return BadRequest();
            }
            return Ok(facilities);
        }
        [HttpPost()]
        public async Task<ActionResult<List<Facilities>>> AddFacility(FacilitiesDTO facilityDTO)
        {
            var tokenData = _service.GetTokenData();
            if (tokenData == null)
            {
                return Unauthorized("User is not authenticated.");
            }
            var userId = tokenData.Id;
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

            return Ok(facility);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFacility(Guid id, FacilitiesDTO facilityDTO)
        {
            var facility = await _context.Facilities.FindAsync(id);
            if (facility == null)
            {
                return BadRequest();
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
                return BadRequest();
            }

            _context.Facilities.Remove(facility);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
