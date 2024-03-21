import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Home from './Routes/Home';
import Footer from "./Components/Footer";
import Login from './Routes/Login';
import Register from './Routes/Register';
import DetailProduct from './Routes/DetailProduct';
import GalleryImages from './Routes/GalleryImages';
import Reservar from './Routes/Reservar';
import AddProduct from './Routes/AddProduct';
import ListProduct from './Routes/ListProduct';
import UpdateProduct from './Routes/UpdateProduct';
import NotFound from './Routes/NotFound';
import DetailUser from './Routes/DetailUser';
import Characteristic from './Routes/Characteristic';
import UpdateCharacteristic from './Routes/UpdateCharacteristic';
import AddCharacteristic from './Routes/AddCharacteristic';
import AddCategory from './Routes/AddCategory';
import ProtectedRoutes from './Routes/ProtectedRoutes';
import ProtectedRoutesBooking from './Routes/ProtectedRoutesBooking';
import ListUser from './Routes/ListUser';
import ListCategory from './Routes/ListCategory';
import './App.css'
import PoliticasProducto from './Routes/PoliticasProducto';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product/:id' element={<DetailProduct />} />
        <Route path='/product/:id/gallery' element={<GalleryImages />} />
        <Route path='/politicasProducto' element={<PoliticasProducto />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/administracion' element={<ListProduct />} />
          <Route path='/administracion/addProduct' element={<AddProduct />} />
          <Route path='/administracion/updateProduct/:id' element={<UpdateProduct />} />
          <Route path='/administracion/characteristic' element={<Characteristic />} />
          <Route path='/administracion/characteristic/addCharacteristic' element={<AddCharacteristic />} />
          <Route path='/administracion/characteristic/updateCharacteristic/:id' element={<UpdateCharacteristic />} />
          <Route path='/administracion/users' element={<ListUser />} />
          <Route path='/administracion/category' element={<ListCategory />} />
          <Route path='/administracion/category/addCategory' element={<AddCategory />} />
        </Route>
        <Route element={<ProtectedRoutesBooking />}>
          <Route path='/detailUser' element={<DetailUser />} />
          <Route path='/product/:id/reservar' element={<Reservar />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App