import React from 'react';
import { Section, Title, Subtitle, ContactDetails, ContactInfo, InfoText, ContactButton } from './styles';

const ContactSection: React.FC = () => {
  return (
    <Section>
      <Title>Contact</Title>
      <Subtitle>We’re here to assist you!</Subtitle>
      <ContactDetails>
        <h2>WE’RE HERE FOR YOU</h2>
        <p>Our expert support team is ready to answer all your questions.</p>
      </ContactDetails>
      <ContactInfo>
        <InfoText>Email: contact@turfsport.com</InfoText>
        <InfoText>Address: 76, Turf Street, Chennai, India</InfoText>
      </ContactInfo>
      <ContactButton href="mailto:contact@turfsport.com">Contact Us</ContactButton>
    </Section>
  );
};

export default ContactSection;
