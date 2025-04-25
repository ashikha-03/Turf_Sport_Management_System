import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { TurfDetails } from './types';
import paymentQR from '../../assets/images/image/paymentQR.png';
import StarRatings from 'react-star-ratings';
import {
  Container,
  TurfTile,
  Button,
  Heading,
  Info,
  Modal,
  ModalContent,
  DatePicker,
  SlotList,
  SlotItem,
  CheckboxLabel,
  CloseButton,
  BookingContainer,
  MessageContainer,
  ImageSection,
  Tile,
  InfoSection

} from './styles';

interface TurfDetailsComponentProps {
  turfId: string;
}

const TurfDetailsComponent: React.FC<TurfDetailsComponentProps> = ({ turfId }) => {
  const [turf, setTurf] = useState<TurfDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [numOfDays, setNumOfDays] = useState<number>(1);
  const [showPaymentQR, setShowPaymentQR] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);

  // Get current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split('T')[0];

  // Fetch Turf Details
  useEffect(() => {
    const fetchTurfDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7167/turf/get_turf/${turfId}`);
        console.log('Fetched Turf Details:', response.data);
        const turfData = response.data;
        if (turfData) {
          setTurf({
            ...turfData,
            imageUrl: turfData.image || '',
          });
        } else {
          setMessage('No turf data found.');
        }
      } catch (err) {
        console.error('Error fetching turf details:', err);
        setMessageType('error');
        setMessage('Failed to fetch turf details. Please try again later.');
      }
    };

    if (turfId) {
      fetchTurfDetails();
    } else {
      setMessage('Turf not found');
    }
  }, [turfId]);

  // Fetch booked slots based on selected date
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
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching booked slots:', error);
      return [];
    }
  };

  // Decode JWT to extract role
  const getRoleFromToken = () => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      try {
        const decodedToken: any = jwtDecode(authToken);
        return decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  };

  // Handle date selection and fetching available slots
  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSelectedSlots([]); // Reset selected slots when date is changed
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      setMessage('Authentication token not found');
      return;
    }

    if (turfId && e.target.value) {
      try {
        const response = await axios.get(`https://localhost:7167/turf/get_turf/${turfId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const allAvailableSlots = response.data.slots;

        const bookedSlots = await fetchBookedSlots(turfId, e.target.value);

        let slots: string[] = [];
        for (let i = 0; i < bookedSlots.length; i++) {
          slots.push(...bookedSlots[i].slots);
        }

        console.log(slots);
        console.log(allAvailableSlots);

        const filteredAvailableSlots = allAvailableSlots.filter(s => !slots.includes(s));
        setAvailableSlots(filteredAvailableSlots);
      } catch (error) {
        setMessage('Error fetching available slots');
        setAvailableSlots([]);
      }
    }
  };

  const handleSlotSelection = (slot: string) => {
    setSelectedSlots((prevSelectedSlots) => {
      if (prevSelectedSlots.includes(slot)) {
        return prevSelectedSlots.filter((s) => s !== slot); // Deselect slot if already selected
      } else {
        return [...prevSelectedSlots, slot]; // Add slot if not selected
      }
    });
  };

  const onSubmit = () => {
    if (selectedDate && selectedSlots.length > 0 && numOfDays > 0)
      setIsModalOpen(true);
  }

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    if (!selectedDate) {
      setMessageType('error');
      setMessage('Please select a date.');
      return;
    }
    if (selectedSlots.length === 0) {
      setMessageType('error');
      setMessage('Please select at least one slot to book.');
      return;
    }
    if (numOfDays <= 0) {
      setMessageType('error');
      setMessage('Number of days must be greater than 0.');
      return;
    }

    // Get role from token
    const role = getRoleFromToken();
    if (!role) {
      setMessageType('error');
      setMessage('Role is required for booking.');
      return;
    }

    // Make an API call to book the turf (POST request)
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setMessageType('error');
        setMessage('Authentication token not found');
        return;
      }

      // Prepare the booking data
      const bookingData = {
        turfId,
        date: selectedDate,
        status: 0, // Set the initial status (0 or change as per your needs)
        slots: selectedSlots,
        days: numOfDays,
      };

      // Construct the URL with the role included
      const bookingUrl = `https://localhost:7167/slots/book_slot/${role}`;

      const response = await axios.post(bookingUrl, bookingData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Handle booking response
      if (response.status === 200) {
        setMessageType('success');
        setMessage('Booking confirmed! Please proceed to payment.');
        setShowPaymentQR(true); // Show the payment QR modal after confirming the booking
      } else {
        setMessageType('error');
        setMessage('Failed to confirm booking. Please try again later.');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      setMessageType('error');
      setMessage('Failed to confirm booking. Please try again later.');
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    setShowPaymentQR(false);
    setIsRatingModalOpen(true);
  };

  const handleRatingSubmit = () => {
    setMessageType('success');
    setMessage('Thank you for your rating!');
    setIsRatingModalOpen(false);
    setPaymentSuccess(true);
  };

  // Handle closing all modals
  const handleCloseAllModals = () => {
    setShowPaymentQR(false);
    setPaymentSuccess(false);
    setIsRatingModalOpen(false);
    setIsModalOpen(false);
  };

  return (
    <Container>
      {turf ? (

        <TurfTile>

          {/* <Tile> */}
          {/* 1 */}
          <ImageSection>
            <img src={turf.imageUrl} alt={"hello"} style={{ width: '100%', height: 'auto' }} />
          </ImageSection>

          <InfoSection>
            <Heading>{turf.turfName}</Heading>
            <Info><strong>Location:</strong> {turf.location}</Info>
            <Info><strong>Sports Available:</strong> {turf.sports.join(', ')}</Info>
            <Info><strong>Max Members:</strong> {turf.maxMembers}</Info>
            <Info><strong>Contact No:</strong> {turf.contactNo}</Info>
            <Info><strong>Rating:</strong> {turf.rating}</Info>
            <Info><strong>Price:</strong> ₹{turf.price}/hr</Info>


            {/* 2.2 */}
            <BookingContainer>
              <label htmlFor="numOfDays">Date  </label>
              <DatePicker
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                min={currentDate} // Allow only today's date or future dates
              />


              {/* Message Container */}
              {message && (
                <MessageContainer messageType={messageType}>
                  <p>{message}</p>
                </MessageContainer>
              )}

              {/* Display available slots once a date is selected */}
              {availableSlots.length > 0 ? (
                <div>
                  <h3>Select your slots for {selectedDate}:</h3>
                  <SlotList>
                    {availableSlots.map((slot, index) => (
                      <SlotItem key={index}>
                        <input
                          type="checkbox"
                          id={`slot-${index}`}
                          value={slot}
                          onChange={() => handleSlotSelection(slot)}
                        />
                        <CheckboxLabel htmlFor={`slot-${index}`}>{slot}</CheckboxLabel>
                      </SlotItem>
                    ))}

                  </SlotList>
                  <div>
                    <label htmlFor="numOfDays">No of Days</label>
                    <input
                      type="number"
                      value={numOfDays}
                      onChange={(e) => setNumOfDays(Number(e.target.value))}
                      min="1"
                      placeholder="No of Days"
                    />
                  </div>
                </div>
              ) : (
                <div>No available slots for this date.</div>
              )}

              {/* Book Now Button */}
              <Button onClick={onSubmit} >Book Now</Button>
            </BookingContainer>
          </InfoSection>
          {/* </Tile> */}
          {/* Modal for confirming the booking */}
          {isModalOpen && (
            <Modal>
              <ModalContent>
                <CloseButton onClick={() => setIsModalOpen(false)}>X</CloseButton>
                <h3>Confirm your booking</h3>
                {/* <label htmlFor="date">Date of Booking </label> */}
                <Info><strong>Date:</strong>{selectedDate}</Info>
                <Info><strong>Slots:</strong>{selectedSlots.toString()}</Info>
                <Info><strong>No of Days:</strong>{numOfDays}</Info>

                <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
              </ModalContent>
            </Modal>
          )}

          {/* Payment QR Modal */}
          {showPaymentQR && (
            <Modal>
              <ModalContent>
                <CloseButton onClick={() => setShowPaymentQR(false)}>X</CloseButton>
                <h3>Payment for ₹{turf.price * numOfDays}</h3>
                <img src={paymentQR} alt="Payment QR" style={{ width: '100%', maxWidth: '300px' }} />
                <Button onClick={handlePaymentSuccess}>Pay Now</Button>
              </ModalContent>
            </Modal>
          )}

          {/* Payment Success Modal */}
          {paymentSuccess && (
            <Modal>
              <ModalContent>
                <CloseButton onClick={handleCloseAllModals}>X</CloseButton>
                <h3>Payment Successful!</h3>
                <p>Your payment has been successfully processed. Your booking is confirmed.</p>
                <Button onClick={handleCloseAllModals}>Close</Button>
              </ModalContent>
            </Modal>
          )}

          {/* Rating Modal */}
          {isRatingModalOpen && (
            <Modal>
              <ModalContent>
                <CloseButton onClick={handleCloseAllModals}>X</CloseButton>
                <h3>Rate your experience</h3>
                <StarRatings
                  rating={rating}
                  starRatedColor="gold"
                  changeRating={(newRating) => setRating(newRating)}
                  numberOfStars={5}
                  name="rating"
                />
                <Button onClick={handleRatingSubmit}>Submit Rating</Button>
              </ModalContent>
            </Modal>
          )}
        </TurfTile>
      ) : (
        <div>{message && <p className={messageType}>{message}</p>}</div>
      )}
    </Container>
  );
};

export default TurfDetailsComponent;
