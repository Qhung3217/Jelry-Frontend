import { Routes, Route } from 'react-router-dom'
import './App.css'
import ScrollToTop from './Utils/ScrollToTop'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Introduce, InforPrivatePolicy, WarrantyPolicy, DeliveryAndCheckout } from './pages'
import LandingPage from './Components/LandingPage'
import Product from './Components/Product'

function App() {
  return (
    <div className="App">
      <Header/>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<LandingPage/>}></Route>
            <Route path="/collections/:slug" element={<Product/>}></Route>
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
