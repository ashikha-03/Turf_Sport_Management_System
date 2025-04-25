using MongoDB.Bson;
using System;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;

namespace TurfSportManagementSystem.Repository
{
    public interface ISlotsRepository
    {
    public List<Slot> get_booking(string id);
        public List<Slot> get_booked_slots(Guid id, DateTime date);
        public bool Reschedule(Reschedule getReshedule);
        public bool cancelation(Guid userid, Guid slotid);
        public Boolean get_slot(Slot slot);
        public Slot get_slotBy_id(Guid id);
        public List<Slot> get_booking_timestamp(DateTime startdate, DateTime enddate);
    }
}
