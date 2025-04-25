using MongoDB.Bson;
using MongoDB.Driver;
using System;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;
using TurfSportManagementSystem.Repository;
using TurfSportManagementSystem.NewFolder;


namespace TurfSportManagementSystem.Service
{
    public class TurfService : ITurfService
    {
        private ITurfRepository turfRepo;
        private IImageService imageService;
        public TurfService(ITurfRepository turfRepo,IImageService imageService)
        {
            this.turfRepo = turfRepo;
            this.imageService = imageService;   
        }
        public async Task<bool> create_turf(GetTurf t, string userid)
        {
            Guid userId;

            // Try to parse the userid string to a Guid
            if (!Guid.TryParse(userid, out userId))
            {
                // Log or handle the error if parsing fails
                Console.WriteLine($"Invalid Guid format: {userid}");
                return false;  // Return false if the Guid is invalid
            }

            Console.WriteLine(userId);

            // Proceed with your logic if the Guid is valid
            string base64Image = await imageService.SaveImageAsync(t.ImageFile);

            // Pass the valid userId to the turfRepo
            return turfRepo.create_turf(new Models.Turf(userId, t.location, t.sports, t.maxMembers, t.turfName, t.contactNo, t.rating, t.slots, t.price, base64Image));
        }


        //public async Task<bool> create_turf(GetTurf t, string userid)
        //{
        //    Guid userId= Guid.Parse(userid);
        //    Console.WriteLine(userId);
        //    //if (!TryParse(userid, Guid))
        //    // return false;
        //    string base64Image = await imageService.SaveImageAsync(t.ImageFile);
        //    return turfRepo.create_turf(new Models.Turf(Guid.Parse(userid), t.location, t.sports, t.maxMembers, t.turfName, t.contactNo, t.rating, t.slots, t.price,base64Image));
        //}
        public List<Models.Turf> get_all_turfs()
        {
            return turfRepo.get_all_turfs(); 
        }

        public Models.Turf get_turf(string id)
        {
            return turfRepo.get_turf(Guid.Parse(id));
        }

        public Boolean delete_turf(string turfid, string userid)
        {
            if (get_turf(turfid).userId != Guid.Parse(userid))
                return false;
            return turfRepo.delete_turf(Guid.Parse(turfid));
        }

        public Boolean update_turf(UpdateTurf updateTurf, string turfid, string userid)
        {

            if (get_turf(turfid).userId != Guid.Parse(userid))
                return false;

            UpdateDefinition<Models.Turf> updateDefinition = Builders<Models.Turf>.Update.Combine();

            if (!string.IsNullOrEmpty(updateTurf.location))
            {
                updateDefinition = updateDefinition.Set(t => t.location, updateTurf.location);
            }

            if (updateTurf.sports != null)
            {
                updateDefinition = updateDefinition.Set(t => t.sports, updateTurf.sports);
            }

            if (updateTurf.maxMembers.HasValue)
            {
                updateDefinition = updateDefinition.Set(t => t.maxMembers, updateTurf.maxMembers.Value);
            }

            if (!string.IsNullOrEmpty(updateTurf.turfName))
            {
                updateDefinition = updateDefinition.Set(t => t.turfName, updateTurf.turfName);
            }

            if (!string.IsNullOrEmpty(updateTurf.contactNo))
            {
                updateDefinition = updateDefinition.Set(t => t.contactNo, updateTurf.contactNo);
            }

            if (updateTurf.rating.HasValue)
            {
                updateDefinition = updateDefinition.Set(t => t.rating, updateTurf.rating.Value);
            }

            if (updateTurf.slots != null && updateTurf.slots.Any())
            {
                updateDefinition = updateDefinition.Set(t => t.slots, updateTurf.slots);
            }

            if (updateTurf.price.HasValue)
            {
                updateDefinition = updateDefinition.Set(t => t.price, updateTurf.price.Value);
            }
           


            return turfRepo.update_turf(Guid.Parse(turfid), updateDefinition);

        }

        public List<Models.Turf> get_by_userid(string userid)
        {
            try
            {
                var obj = Guid.Parse(userid);
                return turfRepo.get_by_userid(obj);
            }
            catch { return null; };
        }
    }
}
