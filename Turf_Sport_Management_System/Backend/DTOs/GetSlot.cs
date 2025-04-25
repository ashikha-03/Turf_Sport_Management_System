using TurfSportManagementSystem.Enum;

namespace TurfSportManagementSystem.DTOs
{
    public class GetSlot
    {
        public string turfId { get; set; }
        public string date { get; set; }
        public SlotStatus status { get; set; }
        public List<string> slots { get; set; }
        public int days { get; set; } = 1;

    }
}
