import { styled } from "styled-components";



// Main container for the slider
export const SliderContainer = styled.div`
  width: 96%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 10px;
`;

// Wrapper for scrollable items
export const ScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;  // Horizontal scrolling enabled
  overflow-y: hidden;  // Disable vertical scrolling
  scroll-snap-type: x mandatory;
  gap: 15px;
  padding-bottom: 10px;
  width: 100%;
  margin: 2%;
  &::-webkit-scrollbar { display: none; }
`;

export const TurfCard = styled.div`
  flex: 0 0 auto;
  width: 300px;  // Keep width same
  height: 450px;  // Increased height (taller card)
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin-top: 15px;
  font-family: 'Roboto', sans-serif; /* Apply Roboto font family */
  &:hover {
    transform: scale(1.05);
  }
`;

// Turf image on the left side
export const TurfImage = styled.img`
  width: 100%;
  height: 230px;  // Increased height of the image
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

// Details section on the right side
export const TurfDetailsWrapper = styled.div`
  margin-top:10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;  // Ensures that the details fill the remaining space
`;

// Name of the turf
export const TurfName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
  font-family: 'Roboto', sans-serif; /* Apply Roboto font family */
`;

// Location of the turf
export const TurfLocation = styled.p`
  font-size: 16px;
  color: #555;
  margin: 5px 0;
  font-family: 'Roboto', sans-serif; /* Apply Roboto font family */
`;

// Price of the turf
export const TurfPrice = styled.p`
  font-size: 1.4rem;
  color: green;
  font-weight: bold;
  margin: 10px 0;
  font-family: 'Roboto', sans-serif; /* Apply Roboto font family */
`;

// Rating of the turf
export const TurfRating = styled.p`
  font-size: 16px;
  color: #333;
  margin: 5px 0;
  font-family: 'Roboto', sans-serif; /* Apply Roboto font family */
`;

// Button to view details
export const TurfButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif; /* Apply Roboto font family */
  
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

// Left and right buttons for navigation
export const LeftButton = styled.button`
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 35px;
  padding: 20px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 1;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 768px) {
    left: 3px;
  }
`;

export const RightButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 35px;
  padding: 20px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 1;
  transition: background 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 768px) {
    right: 3px;
  }
`;
