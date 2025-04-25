using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;
using System;
using System.Collections.Generic;

namespace TurfSportManagementSystem.Service
{
    public interface ISlotsService
    {
        public List<Models.Slot> get_booking(string id);
        public List<Models.Slot> get_booked_slots(string turfId, DateTime date);

        public bool cancelation(string slotid, string userid);
        public bool Reschedule(Reschedule getReschedule, string userid);
        public Boolean recursive_booking(DTOs.GetSlot booking, string userid);
    }
}
