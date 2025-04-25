using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Service;
using TurfSportManagementSystem.NewFolder;
using TurfSportManagementSystem;
using Microsoft.AspNetCore.Authorization;

namespace TurfSportManagementSystem.Controllers
{

    [ApiController]
    [Route("/feedback")]
    [Authorize]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService feedbackService;
        public FeedbackController(IFeedbackService feedbackService)
        {
            this.feedbackService = feedbackService;
        }
        [HttpPost("create")]
        public IActionResult feedback_turf([FromBody] GetFeedback feedback)
        {
            var userid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (feedbackService.create_feedback(feedback, userid))
                return Ok(new { message = "Feedback uploaded" });


            return BadRequest(new { message = "Feedback not uploaded" });
        }

        [HttpGet("{turfid}")]
        public IActionResult get_feedback_By_turfid([FromRoute] string turfid)
        {
            return Ok(new { message = feedbackService.get_feedback(turfid) });
        }

    }
}
