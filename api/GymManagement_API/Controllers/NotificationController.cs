using GymManagement_API.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace GymManagement_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly IHubContext<signalHub> _hubContext;

        public NotificationController(IHubContext<signalHub> hubContext)
        {
            _hubContext = hubContext;
        }
        [HttpPost("notification")]
        public async Task<IActionResult> SendNotification(NotificationModel notification)
        {
            var noti = new NotificationModel
            {
                Title = notification.Title,
                Content = notification.Content,
            };
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", noti);
            return Ok(noti);
        }
    }
}
