using GymManagement_API.Data.Models;
using GymManagement_API.Service.Interface;
using System.IdentityModel.Tokens.Jwt;

namespace GymManagement_API.Service.Implement
{
    public class DataService : IDataService
    {
        private readonly IHttpContextAccessor _contextAccessor;
        public DataService(IHttpContextAccessor httpContextAccessor)
        {
            _contextAccessor = httpContextAccessor;
        }
        public Token DeToken(string token)
        {

            token = token.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);

            var tokenData = new Token
            {
                Id = Guid.Parse(jwtSecurityToken.Claims.FirstOrDefault(claim => claim.Type == "Id")?.Value),
                Email = jwtSecurityToken.Claims.FirstOrDefault(claim => claim.Type == "Email")?.Value,
                Username = jwtSecurityToken.Claims.FirstOrDefault(claim => claim.Type == "Username")?.Value,
            };
            TokenSingletonService.Instance.TokenData = tokenData;
            return tokenData;
        }

        public Token GetTokenData()
        {
            var token = _contextAccessor.HttpContext?.Request.Headers["Authorization"].ToString();
            token = token.Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);

            var tokenData = new Token
            {
                Id = Guid.Parse(jwtSecurityToken.Claims.FirstOrDefault(claim => claim.Type == "Id")?.Value),
                Email = jwtSecurityToken.Claims.FirstOrDefault(claim => claim.Type == "Email")?.Value,
                Username = jwtSecurityToken.Claims.FirstOrDefault(claim => claim.Type == "Username")?.Value,
            };
            TokenSingletonService.Instance.TokenData = tokenData;
            return tokenData;
        }

        public string GetUserId(string token)
        {
            throw new NotImplementedException();
        }
    }
}
