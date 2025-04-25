using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using TurfSportManagementSystem.Enum;

namespace TurfSportManagementSystem.Models
{
    public class Slot
   
        {
        [BsonId]
        [BsonGuidRepresentation(GuidRepresentation.CSharpLegacy)]
        public Guid Id { get; set; }


        [BsonGuidRepresentation(GuidRepresentation.CSharpLegacy)]
        public Guid turfId { get; set; }
            public DateTime date { get; set; }
            public SlotStatus status { get; set; }
            public List<string> slots { get; set; }


        [BsonGuidRepresentation(GuidRepresentation.CSharpLegacy)]
        public Guid userId { get; set; }
                
                public Slot(Guid turfId, DateTime date, SlotStatus status, List<string> slots, Guid userId)
            {
                this.turfId = turfId;
                this.date = date;
                this.status = status;
                this.slots = slots;
                this.userId = userId;
        }
    }
}
