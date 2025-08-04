// src/admin/pages/DashboardPage.jsx
import React from 'react';
import DashboardLayout from '../layouts/Dashboard';
import ProductTable from '../components/ProductTable.jsx'; // this is your "product" component

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <ProductTable />
    </DashboardLayout>
  );
};

export default DashboardPage;
