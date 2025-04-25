using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using TurfSportManagementSystem.Models;

namespace TurfSportManagementSystem.Repository
{
    public interface ITurfRepository
    {
        public bool create_turf(Turf t);

        public List<Turf> get_all_turfs();
        public Turf get_turf(Guid id);
        public bool delete_turf(Guid id);
        public bool update_turf(Guid id, UpdateDefinition<Turf> updateDefinitions);

        public List<Turf> get_by_userid(Guid id);
    }
}
