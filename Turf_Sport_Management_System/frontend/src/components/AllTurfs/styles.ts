import styled from 'styled-components';

// Main container for the list
export const AllTurfsContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap; 
  flex-direction: row;
  justify-content: space-between; 
  gap: 20px; 
  position: relative;
`;

// Card/container for each turf
export const TurfCard = styled.div`
  width: calc(20% - 16px);  /* Adjust width for 5 cards in a row */
  min-width: 200px;  /* Make sure cards have a minimum size */
  height: 350px;  /* Adjust height for the card */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin-bottom: 20px; /* Bottom margin to separate rows */
  
  &:hover {
    transform: scale(1.05);
  }
`;

// Turf Image at the top of the card
export const TurfImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: none;
  border-radius: 8px 8px 0 0;
`;

// Details wrapper for text and button
export const TurfDetailsWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Align the button to the bottom */
  height: 100%; /* Take full height of the card */
`;

// Turf Name
export const TurfName = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
`;

// Turf Location
export const TurfLocation = styled.p`
  font-size: 14px;
  color: #555;
  margin: 5px 0;
`;

// Price of the turf
export const TurfPrice = styled.p`
  font-size: 1.2rem;
  color: green;
  font-weight: bold;
  margin: 10px 0;
`;

// Rating of the turf
export const TurfRating = styled.p`
  font-size: 14px;
  color: #333;
  margin: 5px 0;
`;

// Button to view details
export const TurfButton = styled.button`
  padding: 8px 12px;
  background-color: black;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px; /* Add some space above the button */
  
  &:hover {
    background-color: #0056b3;
  }
`;

// Wrapper for all turfs
export const Turfcontainer = styled.div`
  display: flex;
  flex-wrap: wrap;  /* Ensure cards wrap in smaller screens */
  gap: 50px;
  margin: 10%;
  justify-content: left; /* Center align the cards */
`;
