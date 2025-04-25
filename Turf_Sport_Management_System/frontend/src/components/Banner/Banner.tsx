import React from 'react';
import { BannerContainer, BannerTile, ImageWrapper, TextWrapper, BannerTitle, BannerSubtitle } from './styles'; // Update paths based on your file structure

// Assuming the image is located in src/assets/images folder
import bannerImage from '../../assets/images/banner.png'; // Update the image path

const Banner = () => {
  return (
    <BannerContainer>
      <BannerTile>
        <ImageWrapper>
          <img src={bannerImage} alt="Banner" />
        </ImageWrapper>
        <TextWrapper>
          <BannerTitle>Your Ultimate Ground for Success!</BannerTitle>
          <BannerSubtitle>Where Champions Train, Compete, and Succeed.</BannerSubtitle>
        </TextWrapper>
      </BannerTile>
    </BannerContainer>
  );
};

export default Banner;
