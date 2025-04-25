using MongoDB.Bson;
using System;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;
using TurfSportManagementSystem.Repository;

namespace TurfSportManagementSystem.Service
{
    public class FeedbackService : IFeedbackService
    {

        private IFeedbackRepository _feedbackRepository;
        public FeedbackService(IFeedbackRepository feedbackRepo)
        {
            _feedbackRepository = feedbackRepo;
        }

        public Boolean create_feedback(DTOs.GetFeedback feedback, string userId)
        {
            try
            {

                Guid.Parse(feedback.turfId);
            }
            catch {
                //Console.WriteLine("id");
                return false; }
            return _feedbackRepository.create_feedback(feedback, userId);
        }

        public Models.Rating get_feedback(string turfid)
        {
            try
            {
                Guid.Parse(turfid);
            }
            catch { return null; }
            return _feedbackRepository.get_feedback(Guid.Parse(turfid));
        }

    }
}
