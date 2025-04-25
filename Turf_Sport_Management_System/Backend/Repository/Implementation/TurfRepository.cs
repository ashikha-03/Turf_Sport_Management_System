using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using TurfSportManagementSystem.Models;

namespace TurfSportManagementSystem.Repository.Implementation
{
    public class TurfRepository : ITurfRepository
    {
        IMongoDatabase _database;
        IMongoCollection<Turf> _collection;

        public TurfRepository()
        {

            var client = new MongoClient("mongodb://localhost:27017");
            _database = client.GetDatabase("TurfManagementDb");
            _collection = _database.GetCollection<Turf>("Turfs");

        }

        public bool create_turf(Turf t)
        {
            if (t == null)
            {
                Console.WriteLine("Cannot create turf. Turf object is null.");
                return false;
            }

            try
            {

                _collection.InsertOne(t);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating turf: {ex.Message}");
                return false;
            }
        }
        public List<Turf> get_all_turfs()
        {
            try
            {
                var turfs = _collection.Find(t => true).ToList(); // Finds all turfs
                return turfs; // Returns the list of all turfs
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving turfs: {ex.Message}");
                return new List<Turf>(); // Return an empty list if there's an error
            }
        }

        public Turf get_turf(Guid id)
        {
            if (id == Guid.Empty)
            {
                Console.WriteLine("Invalid turf ID provided.");
                return null;
            }

            try
            {
                var turf = _collection.Find(t => t.Id == id).FirstOrDefault(); // returns null if no turf found
                return turf;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving turf: {ex.Message}");
                return null;
            }
        }

        public bool delete_turf(Guid id)
        {
            if (id == Guid.Empty)
            {
                Console.WriteLine("Invalid turf ID provided.");
                return false;
            }

            try
            {
                var deleteResult = _collection.DeleteOne(u => u.Id == id);
                return deleteResult.DeletedCount > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting turf: {ex.Message}");
                return false;
            }
        }

        public bool update_turf(Guid id, UpdateDefinition<Turf> updateDefinitions)
        {
            if (id == Guid.Empty || updateDefinitions == null)
            {
                Console.WriteLine("Invalid input for updating turf.");
                return false;
            }

            try
            {
                FilterDefinition<Turf> filter = Builders<Turf>.Filter.Eq(t => t.Id, id);

                if (updateDefinitions == Builders<Turf>.Update.Combine())
                {
                    Console.WriteLine("No update definitions provided.");
                    return false;
                }

                var updateResult = _collection.UpdateOne(filter, updateDefinitions);
                return updateResult.MatchedCount > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating turf: {ex.Message}");
                return false;
            }
        }

        public List<Turf> get_by_userid(Guid id)
        {
            if (id == Guid.Empty)
            {
                Console.WriteLine("Invalid user ID provided.");
                return new List<Turf>(); // Return an empty list if the ID is invalid
            }

            try
            {
                var turfs = _collection.Find(t => t.userId == id).ToList();
                return turfs;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving turfs by user ID: {ex.Message}");
                return new List<Turf>(); // Return an empty list in case of error
            }
        }
    }
}
