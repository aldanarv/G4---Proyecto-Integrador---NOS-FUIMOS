import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Home from './Routes/Home';
import Footer from "./Components/Footer";
import Login from './Routes/Login';
import Register from './Routes/Register';
import DetailProduct from './Routes/DetailProduct';
import PoliticasProducto from './Routes/PoliticasProducto';
//import Puntuacion from './Routes/Puntuacion';
import AddProduct from './Routes/AddProduct';
import ListProduct from './Routes/ListProduct';
import UpdateProduct from './Routes/UpdateProduct';
import NotFound from './Routes/NotFound';
import DetailUser from './Routes/DetailUser';
import ListFavoritos from './Routes/ListFavoritos';
import Characteristic from './Routes/Characteristic';
import UpdateCharacteristic from './Routes/UpdateCharacteristic';
import AddCharacteristic from './Routes/AddCharacteristic';
import AddCategory from './Routes/AddCategory';
import ProtectedRoutes from './Routes/ProtectedRoutes';
import ProtectedRoutesBooking from './Routes/ProtectedRoutesBooking';
import ListUser from './Routes/ListUser';
import ListCategory from './Routes/ListCategory';
import ConfirmRegister from './Routes/ConfirmRegister';
import UpdateCategory from './Routes/UpdateCategory';
import AddPuntuacion from './Routes/AddPuntuacion';
import DetailReserva from './Routes/DetailReserva';
import ListHistorial from './Routes/ListHistorial';
import ConfirmReserva from './Routes/ConfirmReserva';
import ButtonWhatsApp from './Components/ButtonWhatsApp';
import { useContextGlobal } from "./Context/global.context";

function App() {
  const { state } = useContextGlobal();

  return (
    <>
      <Header />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/confirmRegister' element={<ConfirmRegister />} />
        <Route path='/product/:id' element={<DetailProduct />} />
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
          <Route path='/administracion/category/updateCategory/:id' element={<UpdateCategory />} />
        </Route>
        <Route element={<ProtectedRoutesBooking />}>
          <Route path='/detailUser' element={<DetailUser />} />
          <Route path='/favorites' element={<ListFavoritos />} />
          {/*<Route path='/product/:id/puntuacion' element={<Puntuacion />} />*/}
          <Route path='/product/:id/detailReserva' element={<DetailReserva />} />
          <Route path='/ConfirmReserva' element={<ConfirmReserva />} />
          <Route path='/history' element={<ListHistorial />} />
          <Route path='/product/:id/addPuntuacion' element={<AddPuntuacion />} />
        </Route>
      </Routes>
      {!state.loged && <ButtonWhatsApp />}
      <Footer />
    </>
  )
}

export default App