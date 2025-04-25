using System;
using System.Collections.Generic;
using System.Linq;
using TurfSportManagementSystem.DTOs;
using TurfSportManagementSystem.Models;
using TurfSportManagementSystem.Repository;

namespace TurfSportManagementSystem.Service
{
    public class SlotsServices : ISlotsService
    {
        private readonly ISlotsRepository _slotsRepo;
        private readonly ITurfRepository _turfRepo;

        public SlotsServices(ISlotsRepository slotsRepo, ITurfRepository turfRepo)
        {
            _slotsRepo = slotsRepo;
            _turfRepo = turfRepo;
        }

        public List<Slot> get_booking(string id)
        {
            return _slotsRepo.get_booking(id);
        }

        public List<Slot> get_booked_slots(string turfId, DateTime date)
        {
            return _slotsRepo.get_booked_slots(Guid.Parse(turfId), date);
        }

        public bool can_get_slot(List<string> requestedSlots, Guid turfId, DateTime date)
        {
            if (requestedSlots == null)
                return false;

            List<string> availableSlots = _turfRepo.get_turf(turfId).slots.ToList();
            bool slotAvailable = requestedSlots.All(slot => availableSlots.Contains(slot));

            if (!slotAvailable)
                return false;

            List<Slot> bookedSlots = _slotsRepo.get_booked_slots(turfId, date);

            foreach (Slot bookedSlot in bookedSlots)
            {
                foreach (string requestedSlot in requestedSlots)
                {
                    DateTime requestedStartTime = GetDateTimeFromSlotString(requestedSlot, date);
                    DateTime requestedEndTime = requestedStartTime.AddMinutes(60); 

                    foreach (string bookedSlotString in bookedSlot.slots)
                    {
                        DateTime bookedStartTime = GetDateTimeFromSlotString(bookedSlotString, date);
                        DateTime bookedEndTime = bookedStartTime.AddMinutes(60);

                        if ((requestedStartTime < bookedEndTime && requestedEndTime > bookedStartTime))
                        {
                            return false;  // Conflict detected
                        }
                    }
                }
            }

            return true;  // No conflicts, slot can be booked
        }

        private DateTime GetDateTimeFromSlotString(string slot, DateTime date)
        {
            DateTime parsedTime = DateTime.Parse(slot);
            return date.Date.Add(parsedTime.TimeOfDay); // Combine the requested time with the given date
        }

        public bool cancelation(string slotid, string userid)
        {
            return _slotsRepo.cancelation(Guid.Parse(slotid), Guid.Parse(userid));
        }

        public bool Reschedule(Reschedule getReschedule, string userid)
        {
            List<string> requestedSlots = getReschedule.slots.ToList();
            DateTime date = getReschedule.date;

            Slot existingSlot = _slotsRepo.get_slotBy_id(Guid.Parse(getReschedule.slotid));

            if (existingSlot.userId != Guid.Parse(userid))
                return false;

            if (!can_get_slot(requestedSlots, existingSlot.turfId, date))
                return false;

            return _slotsRepo.Reschedule(getReschedule);
        }

        public bool recursive_booking(GetSlot booking, string userid)
        {
            Turf turf = _turfRepo.get_turf(Guid.Parse(booking.turfId));

            if (!turf.slots.Any(slot => booking.slots.Contains(slot)))
                return false;

            DateTime date = DateTime.Parse(booking.date); // Fixing the type conversion issue

            for (int i = 0; i < booking.days; i++)
            {
                List<Slot> bookedSlots = _slotsRepo.get_booked_slots(Guid.Parse(booking.turfId), date);

                foreach (Slot bookedSlot in bookedSlots)
                {
                    foreach (string requestedSlot in booking.slots)
                    {
                        if (bookedSlot.slots.Contains(requestedSlot))
                            return false;  // Conflict detected
                    }
                }

                date = date.AddDays(7);  // Move to the next week for recursive booking
            }

            date = DateTime.Parse(booking.date); // Fixing the type conversion issue
            for (int i = 0; i < booking.days; date = date.AddDays(7), i++)
            {
                _slotsRepo.get_slot(new Slot(
                    Guid.Parse(booking.turfId),
                    date,
                    Enum.SlotStatus.Maintenance, // Assuming maintenance status for new bookings
                    booking.slots,
                    Guid.Parse(userid)
                ));
            }

            return true;
        }
    }
}
