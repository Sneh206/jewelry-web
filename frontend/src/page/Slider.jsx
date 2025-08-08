import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// custom CSS for 3D effect

const Slider = () => {
  return (
    <div className="w-full h-full m-0 p-0 perspective-1000 overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full h-full"
      >
        <SwiperSlide className="slide-3d">
          <img
            src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw1ab21a3f/homepage/HeroBanner/festivals-of-diamond-offer-desktop.jpg"
            alt="Slide 1"
            className="w-full h-full object-cover rounded-2xl shadow-xl"
          />
        </SwiperSlide>
        <SwiperSlide className="slide-3d">
          <img
            src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw5a5ad31d/rivaahpage/rivaah-south-geo-d1.jpg"
            alt="Slide 2"
            className="w-full h-full object-cover rounded-2xl shadow-xl"
          />
        </SwiperSlide>
        <SwiperSlide className="slide-3d">
          <img
            src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw2d6dfd57/homepage/HeroBanner/sparkling-avenues-desktop.jpg"
            alt="Slide 3"
            className="w-full h-full object-cover rounded-2xl shadow-xl"
          />
        </SwiperSlide>
        <SwiperSlide className="slide-3d">
          <img
            src="https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw63015926/homepage/HeroBanner/rir-desktop-new.jpg"
            alt="Slide 4"
            className="w-full h-full object-cover rounded-2xl shadow-xl"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
