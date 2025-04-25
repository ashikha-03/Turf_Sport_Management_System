// src/components/TurfCard/TurfCard.tsx
import React from 'react';
import { Turf } from './types'; // Import Turf type
import { CardContainer, Image, DetailsWrapper, Name, Location, Rating, Price, ViewButton } from './styles';
import { Link } from 'react-router-dom';

const TurfCard: React.FC<{ turf: Turf }> = ({ turf }) => {
  return (
    <CardContainer>
      <Image src={turf.imageUrl} alt={turf.name} />
      <DetailsWrapper>
        <Name>{turf.name}</Name>
        <Location>{turf.location}</Location>
        <Rating>{`Rating: ${turf.rating}/5`}</Rating>
        <Price>{turf.pricePerHour}</Price>
        <Link to={`/turf-details/${turf.id}`}>
          <ViewButton>View Details</ViewButton>
        </Link>
      </DetailsWrapper>
    </CardContainer>
  );
};

export default TurfCard;
