import { Routes, Route } from 'react-router-dom'
import clsx from 'clsx'
import styles from './MainPage.module.css'
import ScrollToTop from '../../Utils/ScrollToTop'
import {useToken} from '../../hooks'
import Sidebar from './Sidebar'
import {MaterialList, MaterialCreate, MaterialEdit} from './Material'
import {CategoryList, CategoryCreate, CategoryEdit} from './Category'
import {ProductList, ProductCreate, ProductEdit} from './Product'
import {SizeList, SizeCreate, SizeEdit} from './Size'
import {InvoiceList} from './Invoice'
import Dashboard from './Dashboard'
import Login from './Login'
import ChangePassword from './ChangePassword'

function Admin(){
   const {token, setToken} = useToken()
   if (!token)
      return <Login setToken={setToken}/>
   else
      return (
      <div className={clsx(styles.mainPage)}>
         <div className={clsx(styles.sidebar)}>
            <Sidebar/>
         </div>
         <div className={clsx(styles.content)}>
            <ScrollToTop>
               <Routes>
                  <Route path="/admin" element={<Dashboard/>}></Route>
                  <Route path="/admin/change-password" element={<ChangePassword/>}></Route>
                  <Route path="/admin/material" element={<MaterialList/>}></Route>
                  <Route path="/admin/material/create" element={<MaterialCreate/>}></Route>
                  <Route path="/admin/material/edit/:id" element={<MaterialEdit/>}></Route>
                  <Route path="/admin/category" element={<CategoryList/>}></Route>
                  <Route path="/admin/category/create" element={<CategoryCreate/>}></Route>
                  <Route path="/admin/category/edit/:id" element={<CategoryEdit/>}></Route>
                  <Route path="/admin/product" element={<ProductList/>}></Route>
                  <Route path="/admin/product/create" element={<ProductCreate/>}></Route>
                  <Route path="/admin/product/edit/:id" element={<ProductEdit/>}></Route>
                  <Route path="/admin/size" element={<SizeList/>}></Route>
                  <Route path="/admin/size/create" element={<SizeCreate/>}></Route>
                  <Route path="/admin/size/edit/:id" element={<SizeEdit/>}></Route>
                  <Route path="/admin/invoice" element={<InvoiceList/>}></Route>

               </Routes>
            </ScrollToTop>
            
         </div>
         <div className={clsx(styles.nosupport)}>
            <p>Your device is not compatible with this page</p>
            <p>Please use another device to access this page.</p>
         </div>
      </div>
      
   )
}

export default Admin