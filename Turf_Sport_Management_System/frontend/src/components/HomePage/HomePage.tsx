import React from 'react';
import TurfSlider from '../TurfSlider/TurfSlider';
import Contact from '../ContactSection/ContactSection';
import { HomeWrapper, Banner } from './styles';

const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <Banner>
        <h1>Welcome to Turfio</h1>
        <p>Find and book your favorite turf here.</p>
      </Banner>
      
      <section>
        <TurfSlider />
      </section>
      
      <section>
        <Contact />
      </section>
    </HomeWrapper>
  );
};

export default Home;
