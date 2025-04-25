using MongoDB.Bson;
using System.Threading.Tasks;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;

namespace TurfSportManagementSystem.Repository
{
    public interface IFeedbackRepository
    {
        public Boolean create_feedback(DTOs.GetFeedback feedback, string userid);
        public Models.Rating get_feedback(Guid turfid);
    }
}
