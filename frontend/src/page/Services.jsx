import React from "react";
import { Truck, PiggyBank, Percent, BadgeCheck } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Worldwide Shipping",
      description: "For all Orders Over $100",
    },
    {
      icon: <PiggyBank className="w-8 h-8" />,
      title: "Money Back Guarantee",
      description: "Guarantee With In 30 Days",
    },
    {
      icon: <Percent className="w-8 h-8" />,
      title: "Offers And Discounts",
      description: "Back Returns In 7 Days",
    },
    {
      icon: <BadgeCheck className="w-8 h-8" />,
      title: "Certified Jewelry",
      description: "100% Authentic and Certified",
    },
  ];

  return (
    <div className="bg-white py-8 shadow border-b border-gray-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="transform transition-transform duration-500 hover:rotate-x-6 hover:rotate-y-3 hover:scale-105 perspective-1000 bg-white p-4 rounded-lg shadow-md"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            <div className="mb-2 text-yellow-600">{service.icon}</div>
            <h3 className="font-semibold text-lg">{service.title}</h3>
            <p className="text-gray-500 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
