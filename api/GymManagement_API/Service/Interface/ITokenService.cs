using GymManagement_API.Data.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace GymManagement_API.Service.Interface
{
    public interface ITokenService
    {
            String CreateToken(UserLogin user);
    }
}
