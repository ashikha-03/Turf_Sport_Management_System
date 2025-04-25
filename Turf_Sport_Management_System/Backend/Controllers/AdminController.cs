using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TurfSportManagementSystem.Service;

namespace TurfSportManagementSystem.Controllers
{
    [ApiController]
    [Route("api/admin")]
    [Authorize]
    public class AdminController : ControllerBase
    {

        private readonly IUserService userService;

        public AdminController(IUserService usersRepo)
        {
            this.userService = usersRepo;
        }

        [HttpGet("get_users")]
        public IActionResult userDetails()
        {
            return Ok(new { message = userService.userDetails() });
        }

        [HttpDelete("delete_user/{id}")]
        public IActionResult delete_user([FromRoute] string id)
        {
            if (userService.delete_user(id))
                return Ok("User Deleted");

            return BadRequest(new{message="user not found" });
        }
    }
}
