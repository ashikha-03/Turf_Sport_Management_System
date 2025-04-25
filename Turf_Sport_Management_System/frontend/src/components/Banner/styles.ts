import styled from 'styled-components';

// Main container for the banner, center-aligns the title
export const BannerContainer = styled.div`
  width: 100%;
  height: 350px;  // Slightly increase height for better visual balance
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 60px; 
   // Increased margin to push the banner lower from the nav
  box-sizing: border-box;  // Ensures padding is inside the container's size
    // Light background to separate it from the navbar
  border-radius: 10px;  // Optional: Adds rounded corners to the banner
`;

// Banner Tile container
export const BannerTile = styled.div`
  width: 90%;  // Adjust the width to take up more space on smaller screens
  max-width: 900px;
  height: 100%;
  display: flex;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);  // Increased blur effect for a modern look
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  overflow: hidden;  // Ensures image and text section are neatly contained within the tile
`;

// Wrapper for the image section (left side of the tile)
export const ImageWrapper = styled.div`
  width: 50%;  // Image takes up half of the tile
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 10px 0 0 10px;
  position: relative;  // Ensures the image's relative position if needed for styling
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px 0 0 10px;
  }
`;

// Wrapper for the text section (right side of the tile)
export const TextWrapper = styled.div`
  width: 50%;  // Text takes up the other half of the tile
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: hsl(0, 0.00%, 100.00%);  // Lighter background for text readability
  border-radius: 0 10px 10px 0;
`;

// Title text inside the tile
export const BannerTitle = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin: 30px 0 15px 0;  // Reduced margin for better visual balance
  color: #333;  // Darker text for better contrast
  text-align: center;
`;

// Subtitle text inside the tile
export const BannerSubtitle = styled.p`
  font-size: 18px;
  margin-top: 10px;
  color: #555;  // Slightly lighter gray text for the subtitle
  text-align: center;
`;
