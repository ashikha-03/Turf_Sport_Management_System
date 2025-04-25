using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;

namespace TurfSportManagementSystem.Repository.Implementation
{
    public class FeedbackRepository : IFeedbackRepository
    {

        IMongoDatabase _database;
        IMongoCollection<Rating> _feedback;
        public FeedbackRepository()
        {
            try
            {
                var client = new MongoClient("mongodb://localhost:27017");
                _database = client.GetDatabase("TurfManagementDb");
                _feedback = _database.GetCollection<Rating>("Rating");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        public bool create_feedback(GetFeedback feedback, string userid)
        {
            _feedback.InsertOne(new Rating
            (
                Guid.Parse(userid),
                feedback.ratingValue,
                feedback.feedback,
                Guid.Parse(feedback.turfId)
            ));

            return true;
        }

        public Rating get_feedback(Guid turfid)
        {
            try
            {
                return _feedback.Find(f => f.TurfId == turfid).FirstOrDefault();
            }
            catch
            {
                return null;
            }
        }
    }
}

