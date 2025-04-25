using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Service;

namespace TurfSportManagementSystem.Controllers
{
    [ApiController]
    [Route("/api/")]
    public class userController : ControllerBase
    {

        private readonly ILogger<userController> _logger;

        private readonly IUserService userService;

        public userController(ILogger<userController> logger, IUserService usersRepo)
        {
            _logger = logger;
            this.userService = usersRepo;
        }

        [HttpPost("/login")]
        public IActionResult Login([FromBody] Login login)
        {
            string token = userService.Login(login);
            if (!token.Equals("Invalid credentials") && !token.Equals("User not found"))
                return Ok(new { token });

            return BadRequest(new {message =  "Invalid Request" });
        }

        [HttpPost("/register")]
        public IActionResult Register([FromBody] Register user)
        {
            if (userService.register(user))
                return Ok(new { message = "User Registered" });

            return BadRequest(new { message = "user not registered" });
        }
    }
}
