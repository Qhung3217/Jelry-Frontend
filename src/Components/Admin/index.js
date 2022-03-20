import { Routes, Route } from 'react-router-dom'
import ScrollToTop from '../../Utils/ScrollToTop'
import MainPage from './MainPage'
function Admin(){
   return (
      <ScrollToTop>
         <Routes>
            <Route path="/admin" element={<MainPage/>}></Route>
         </Routes>
      </ScrollToTop>
   )
}

export default Admin