import clsx from 'clsx'
import {Link} from 'react-router-dom'
import styles from './Sidebar.module.css'

function Sidebar() {
   return (
      <div className="sidebar">
         <nav className="mt-2">
            <ul
               className="nav nav-pills nav-sidebar flex-column"
            >
               <li className="nav-item">
                  <Link to="#" className="nav-link">
                     <i className="nav-icon fas fa-tachometer-alt"></i>
                     <p>
                        Sản phẩm
                        <i className='bx bx-chevron-left'></i>
                     </p>
                  </Link>
                  <ul className="nav nav-treeview">
                     <li className="nav-item">
                        <Link to="../../index.html" className="nav-link">
                           <i className='bx bx-circle'></i>
                           <p>Quản lý</p>
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link to="../../index2.html" className="nav-link">
                           <i className='bx bx-circle'></i>
                           <p>Thêm sản phẩm</p>
                        </Link>
                     </li>
                     
                  </ul>
               </li>
            </ul>
         </nav>
      </div>
   )
}

export default Sidebar
