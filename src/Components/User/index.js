import { Routes, Route } from 'react-router-dom'
import ScrollToTop from '../../Utils/ScrollToTop'
import { Introduce, InforPrivatePolicy, WarrantyPolicy, DeliveryAndCheckout } from '../../pages'
import Header from '../Header'
import Footer from '../Footer'
import LandingPage from '../LandingPage'
import Product from '../Product'
import ProductDetail from '../ProductDetail'
import Cart from '../Cart'
import Checkout from '../Checkout'

function User(){
   return(
   <>
   <Header/>
      <ScrollToTop>
         <Routes>
            <Route exact path="/" element={<LandingPage/>}></Route>
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
   </>
)
}

export default User