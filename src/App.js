import { Routes, Route } from 'react-router-dom'
import './App.css'
import ScrollToTop from './Utils/ScrollToTop'
import { Introduce, InforPrivatePolicy, WarrantyPolicy, DeliveryAndCheckout } from './pages'
import Header from './Components/Header'
import Footer from './Components/Footer'
import LandingPage from './Components/LandingPage'
import Product from './Components/Product'
import ProductDetail from './Components/ProductDetail'
import Cart from './Components/Cart'
import Checkout from './Components/Checkout'

function App() {
  return (
    <div className="App">
      <Header/>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<LandingPage/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/checkout" element={<Checkout/>}></Route>
            <Route path="/collections/:slug" element={<Product/>}></Route>
            <Route path="/products/:slug" element={<ProductDetail/>}></Route>
            <Route path="/pages/gioi-thieu" element={<Introduce/>}></Route>
            <Route path="/pages/chinh-sach-bao-mat-thong-tin" element={<InforPrivatePolicy/>}></Route>
            <Route path="/pages/chinh-sach-bao-hanh" element={<WarrantyPolicy/>}></Route>
            <Route path="/pages/thanh-toan-va-giao-hang" element={<DeliveryAndCheckout/>}></Route>
          </Routes>
        </ScrollToTop>
      <Footer/>
    </div>
  );
}

export default App;
