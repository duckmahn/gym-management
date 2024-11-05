namespace GymManagement_API.Service.Interface
{
    public interface IBlobService
    {
        Task<string> SaveFile(string containerName, IFormFile file);
        Task<string> DeleteFile(string containerName, string fileName);
        Task<string> GetFile(string containerName, IFormFile file, string path);
    }
}
