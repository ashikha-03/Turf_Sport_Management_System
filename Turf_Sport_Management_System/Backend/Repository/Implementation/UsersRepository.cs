using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Driver;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;
using TurfSportManagementSystem.NewFolder;

namespace TurfSportManagementSystem.Repository.Implementation
{
    public class UsersRepository : IUserRepository
    {
        IMongoDatabase _database;
        IMongoCollection<Users> usercoll;

        public UsersRepository()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            _database = client.GetDatabase("TurfManagementDb");
            usercoll = _database.GetCollection<Users>("manage_users");
        }

        // Register a new user
        public bool register(Register user)
        {
            try
            {
                // Insert new user into MongoDB
                usercoll.InsertOne(new Users
                (
                    user.userName,
                    user.password,
                    user.phone,
                    user.email,
                    Enum.Role.User
                ));
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during registration: {ex.Message}");
                return false;
            }
        }

        // Match a user by their username (email or phone can be added similarly)
        public Users MatchUserName(string username)
        {
            try
            {
                return usercoll.Find(usr => usr.userName == username).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error matching email or phone: {ex.Message}");
                return null;
            }
        }

        // Login function: validate user credentials
        public bool Login(Login loginDetails)
        {
            try
            {
                // Find the user with matching username and password
                Users u = usercoll.Find(u => u.userName == loginDetails.userName && u.password == loginDetails.password).FirstOrDefault();

                return u != null; // If user is found, return true, otherwise false
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during login: {ex.Message}");
                return false;
            }
        }

        // Get all user details
        public List<userDetails> userDetails()
        {
            try
            {
                List<userDetails> list = new List<userDetails>();

                // Fetch all users
                List<Users> users = usercoll.Find(t => true).ToList();

                // Convert users to userDetails
                foreach (Users u in users)
                {
                    list.Add(new userDetails
                    {
                        userName = u.userName,
                        email = u.email,
                        phone = u.phone,
                        Id = u.Id.ToString(),
                    });
                }

                return list;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching user details: {ex.Message}");
                return new List<userDetails>();
            }
        }

        // Delete user by ID
        public bool delete_user(string id)
        {
            try
            {
                var obj = Guid.Parse(id); // Parse the provided string ID to a Guid
                var res = usercoll.DeleteOne(u => u.Id == obj);

                return res.DeletedCount > 0; // If the deletion was successful, return true
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during user deletion: {ex.Message}");
                return false;
            }
        }
    }
}
