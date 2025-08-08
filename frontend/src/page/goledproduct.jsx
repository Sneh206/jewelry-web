import React from 'react';

const GoledProduct = () => {
  const categories = [
    {
      label: 'Women Jewellery',
      image:
        'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw811805ad/homepage/ShopByGender/sbg-women.jpg',
    },
    {
      label: 'Men Jewellery',
      image:
        'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwe6fec18e/homepage/ShopByGender/sbg-men.jpg',
    },
    {
      label: 'Kids Jewellery',
      image:
        'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw1e976d94/homepage/ShopByGender/sbg-kids.jpg',
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-10 px-6 py-16 bg-white">
      {categories.map((item, index) => (
        <div
          key={index}
          className="w-80 text-center transform transition duration-500 hover:-translate-y-4 hover:scale-105 hover:rotate-[1deg] relative group"
        >
          {/* Glow/shine overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-yellow-100/5 opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none z-10" />

          <img
            src={item.image}
            alt={item.label}
            className="rounded-xl w-full h-[400px] object-cover shadow-lg group-hover:shadow-2xl transition-shadow duration-500 z-0"
          />
          <p className="mt-4 text-xl font-semibold text-yellow-800">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default GoledProduct;
