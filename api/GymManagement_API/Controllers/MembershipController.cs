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
    public class MembershipController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataService _service;
        public MembershipController(DataContext context)
        {
            _context = context;
        }

        [HttpGet()]
        public async Task<ActionResult<string>> GetMembership()
        {
            var membership = await _context.Memberships.FindAsync();
            if (membership == null)
            {
                return NotFound("Membership not found.");
            }

            if (membership.EndDate < DateTime.Now)
            {
                return Ok("Membership has expired.");
            }

            return Ok(membership);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<string>> GetMembershipById(Guid id)
        {
            var membership = await _context.Memberships.FindAsync(id);
            if (membership == null)
            {
                return NotFound("Membership not found.");
            }

            if (membership.EndDate < DateTime.Now)
            {
                return Ok("Membership has expired.");
            }

            return Ok(membership);
        }
        [HttpPost]
        public async Task<ActionResult<Membership>> CreateMembership(MembershipDTO membershipDTO)
        { 
            if (membershipDTO == null)
            {
                return BadRequest("Membership data cannot be null.");
            }

            var tokenData = _service.GetTokenData();
            if (tokenData == null)
            {
                return Unauthorized("User is not authenticated.");
            }
            var userId = tokenData.Id;

            var membership = new Membership
            {
                Id = Guid.NewGuid(),
                Type = membershipDTO.Type,
                Price = membershipDTO.Price,
                Description = membershipDTO.Description,
                StartDate = membershipDTO.StartDate,
                EndDate = membershipDTO.EndDate,
                IsActive = membershipDTO.IsActive,
                UserId = userId
            };

            _context.Memberships.Add(membership);
            await _context.SaveChangesAsync();

            return Ok(membership);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMembership(Guid id, [FromBody] MembershipDTO membershipDTO)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            var membership = await _context.Memberships.FindAsync(id);
            if (membership == null)
            {
                return BadRequest();
            }

            // Update membership details
            membership.Type = membershipDTO.Type;
            membership.Price = membershipDTO.Price;
            membership.Description = membershipDTO.Description;
            membership.StartDate = membershipDTO.StartDate;
            membership.EndDate = membershipDTO.EndDate;
            membership.IsActive = membershipDTO.IsActive;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MembershipExists(id))
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
        public async Task<IActionResult> DeleteMembership(Guid id)
        {

            var membership = await _context.Memberships.FindAsync(id);

            if (membership == null)
            {
                return BadRequest();
            }

            _context.Memberships.Remove(membership);

            await _context.SaveChangesAsync();
            return NoContent();
        }
        private bool MembershipExists(Guid id)
        {
            return _context.Memberships.Any(e => e.Id == id);
        }
    }
}
