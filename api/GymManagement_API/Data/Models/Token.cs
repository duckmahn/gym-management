﻿namespace GymManagement_API.Data.Models
{
    public class Token
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public Boolean IsAdmin { get; set; }
    }
}
