using GymManagement_API.Data;
using GymManagement_API.Data.Models;
using GymManagement_API.Service.Interface;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace GymManagement_API.Service.Implement
{
    public class TokenService : ITokenService
    {
        private readonly DataContext _dataContext;
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration, DataContext dataContext)
        {
            _dataContext = dataContext;
            _configuration = configuration;
        }

        public string CreateToken(UserLogin user)
        {
            var users = _dataContext.Users.SingleOrDefault(u => u.Email == user.Email);
            List<Claim> claims = new List<Claim>
            {
                new Claim("Id", user.Id.ToString()),
                new Claim("Email", user.Email.ToString()),
                new Claim("Username",users.Firstname + " "+users.Lastname),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddYears(10),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
