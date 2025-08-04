import React from "react";

const FeaturedProducts = () => {
  const products = [
    {
      title: "Gold Necklace",
      image: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw5758c9e8/header-mega-menu/banner-images/rivaah-bangles.jpg",
      price: "₹25,000",
    },
    {
      title: "Diamond Ring",
      image: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw473ac013/header-mega-menu/banner-images/rivaah-accessories.jpg",
      price: "₹18,500",
    },
    {
      title: "Silver Earrings",
      image: "https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw0b2a76d2/header-mega-menu/banner-images/rivaah-diamond-jewellery.jpg",
      price: "₹7,999",
    },
  ];

  return (
    <section className="py-8 px-4 bg-yellow-50">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-800">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            <p className="text-lg text-yellow-700 font-bold">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
