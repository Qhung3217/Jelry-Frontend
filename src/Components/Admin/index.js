import { Routes, Route } from 'react-router-dom'
import clsx from 'clsx'
import styles from './MainPage.module.css'
import ScrollToTop from '../../Utils/ScrollToTop'
import Sidebar from './Sidebar'
import {MaterialList, MaterialCreate, MaterialEdit} from './Material'
import {CategoryList, CategoryCreate, CategoryEdit} from './Category'
import {ProductList, ProductCreate, ProductEdit} from './Product'
import LandingPage from './LandingPage'
function Admin(){
   return (
      <div className={clsx(styles.mainPage)}>
         <div className={clsx(styles.sidebar)}>
            <Sidebar/>
         </div>
         <div className={clsx(styles.content)}>
            <ScrollToTop>
               <Routes>
                  <Route path="/admin" element={<LandingPage/>}></Route>
                  <Route path="/admin/material" element={<MaterialList/>}></Route>
                  <Route path="/admin/material/create" element={<MaterialCreate/>}></Route>
                  <Route path="/admin/material/edit/:id" element={<MaterialEdit/>}></Route>
                  <Route path="/admin/category" element={<CategoryList/>}></Route>
                  <Route path="/admin/category/create" element={<CategoryCreate/>}></Route>
                  <Route path="/admin/category/edit/:id" element={<CategoryEdit/>}></Route>
                  <Route path="/admin/product" element={<ProductList/>}></Route>
                  <Route path="/admin/product/create" element={<ProductCreate/>}></Route>
                  <Route path="/admin/product/edit/:id" element={<ProductEdit/>}></Route>
               </Routes>
            </ScrollToTop>
            
         </div>
         
      </div>
      
   )
}

export default Admin