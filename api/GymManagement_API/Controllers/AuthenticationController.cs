
using GymManagement_API.Data;
using GymManagement_API.Data.DTO;
using GymManagement_API.Data.Models;
using GymManagement_API.Service.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace GymManagement_API.Controllers
{
    public class AuthenticationController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly DataContext _dataContext;

        public AuthenticationController(DataContext dataContext, ITokenService tokenService)
        {
            _dataContext = dataContext;
            _tokenService = tokenService;
        }
        [HttpPost("Login")]
        public async Task<ActionResult<List<UserLogin>>> Login([FromBody] LoginDTO loginDTO)
        {
            if (!Regex.IsMatch(loginDTO.Email, @"^[^@\s]+@[^@\s]+\."))
            {
                return BadRequest("Invalid email format");
            }
            if (!Regex.IsMatch(loginDTO.Password, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$"))
            {
                return BadRequest("Password Incorrect");
            }
            var user = Authentication(loginDTO);
            if (user == null)
            {
                return NotFound();
            }
            var token = _tokenService.CreateToken(user);
            return Ok(token);
        }

        [HttpPost("Register")]
        public async Task<ActionResult<List<Users>>> Register([FromBody] UserDTO userDTO)
        {
            if(!Regex.IsMatch(userDTO.Email, @"^[^@\s]+@[^@\s]+\."))
            {
                return BadRequest("Invalid email format");
            }
            if(!Regex.IsMatch(userDTO.Password, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$"))
            {
                return BadRequest("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            }
            var existingUser = await _dataContext.UserLogins.SingleOrDefaultAsync(u => u.Email == userDTO.Email);
            
            if (existingUser != null)
            {
                return BadRequest("User with this email already exists");
            }
            var user = new Users
            {
                Id = Guid.NewGuid(),
                Username = userDTO.Username,
                Firstname = userDTO.Firstname,
                Lastname = userDTO.Lastname,
                Email = userDTO.Email,
                Password = userDTO.Password,
            };
            var userLogin = new UserLogin
            {
                Id = user.Id,
                Email = userDTO.Email,
                Password = userDTO.Password
            };
            _dataContext.UserLogins.Add(userLogin);
            var createToken = await _dataContext.UserLogins.FindAsync(userLogin.Id);
            _dataContext.Users.Add(user);
            await _dataContext.SaveChangesAsync();
            var token = _tokenService.CreateToken(createToken);
            return Ok(token);
        }
        private UserLogin Authentication(LoginDTO request)
        {
            {
                var user = _dataContext.UserLogins.SingleOrDefault(u => u.Email == request.Email && u.Password == request.Password);
                if (user == null)
                {
                    return null;
                }
                else
                {
                    return user;
                }
            }
        }
    }
}
