using System.Collections.Generic;
using System.Threading.Tasks;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;
using TurfSportManagementSystem.NewFolder;

namespace TurfSportManagementSystem.Repository
{
    public interface IUserRepository
    {
        public bool Login(Login loginDetails);
        public bool register(Register user);
        public Users MatchUserName(string EmailOName);
        public List<userDetails> userDetails();
        public bool delete_user(string id);
    }
}
