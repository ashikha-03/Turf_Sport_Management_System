import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0; /* Remove default margin */
    padding: 0; /* Remove default padding */
    background-color: black; /* Ensure the background is black */
    color: white; /* White text for visibility */
    font-family: 'Roboto', sans-serif;
  }
  
  * {
    box-sizing: border-box; /* To ensure consistent sizing */
  }
`;
