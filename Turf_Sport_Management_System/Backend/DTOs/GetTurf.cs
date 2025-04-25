namespace TurfSportManagementSystem.DTOs
{
    public class GetTurf
    {
        public string location { get; set; }
        public List<string> sports { get; set; }

        public int maxMembers { get; set; }
        public string turfName { get; set; }
        public string contactNo { get; set; }
        public double rating { get; set; }

        public List<string> slots { get; set; }
        public int price { get; set; }
        public IFormFile ImageFile { get; set; }
    }
}
