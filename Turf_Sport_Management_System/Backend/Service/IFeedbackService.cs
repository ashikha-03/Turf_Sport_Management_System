using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;

namespace TurfSportManagementSystem.Service
{
    public interface IFeedbackService
    {
        public Boolean create_feedback(DTOs.GetFeedback feedback, string userid);
        public Models.Rating get_feedback(string turfid);
    }
}
