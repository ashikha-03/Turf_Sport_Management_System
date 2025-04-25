// src/components/BookingTile.tsx
import React from 'react';

interface BookingProps {
  booking: any;
}

export const BookingTile: React.FC<BookingProps> = ({ booking }) => {
  const formattedDate = new Date(booking.date).toLocaleString(); // Format the date & time
  const status = booking.status === 2 ? 'Confirmed' : 'Pending';
  const slots = booking.slots.join(', '); // Assuming 'slots' is an array of strings

  return (
    <div className="booking-tile">
      <h3>{formattedDate}</h3>
      <p>Status: {status}</p>
      <p>Slots: {slots}</p>
    </div>
  );
};
