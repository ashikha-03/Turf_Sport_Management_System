using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace TurfSportManagementSystem.Models
{
    public class Turf
    {
        [BsonGuidRepresentation(GuidRepresentation.CSharpLegacy)]
        public Guid userId { get; set; }

        [BsonId]
        [BsonGuidRepresentation(GuidRepresentation.CSharpLegacy)]
        public Guid Id { get; set; }
        public string location { get; set; }
        public List<string> sports { get; set; }
        public int maxMembers { get; set; }
        public string turfName { get; set; }
        public string contactNo { get; set; }
        public double rating { get; set; }
        public List<string> slots { get; set; }
        public int price { get; set; }

        public string image { get; set; }   
        public Turf() { }


        public Turf(Guid userId, string location, List<string> sports, int maxMembers,
                     string turfName, string contactNo, double rating,
                     List<string> slots, int price, string image)
        {
            this.userId = userId;
            this.location = location;
            this.sports = sports;
            this.maxMembers = maxMembers;
            this.turfName = turfName;
            this.contactNo = contactNo;
            this.rating = rating;
            this.price = price;
            this.slots = slots;
            this.image = image;
        }
    }
}
