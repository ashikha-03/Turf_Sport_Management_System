import styled from 'styled-components';

// Section container for the contact section
export const Section = styled.section`
  background-color: #fff; /* White background to create tile effect */
  padding: 20px 20px;
  text-align: center;
  color: #34495e; /* Dark color for text */
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Soft shadow for the tile effect */
  margin-top: 40px;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

// Title of the contact section
export const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #34495e;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Subtitle to create a more welcoming effect
export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  font-weight: 300;
`;

// Contact details wrapper
export const ContactDetails = styled.div`
  font-size: 1.1rem;
  color: #34495e;
  line-height: 1.8;
  margin-top: 20px;
  font-family: 'Arial', sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Contact methods (email, address, etc.) styles
export const ContactInfo = styled.div`
  margin-top: 30px;
  font-size: 1.1rem;
  color: #34495e;
  line-height: 1.6;
`;

// Style for the email and address
export const InfoText = styled.p`
  margin: 5px 0;
  font-weight: 300;
`;

// Contact button
export const ContactButton = styled.a`
  display: inline-block;
  padding: 12px 30px;
  background-color: #1abc9c;
  color: white;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 30px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #16a085;
  }
`;
