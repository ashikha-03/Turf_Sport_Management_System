// pages/BookingPage.tsx

import React, { useEffect, useState } from 'react';
import BookingHistory from '../../components/BookingHistory/BookingHistory';
const Home: React.FC = () => {
    return (
      <div className="home-page">
        <h1>Booking History</h1>
        <BookingHistory />
      </div>
    );
  };
  export default BookingHistory;