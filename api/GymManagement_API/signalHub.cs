using GymManagement_API.Data.Models;
using IdentityServer4.Models;
using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace GymManagement_API
{
    public class signalHub : Hub
    {
        public async Task SendNotification(NotificationModel notification)
        {
            await Clients.All.SendAsync("ReceiveNotification", notification);
        }
    }
}
