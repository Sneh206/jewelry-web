import React from "react";

const JewelleryGrid = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
        {/* Left Large Box */}
        <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw3fd145e1/homepage/tanishq-collections/sparkling-desktop.jpg"
            alt="Necklace"
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* Right Side - 2 Equal Height Boxes */}
        <div className="flex flex-col gap-4 h-full">
          {/* Top Right */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwfba22b76/homepage/tanishq-collections/stunning-every-ear.jpg"
              alt="Earrings"
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>

          {/* Bottom Right */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw1eded5b5/homepage/tanishq-collections/dailywear-chains.jpg"
              alt="Chains"
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JewelleryGrid;
