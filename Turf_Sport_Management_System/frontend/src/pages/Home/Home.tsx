import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import ContactSection from '../../components/ContactSection/ContactSection';
import TurfSlider from '../../components/TurfSlider/TurfSlider';

const Home: React.FC = () => {
  return (
    <div>
      
      <Banner />
      <TurfSlider />
      <ContactSection />
    </div>
  );
};

export default Home;
