using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace TurfSportManagementSystem.Models
{
    public class Rating
    {
        [BsonGuidRepresentation(GuidRepresentation.CSharpLegacy)]
        public Guid Id { get; set; }

        [BsonId]

        [BsonGuidRepresentation(GuidRepresentation.CSharpLegacy)]
        public Guid UserId { get; set; }

        public double RatingValue { get; set; }
        public string Feedbacks { get; set; }


        [BsonGuidRepresentation(GuidRepresentation.CSharpLegacy)]
        public Guid TurfId { get; set; }

        public Rating(Guid userId, double ratingValue, string feedback, Guid turfId)
        {
            this.UserId = userId;
            this.RatingValue = ratingValue;
            this.TurfId = turfId;
            this.Feedbacks = feedback;
        }
    }
}
