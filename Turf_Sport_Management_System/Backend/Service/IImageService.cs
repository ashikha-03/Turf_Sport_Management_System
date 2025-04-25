namespace TurfSportManagementSystem.Service
{
    public interface IImageService
    {
        Task<string> SaveImageAsync(IFormFile imageFile);
    }
}
