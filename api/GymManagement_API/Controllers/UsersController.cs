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
    public class UsersController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly IDataService _dataService;
        public UsersController(DataContext dataContext, IDataService dataService)
        {
            _dataContext = dataContext;
            _dataService = dataService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Users>>> GetAllUser()
        {
            var users = await _dataContext.Users.FindAsync();
            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Users>>> GetUserById(Guid id)
        {
            var users = await _dataContext.Users.FindAsync(id);
            if(users == null)
            {
                return NotFound();
            }
            return Ok(users);
        }
        [HttpPost("addUser")]
        public async Task<ActionResult<List<Users>>> AddUser(Users users)
        {
            var newUsers = new Users
            {
                Id = users.Id,
                Username = users.Username,
                Email = users.Email,
                Firstname = users.Firstname,
                Lastname = users.Lastname,
                Avatar = users.Avatar,
                Phone = users.Phone,
                Password = users.Password,
                IsAdmin = false
            };
            _dataContext.Users.Add(newUsers);
            await _dataContext.SaveChangesAsync();
            return Ok(newUsers);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, UpdateUserDTO updateUserDTO)
        {
            var user = await _dataContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            user.Username = updateUserDTO.Username;
            user.Email = updateUserDTO.Email;
            user.Firstname = updateUserDTO.Firstname;
            user.Lastname = updateUserDTO.Lastname;
            user.Password = updateUserDTO.Password;
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Users.FindAsync(user.Id));
        }
        [HttpDelete("DeleteUser"), Authorize]
        public async Task<ActionResult<List<Users>>> RemoveUser(Guid id)
        {
            var user = await _dataContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _dataContext.Users.Remove(user);
            _dataContext.SaveChanges();
            return NoContent();
        }
    }
}
