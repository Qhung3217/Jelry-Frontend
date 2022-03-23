import { Routes, Route } from 'react-router-dom'
import clsx from 'clsx'
import styles from './MainPage.module.css'
import ScrollToTop from '../../Utils/ScrollToTop'
import Sidebar from './Sidebar'
import {MaterialList, MaterialCreate, MaterialEdit} from './Material'
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

               </Routes>
            </ScrollToTop>
            
         </div>
         
      </div>
      
   )
}

export default Admin