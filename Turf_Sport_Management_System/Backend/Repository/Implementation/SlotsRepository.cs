using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;

namespace TurfSportManagementSystem.Repository.Implementation
{
    public class SlotsRepository : ISlotsRepository
    {
        IMongoDatabase _database;
        IMongoCollection<Slot> _slot;
        IMongoCollection<Turf> _collection;

        public SlotsRepository()
        {
            try
            {
                var client = new MongoClient("mongodb://localhost:27017");
                _database = client.GetDatabase("TurfManagementDb");
                _slot = _database.GetCollection<Slot>("Slot");
                _collection = _database.GetCollection<Turf>("Turf");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public List<Slot> get_booking(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                Console.WriteLine("Invalid ID provided.");
                return new List<Slot>(); // Return an empty list if ID is invalid
            }

            Guid obj;

            if (!Guid.TryParse(id, out obj))
            {
                Console.WriteLine("Invalid GUID format.");
                return new List<Slot>(); // Return an empty list if the ID is not a valid GUID
            }

            var filter = Builders<Slot>.Filter.And(
                         Builders<Slot>.Filter.Eq(t => t.userId, obj)
                         );

            return _slot.Find(filter).Sort(Builders<Slot>.Sort.Descending(s => s.date)).ToList();
        }

        public List<Slot> get_booked_slots(Guid id, DateTime date)
        {
            var filter = Builders<Slot>.Filter.And(
                Builders<Slot>.Filter.Eq(t => t.turfId, id),
                Builders<Slot>.Filter.Eq(t => t.date, date)
            );

            return _slot.Find(filter).ToList();
        }

        public bool get_slot(Slot slot)
        {
            if (slot == null)
            {
                Console.WriteLine("Slot is null.");
                return false;
            }

            try
            {
                _slot.InsertOne(slot);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error inserting slot: {ex.Message}");
                return false;
            }
        }

        public bool cancelation(Guid userid, Guid slotid)
        {
            try
            {
                var updateResult = _slot.UpdateOne(
                    Builders<Slot>.Filter.Eq(s => s.Id, slotid) & Builders<Slot>.Filter.Eq(s => s.userId, userid),
                    Builders<Slot>.Update.Set(s => s.status, Enum.SlotStatus.NotBooked)
                );

                return updateResult.ModifiedCount > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during cancellation: {ex.Message}");
                return false;
            }
        }

        public bool Reschedule(Reschedule getReshedule)
        {
            if (getReshedule == null || string.IsNullOrEmpty(getReshedule.slotid))
            {
                Console.WriteLine("Invalid Reschedule request.");
                return false; // Return false if getReshedule is invalid
            }

            if (!Guid.TryParse(getReshedule.slotid, out Guid obj))
            {
                Console.WriteLine("Invalid GUID format for slot ID.");
                return false; // Return false if the slot ID is not a valid GUID
            }

            try
            {
                var updateResult = _slot.UpdateOne(
                    Builders<Slot>.Filter.Eq(s => s.Id, obj),
                    Builders<Slot>.Update.Combine(
                        Builders<Slot>.Update.Set(s => s.slots, getReshedule.slots),
                        Builders<Slot>.Update.Set(s => s.date, getReshedule.date)
                    )
                );

                return updateResult.MatchedCount > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during reschedule: {ex.Message}");
                return false;
            }
        }

        public Slot get_slotBy_id(Guid id)
        {
            try
            {
                return _slot.Find(s => s.Id == id).FirstOrDefault(); // Use FirstOrDefault to avoid exceptions if no record is found
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving slot by ID: {ex.Message}");
                return null;
            }
        }

        public List<Slot> get_booking_timestamp(DateTime startdate, DateTime enddate)
        {
            var filter = Builders<Slot>.Filter.Gte(s => s.date, startdate) &
                         Builders<Slot>.Filter.Lte(s => s.date, enddate);

            return _slot.Find(filter).ToList();
        }
    }
}
