import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BookingTile, 
  Title, 
  Info, 
  BookingContainer, 
  ButtonWrapper, 
  CancelButton, 
  RescheduleButton, 
  Modal, 
  ModalContent, 
  CloseButton 
} from './style'; // Import the styled components

interface Booking {
  id: string;
  turfId: string;
  date: string;
  status: number;
  slots: string[];
  userId: string;
}

interface TurfDetails {
  turfName: string;
  location: string;
  availableSlots: string[]; // Update to store available slots directly
}

const SlotStatus = {
  0: 'Cancelled',
  1: 'NotBooked',
  2: 'Booked',
};

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState<string>('');
  const [turfDetails, setTurfDetails] = useState<Record<string, TurfDetails>>({});
  const [availableSlots, setAvailableSlots] = useState<string[]>([]); // Store available slots
  const [selectedSlot, setSelectedSlot] = useState<string>('');  // Store selected slot for rescheduling
  const [selectedDate, setSelectedDate] = useState<string>('');  // Store selected date for rescheduling
  const [showModal, setShowModal] = useState<boolean>(false);  // Show modal on reschedule
  const [selectedBookingId, setSelectedBookingId] = useState<string>(''); // Store selected booking id for reschedule

  useEffect(() => {
    const fetchBookingHistory = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setMessage('Authentication token not found');
        return;
      }

      try {
        const response = await axios.get('https://localhost:7167/slots/booking_history', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
          fetchTurfDetails(response.data.bookings);
        } else {
          setMessage('Invalid response structure');
        }
      } catch (error) {
        setMessage('Error fetching booking history');
      }
    };

    fetchBookingHistory();
  }, []);

  const fetchTurfDetails = async (bookings: Booking[]) => {
    const fetchedTurfDetails: Record<string, TurfDetails> = {};

    for (let booking of bookings) {
      const turfId = booking.turfId;
      
      if (!fetchedTurfDetails[turfId]) {
        try {
          const response = await axios.get(`https://localhost:7167/turf/get_turf/${turfId}`);
          if (response.data && response.data.turfName && response.data.location) {
            fetchedTurfDetails[turfId] = {
              turfName: response.data.turfName,
              location: response.data.location,
              availableSlots: response.data.slots || [],
            };
          }
        } catch (error) {
          console.error(`Error fetching turf details for ${turfId}:`, error);
        }
      }
    }

    setTurfDetails(fetchedTurfDetails);
  };

  const fetchBookedSlots = async (turfId: string, date: string) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      setMessage('Authentication token not found');
      return;
    }

    try {
      const response = await axios.get(`https://localhost:7167/slots/booked_slots/${turfId}/${date}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booked slots:', error);
      return [];
    }
  };

  const handleDateChange = async (event: React.ChangeEvent<HTMLInputElement>, turfId: string) => {
    setSelectedDate(event.target.value);
    setSelectedSlot('');
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      setMessage('Authentication token not found');
      return;
    }

    if (turfId && event.target.value) {
      try {
        const response = await axios.get(`https://localhost:7167/turf/get_turf/${turfId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        const allAvailableSlots = response.data.slots;
        const bookedSlots = await fetchBookedSlots(turfId, event.target.value);
        
        let slots = [];
        
        for (let i = 0; i < bookedSlots.length; i++) {
            slots.push(...bookedSlots[i].slots);
        }

        const filteredAvailableSlots = allAvailableSlots.filter(s => !slots.includes(s));
        
        if (filteredAvailableSlots.length === 0) {
          setMessage('No available slots for the selected date');
        } else {
          setAvailableSlots(filteredAvailableSlots);
        }
      } catch (error) {
        setMessage('Error fetching available slots');
        setAvailableSlots([]);
      }
    }
  };

  const handleSlotChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSlot(event.target.value);
  };

  const rescheduleBooking = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setMessage('Authentication token not found');
      return;
    }

    if (!selectedSlot || !selectedDate) {
      setMessage('Please select a slot and date to reschedule');
      return;
    }

    const requestData = {
      slotid: selectedBookingId,
      slots: [selectedSlot],
      date: selectedDate,
    };

    try {
      const response = await axios.patch(
        'https://localhost:7167/slots/reschedule',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage('Booking rescheduled successfully');
        setShowModal(false);

        const updatedBooking = { 
          ...bookings.find(b => b.id === selectedBookingId), 
          date: selectedDate, 
          slots: [selectedSlot],
        };

        setBookings(prevBookings => 
          prevBookings.map(b => b.id === selectedBookingId ? updatedBooking : b)
        );
      } else {
        setMessage('Failed to reschedule the booking');
      }
    } catch (error) {
      setMessage('Error rescheduling booking');
    }
  };

  const openRescheduleModal = (bookingId: string, turfId: string) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
    setSelectedDate('');
    setAvailableSlots([]);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSlot('');
    setSelectedDate('');
    setAvailableSlots([]);
  };

  // Split bookings into upcoming and past
  const now = Date.now();
  const upcomingBookings = bookings.filter(b => new Date(b.date).getTime() >= now);
  const pastBookings = bookings.filter(b => new Date(b.date).getTime() < now);

  return (
    <div>
      {message && <p>{message}</p>}

      {upcomingBookings.length === 0 && pastBookings.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        <>
          {upcomingBookings.length > 0 && (
            <div>
              <h2>Upcoming Bookings</h2>
              <BookingContainer>
                {upcomingBookings.map((booking, index) => (
                  <BookingTile key={index}>
                    <Title>Booking Date: {new Date(booking.date).toLocaleDateString('en-IN')}</Title>
                    <Info>Status: {SlotStatus[booking.status]}</Info>
                    <Info>Slots: {booking.slots.join(', ')}</Info>

                    {turfDetails[booking.turfId] ? (
                      <div>
                        <Info>Turf Name: {turfDetails[booking.turfId].turfName}</Info>
                        <Info>Location: {turfDetails[booking.turfId].location}</Info>
                      </div>
                    ) : (
                      <div>Loading Turf Details...</div>
                    )}

                    <ButtonWrapper>
                      <CancelButton onClick={() => console.log('Cancel Booking', booking.id)}>Cancel</CancelButton>
                      <RescheduleButton 
                        onClick={() => openRescheduleModal(booking.id, booking.turfId)}
                      >
                        Reschedule
                      </RescheduleButton>
                    </ButtonWrapper>
                  </BookingTile>
                ))}
              </BookingContainer>
            </div>
          )}

          {pastBookings.length > 0 && (
            <div>
              <h2>Past Bookings</h2>
              <BookingContainer>
                {pastBookings.map((booking, index) => (
                  <BookingTile key={index}>
                    <Title>Booking Date: {new Date(booking.date).toLocaleDateString('en-IN')}</Title>
                    <Info>Status: {SlotStatus[booking.status]}</Info>
                    <Info>Slots: {booking.slots.join(', ')}</Info>

                    {turfDetails[booking.turfId] ? (
                      <div>
                        <Info>Turf Name: {turfDetails[booking.turfId].turfName}</Info>
                        <Info>Location: {turfDetails[booking.turfId].location}</Info>
                      </div>
                    ) : (
                      <div>Loading Turf Details...</div>
                    )}
                  </BookingTile>
                ))}
              </BookingContainer>
            </div>
          )}
        </>
      )}

      {showModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <h2>Reschedule Booking</h2>
            
            <div>
              <label>Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e, upcomingBookings[0]?.turfId)}
                min={new Date().toISOString().split('T')[0]}  // Prevent selecting past dates
              />
            </div>

            {availableSlots.length > 0 ? (
              <div>
                <label>Select Slot:</label>
                <select onChange={handleSlotChange} value={selectedSlot}>
                  <option value="">Select a Slot</option>
                  {availableSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p>No available slots for the selected date</p>
            )}

            <button onClick={rescheduleBooking}>Confirm Reschedule</button>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default BookingHistory;
