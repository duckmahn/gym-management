using GymManagement_API.Data.Models;

namespace GymManagement_API.Service.Implement
{
    public class TokenSingletonService
    {
        private Token _token;
        
        public Token TokenData
        {
            get => _token;
            set => _token = value;
        }
        private static TokenSingletonService _instance;
        public static TokenSingletonService Instance => _instance ?? (_instance = new TokenSingletonService());

        private TokenSingletonService() { } 
    }
}
