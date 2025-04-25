import styled from 'styled-components';

// Booking Container: Full-width grid layout
export const BookingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

// Booking Tile: Individual booking container
export const BookingTile = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

// Title of the booking (Booking Date)
export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  padding-bottom: 10px;
`;

// Info section (Status, Turf details, etc.)
export const Info = styled.p`
  font-size: 14px;
  color: #666;
  margin: 5px 0;
  padding: 0;
`;

// Button Wrapper: Container for action buttons
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

// Cancel Button
export const CancelButton = styled.button`
  background-color:rgb(245, 17, 0);
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

// Reschedule Button
export const RescheduleButton = styled.button`
  background-color:rgb(18, 131, 144);
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:rgb(82, 168, 180);
  }
`;

// Modal styles for rescheduling
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Modal Content for rescheduling
export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

// Close Button for the modal
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: #999;
  cursor: pointer;

  &:hover {
    color: #666;
  }
`;

// Section Header for Upcoming/Past Booking section
export const SectionHeader = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  text-align: left;
  margin: 20px 0;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
`;

// Loading message or empty state
export const NoBookingsMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #777;
  padding: 20px;
`;

// Grid for upcoming and past bookings
export const UpcomingContainer = styled.div`
  margin-top: 20px;
`;

export const PastContainer = styled.div`
  margin-top: 40px;
`;

export const PastBookingsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;
