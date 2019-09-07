import React from 'react';
import './PromoCard.module.scss';
import { Slide } from 'react-slideshow-image';

const images = [
  'mustang-4.jpeg',
  'mustang-5.jpeg',
  'expedition.jpeg',
  'F150.jpeg',
];

const PromoCard = () => (
  <div className="bannerWrapper">
    <Slide
      images={images}
      duration={5000}
      transitionDuration={1000}
    />
  </div>
);

export default PromoCard;
