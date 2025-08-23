import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home.jsx';
import Register from './page/register.jsx';
import Login from './page/login.jsx';
import Header from './page/Header.jsx';
import OrderCompleted from "./components/OrderCompleted .jsx"

// Admin pages
import Adminapp from './adminapp.jsx';
import AdminLogin from './admin/page/login.jsx';
import AdminRegister from './admin/page/register.jsx';
import Dashboard from './admin/page/dashboard.jsx';
import Producttable from './admin/components/ProductTable.jsx';
import ProductForm from './admin/components/ProductTable.jsx';
import EditProduct from './admin/components/editpage.jsx';
import Order from './admin/components/order.jsx';
import Editorder from './admin/components/editorder.jsx';
import UserTable from './admin/components/user.jsx';
import Settings from './admin/components/setting.jsx';
import Savechanges from './admin/components/savechanges.jsx';
import Deleteadmin from './admin/components/deleteadmin.jsx';
import ChangePassword from './admin/components/changepassword.jsx';
import AdminDashboard from './admin/page/AdminDashboard.jsx';
import LatestProductshow from './admin/components/LatestProductshow.jsx';
import Footer from "./page/Footer.jsx"
import Categories from "./components/categories.jsx"
import AdminContactUs from './admin/components/AdminContactUs.jsx';
import ContactUs from './components/ContactUs.jsx';
import Products from './components/product.jsx';
import Bracelets from './components/Bracelets.jsx';
import OrderPage from './components/OrderPage .jsx';
import OrderForm from './components/OrderForm.jsx';
import ContactUsData from "./admin/components/ContactUsData.jsx"
import Cart from './components/Cart.jsx'
import CompledUserItem from './admin/components/compledUserItem.jsx';



function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public routes with Header */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/Categories"
          element={
            <>
              <Header />
              <Categories />
              <Footer />
            </>
          }
        />

        <Route
          path="/Cart"
          element={
            <>
              <Header />
              <Cart />
              <Footer />
            </>
          }
        />

        <Route
          path="/ContactUs"
          element={
            <>
              <Header />
              <ContactUs />
              <Footer />
            </>
          }
        />
         <Route path="/Order-Completed"
          element={
            <><Header />
              <OrderCompleted />
              <Footer />
            </>} />
        <Route path="/order-form/:productId"
          element={
            <><Header />
              <OrderForm />
              <Footer />
            </>} />
        <Route
          path="/OrderPage/:productId"
          element={
            <>
              <Header />
              <OrderPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/Bracelets"
          element={
            <>
              <Header />
              <Bracelets />
              <Footer />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Header />
              <Products />
              <Footer />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />


        {/* Admin Panel (without Header) */}
        <Route path="/adminapp" element={<Adminapp />}>
          <Route path="adminlogin" element={<AdminLogin />} />
          <Route path="adminregister" element={<AdminRegister />} />
          <Route path="admin" element={<Dashboard />} />
          <Route path="producttable" element={<Producttable />} />
          <Route path="products" element={<ProductForm />} />
          <Route path="editproduct/:id" element={<EditProduct />} />
          <Route path="order" element={<Order />} />
          <Route path="order/editorder/:id" element={<Editorder />} />
          <Route path="user" element={<UserTable />} />
          <Route path="setting" element={<Settings />} />
          <Route path="savepassaword" element={<Savechanges />} />
          <Route path="deleteadmin" element={<Deleteadmin />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="AdminDashboard" element={<AdminDashboard />} />
          <Route path='LatestProductshow' element={<LatestProductshow />} />
          <Route path='AdminContactUs' element={<AdminContactUs />} />
          <Route path='ContactUsData' element={<ContactUsData />} />
          <Route path='CompledUserItem' element={<CompledUserItem/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

   
    </>
  );
}

export default App;

