import styled from 'styled-components';

export const HomeWrapper = styled.div`
  width: 100%;
  min-height: 100vh;  /* Full screen height */
  background-color: black;  /* Black background */
  color: white;  /* White text color to contrast with black background */
  padding: 0;  /* Remove default padding */
`;

export const Banner = styled.div`
  background-image: url('banner-image.jpg');  /* Optional background image */
  background-size: cover;
  background-position: center;  /* Ensure the image is centered */
  color: white;
  text-align: center;
  padding: 100px 20px;
  min-height: 50vh;  /* Ensure banner takes up at least half the screen height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  h1 {
    font-size: 50px;
    margin: 0;
  }

  p {
    font-size: 20px;
    margin: 10px 0 0 0;
  }
`;

