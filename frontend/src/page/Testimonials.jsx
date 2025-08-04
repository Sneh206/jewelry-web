import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // ✅ CORRECT


const Testimonials = () => {
  const clients = [
    {
      name: 'Patrick Goodman',
      quote: '“Reliable product, consistently delivers.”',
      desc: 'There are many variations of passages of lorem Ipsum available but the have alteration in some form by injected humour randomised words.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Luies Charls',
      quote: '“Excellent product, A+ customer service.”',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      name: 'Jecob Goeckno',
      quote: '“Impressive quality, durable and reliable.”',
      desc: 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances.',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
      name: 'Patrick Goodman',
      quote: '“Reliable product, consistently delivers.”',
      desc: 'There are many variations of passages of lorem Ipsum available but the have alteration in some form by injected humour randomised words.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  ];

  return (
    <section className="px-6 md:px-20 py-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
      <p className="text-gray-500 mb-12 max-w-xl mx-auto">
        There are many variations of passages of lorem Ipsum available
      </p>

     <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000 }}
        loop={true}
        spaceBetween={0}
        slidesPerView={3}
        className="w-full h-full"
      >
        {clients.map((client, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full text-left">
              <p className="text-lg font-semibold text-gray-800 mb-3">{client.quote}</p>
              <p className="text-gray-600 mb-6">{client.desc}</p>
              <div className="flex items-center gap-4">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="font-semibold text-gray-800">{client.name}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
