using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;
using TurfSportManagementSystem.Service;

namespace TurfSportManagementSystem.Controllers
{
    [ApiController]
    [Route("/slots")]
    [Authorize]
    public class SlotsController : ControllerBase
    {
        private readonly ISlotsService _slotsService;

        public SlotsController(ISlotsService slotsService)
        {
            _slotsService = slotsService;
        }
        [HttpGet("booking_history")]
        public IActionResult get_booking()
        {
            var userid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            List<Models.Slot> s = _slotsService.get_booking(userid);

            // Return empty list if no bookings are found
            if (s == null || s.Count == 0)
                return Ok(new { bookings = new List<Models.Slot>() });  // Return an empty array for bookings

            return Ok(new { bookings = s });  // Return the list of bookings
        }


        //[Authorize (Policy ="Admin")]
        [HttpGet("booked_slots/{turfId}/{date}")]
        public IActionResult get_booked_slots([FromRoute] string turfId, [FromRoute] DateTime date)
        {
            List<Models.Slot> s = _slotsService.get_booked_slots(turfId, date);

            return Ok(s);
        }


        [HttpPost("book_slot/{role}")]
        public IActionResult book_slot([FromBody] GetSlot book_slot)
        {
            var userid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (_slotsService.recursive_booking(book_slot, userid))
                return Ok("Slots booked");
            else
                return BadRequest(new { message = "Slots not booked" });
        }


        [HttpDelete("cancelation/{slotid}")]
        public IActionResult cancelation([FromRoute] string slotid)  //correction
        {
            var userid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (_slotsService.cancelation(slotid, userid))
                return Ok("Slots canceled");
            else
                return BadRequest(new { message = "Slots not be canceled" });
        }

        [HttpPatch("reschedule")]
        public IActionResult reschedule([FromBody] Reschedule reschedule)
        {
            var userid = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (_slotsService.Reschedule(reschedule, userid))
                return Ok("Slots Rescheduled");

            return BadRequest(new { message = "Slots not Rescheduled" });
        }
    }
}