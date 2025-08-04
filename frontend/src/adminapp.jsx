// adminapp.jsx (Convert to a layout or wrapper if needed)
import React from 'react';
import { Outlet } from 'react-router-dom'; // If using nested routes

const Adminapp = () => {
  return (
    <div>
      {/* You can include admin header/sidebar here */}
      <Outlet /> {/* This will render nested route components */}
    </div>
  );
};

export default Adminapp;
