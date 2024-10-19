using GymManagement_API.Data.Models;

namespace GymManagement_API.Service.Interface
{
    public interface IDataService
    {
        Token DeToken(string token);
        string GetUserId(string token);
        Token GetTokenData();
    }
}
