using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TurfSportManagementSystem.Repository;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Service;
using TurfSportManagementSystem.Repository.Implementation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var config = builder.Configuration;

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
{
    ValidIssuer = config["JwtSettings:Issuer"],
    ValidAudience = config["JwtSettings:Audience"],
    IssuerSigningKey = new SymmetricSecurityKey
                (Encoding.UTF8.GetBytes(config["JwtSettings:SecretKey"])),
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidateIssuerSigningKey = true
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireRole("admin"));
});



builder.Services.AddSingleton<IUserRepository, UsersRepository>();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<ITurfRepository, TurfRepository>();
builder.Services.AddSingleton<ITurfService, TurfService>();
builder.Services.AddSingleton<ISlotsRepository, SlotsRepository>();
builder.Services.AddSingleton<ISlotsService, SlotsServices>();
builder.Services.AddSingleton<IFeedbackService, FeedbackService>();
builder.Services.AddSingleton<IFeedbackRepository, FeedbackRepository>();
builder.Services.AddSingleton<IImageService, ImageService>();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors((options) =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
var app = builder.Build();

app.MapGet("/", (IOptions<Password> passwordSettings) =>
{
    string salt = passwordSettings.Value.Salt;
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
