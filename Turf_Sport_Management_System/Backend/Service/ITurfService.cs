using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;

namespace TurfSportManagementSystem.Service
{
    public interface ITurfService
    {
        public Task<bool> create_turf(DTOs.GetTurf t, string userid);
        public List<Models.Turf> get_all_turfs();
        public Models.Turf get_turf(string id);
        public bool delete_turf(string turfid, string userid);
        public bool update_turf(UpdateTurf updateTurf, string turfid, string userid);
        public List<Models.Turf> get_by_userid(string id);
    }
}
