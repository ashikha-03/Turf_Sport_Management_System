namespace TurfSportManagementSystem.DTOs
{
    public class Reschedule
    {
        public string slotid { get; set; }
        public List<string> slots { get; set; }
        public DateTime date { get; set; }
    }
}
