import React from 'react';
import Slider from './Slider.jsx';
import Services from './Services.jsx';
import LatestProducts from './LatestProducts.jsx';
import JewellerySlider from './JewellerySlider.jsx';
import FeaturedProducts from './FeaturedProducts.jsx';
import Photo from './photo.jsx';
import GoledProduct from './goledproduct.jsx';
import Testimonials from './Testimonials.jsx';

const Home = () => {
  return (
    <div>
      <Slider />
      <Services/>
      <LatestProducts/>
      <JewellerySlider/>
      <FeaturedProducts/>
      <Photo/>
      <GoledProduct/>
      <Testimonials/>
    </div>
  );
};

export default Home;
