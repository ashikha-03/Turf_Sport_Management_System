using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.NewFolder;

namespace TurfSportManagementSystem.Service
{
    public interface IUserService
    {
        public bool register(Register user);
        public string Login(Login l);
        public List<userDetails> userDetails();
        public bool delete_user(string id);
    }
}
