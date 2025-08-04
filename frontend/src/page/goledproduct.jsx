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
    <div className="flex gap-5 px-12 py-16 bg-white">
      {categories.map((item, index) => (
        <div key={index} className="w-96 text-center">
          <img
            src={item.image}
            alt={item.label}
            className="rounded-xl w-full h-[400px] object-cover shadow-md hover:shadow-xl transition"
          />
          <p className="mt-4 text-xl font-semibold text-gray-800">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default GoledProduct;
