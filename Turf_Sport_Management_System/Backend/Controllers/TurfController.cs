using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;
using TurfSportManagementSystem.Service;

namespace TurfSportManagementSystem.Controllers
{
    [ApiController]
    [Route("/turf")]
    public class TurfController : ControllerBase
    {
        private readonly ITurfService turfService;

        public TurfController(ITurfService turfService)
        {
            this.turfService = turfService;
        }

        [HttpPost("create")]
        [Authorize] 
        public async Task<IActionResult> create_turf([FromForm] GetTurf turf)
        {
            if (turf == null)
            {
                return BadRequest("Invalid turf data.");
            }

            string user = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            if (await turfService.create_turf(turf, user))
              
                return Ok("Turf Created");

            return BadRequest(new { message = "Turf not created" });
        }

        [HttpGet("get_all_turfs")]
        public IActionResult get_all_turfs()
        {
            var turfs = turfService.get_all_turfs(); // Call the service to get all turfs
            if (turfs != null && turfs.Any())
                return Ok(turfs); // Return all turfs if found
            return BadRequest(new { message = "No turfs available" }); // Return error if no turfs are found
        }


        [HttpGet("get_turf/{id}")]
        public IActionResult get_turf([FromRoute] string id)
        {
            if (!Guid.TryParse(id, out Guid turfId))
            {
                return BadRequest("Invalid Turf ID format.");
            }

            Turf t = turfService.get_turf(turfId.ToString());

            if (t != null)
                return Ok(t);

            return BadRequest(new { message = "The requested turf is not present" });
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public IActionResult delete_turf([FromRoute] string id)
        {
            if (!Guid.TryParse(id, out Guid turfId))
            {
                return BadRequest(new { message = "Invalid Turf ID format." });
            }

            string userid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (turfService.delete_turf(turfId.ToString(), userid))
                return Ok("Turf deleted");

            return BadRequest(new { message = "Turf not deleted" });
        }

        [HttpPut("update/{id}")]
        [Authorize]
        public IActionResult update_turf([FromBody] UpdateTurf turf, [FromRoute] string id)
        {
            if (!Guid.TryParse(id, out Guid turfId))
            {
                return BadRequest("Invalid Turf ID format.");
            }

            string userid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (turfService.update_turf(turf, id, userid))
                return Ok("Turf updated");

            return BadRequest(new { message = "Turf not updated" });
        }

        [HttpGet("get_userturf")]
        public IActionResult get_by_userid()
        {
            string id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            List<Turf> t = turfService.get_by_userid(id);
            return Ok(t);
        }
    }
}
