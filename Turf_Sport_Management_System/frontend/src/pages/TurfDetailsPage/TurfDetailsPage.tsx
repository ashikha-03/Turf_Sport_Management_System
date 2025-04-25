import React from 'react';
import { useParams } from 'react-router-dom';  // To get the turf ID from URL
import TurfDetailsComponent from '../../components/TurfDetails/TurfDetails';  // Import the TurfDetailsComponent

const TurfDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Get turf ID from the URL

  return (
      <TurfDetailsComponent turfId={id} />
  );
};

export default TurfDetailsPage;
