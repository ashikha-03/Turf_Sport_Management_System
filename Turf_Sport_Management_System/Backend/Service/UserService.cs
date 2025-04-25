using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Enum;
using TurfSportManagementSystem.Models;
using TurfSportManagementSystem.NewFolder;
using TurfSportManagementSystem.Repository;

namespace TurfSportManagementSystem.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository repo;
        private readonly Password _passwordSettings;
        private readonly IConfiguration configuration;
        public UserService(IUserRepository userRepo, IOptions<Password> passwordSettings, IConfiguration configuration)
        {
            this.repo = userRepo;
            _passwordSettings = passwordSettings.Value;
            this.configuration = configuration;

            //repo.register(new RegisterUser
            //{
            //    userName = "admin",
            //    email = "admin@gmail.com",
            //    phone = "1234",
            //    password = CreatePasswordHash("admin")
            //});
        }

        public string Login(Login l)
        {
            Users u = repo.MatchUserName(l.userName);

            if (u != null)
            {

                l.password = CreatePasswordHash(l.password);
                Console.WriteLine(l.password + " " + u.password);
                if (u.password == l.password)
                    return CreateToken(u.Id.ToString(), u.role, u.userName);
                else
                    return "Invalid credentials";
            }
            else
                return "User not found";
        }

        private string CreateToken(string id, Role role, string username)
        {

            // Here the role, name is not adding while creating token.

            var claims = new[]
            {
                new Claim(ClaimTypes.Role, role == Role.Admin ? "admin" : "user"),
                new Claim(ClaimTypes.NameIdentifier, id),
                new Claim(ClaimTypes.Name, username),
                new Claim(JwtRegisteredClaimNames.Aud, "JwtAudience"),
                new Claim(JwtRegisteredClaimNames.Iss,"JwtIssuer"),
                new Claim(JwtRegisteredClaimNames.Sub, id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:SecretKey"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private string CreatePasswordHash(string password)
        {
            string saltedpassword = password + _passwordSettings.Salt;
            Console.WriteLine(password);
            using (var sHA256 = SHA256.Create())
            {

                byte[] saltedPasswordBytes = Encoding.UTF8.GetBytes(saltedpassword);
                byte[] hashBytes = sHA256.ComputeHash(saltedPasswordBytes);
                return Convert.ToBase64String(hashBytes);
            }
        }

        public bool register(Register user)
        {

            user.password = CreatePasswordHash(user.password);

            return repo.register(user);
        }

        public List<userDetails> userDetails()
        {
            return repo.userDetails();
        }

        public Boolean delete_user(string id)
        {
            return repo.delete_user(id);
        }
    }
}
