using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using TurfSportManagementSystem.Enum;

namespace TurfSportManagementSystem.Models
{
    public class Users
    {

        [BsonId]

        [BsonGuidRepresentation(GuidRepresentation.CSharpLegacy)]

        public Guid Id { get; set; }

        public string userName { get; set; }
        public string password { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public Role role;
        public Users(string userName, string password, string phone, string email, Role role)
        {
            this.userName = userName;
            this.password = password;
            this.phone = phone;
            this.email = email;
            this.role = role;
        }
    }
}
