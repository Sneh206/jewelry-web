import React from "react";

const FeaturedProducts = () => {
  const products = [
    {
      title: "Gold Necklace",
      image:
        "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw5758c9e8/header-mega-menu/banner-images/rivaah-bangles.jpg",
      price: "₹25,000",
    },
    {
      title: "Diamond Ring",
      image:
        "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw473ac013/header-mega-menu/banner-images/rivaah-accessories.jpg",
      price: "₹18,500",
    },
    {
      title: "Silver Earrings",
      image:
        "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw0b2a76d2/header-mega-menu/banner-images/rivaah-diamond-jewellery.jpg",
      price: "₹7,999",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-yellow-800 tracking-wide drop-shadow-md">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="group bg-white rounded-3xl p-6 shadow-2xl hover:shadow-yellow-500/50 transition-all duration-500 transform-gpu hover:-translate-y-3 hover:rotate-y-6 hover:scale-105 perspective"
          >
            <div className="overflow-hidden rounded-2xl transform-gpu transition duration-500 group-hover:scale-110 group-hover:rotate-2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-52 object-cover"
              />
            </div>
            <div className="mt-5 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition">
                {product.title}
              </h3>
              <p className="text-lg font-semibold text-yellow-700">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
