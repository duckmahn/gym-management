using GymManagement_API.Data;
using GymManagement_API.Data.DTO;
using GymManagement_API.Data.Models;
using GymManagement_API.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace GymManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class HealinfoController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataService _service;

        public HealinfoController(DataContext context, IDataService service)
        {
            _context = context;
            _service = service;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Healinfo>>> GetHealinfo()
        {
            var healinfos = await _context.HealInfos.ToListAsync();
            return Ok(healinfos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Healinfo>>> GetHealinfoById(Guid id)
        {
            var healinfo = await _context.HealInfos.FindAsync(id);
            if(healinfo == null)
            {
                return BadRequest();
            }
            return Ok(healinfo);
        }

        [HttpPost]
        public async Task<ActionResult<HealinfoDTO>> PostHealinfo(HealinfoDTO healinfoDto)
        {
            var tokenData = _service.GetTokenData();
            if (tokenData == null)
            {
                return Unauthorized("User is not authenticated.");
            }
            var userId = tokenData.Id;
            var healinfo = new Healinfo
            {
                Id = Guid.NewGuid(),
                Height = healinfoDto.Height,
                Weight = healinfoDto.Weight,
                Age = healinfoDto.Age,
                BloodType = healinfoDto.BloodType,
                BodyFatPercentage = healinfoDto.BodyFatPercentage,
                BMI = healinfoDto.BMI,
                MedicalConditions = healinfoDto.MedicalConditions,
                Allergies = healinfoDto.Allergies,
                LastHealthCheckDate = healinfoDto.LastHealthCheckDate,
                Notes = healinfoDto.Notes,
                UsersId = userId
            };

            _context.HealInfos.Add(healinfo);
            await _context.SaveChangesAsync();

            return Ok(healinfo);
        }

    }
}
