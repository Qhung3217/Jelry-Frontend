import clsx from 'clsx'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Parser} from 'html-to-react'
import styles from './Sidebar.module.css'

function Sidebar() {
   const [choose, setChoose] = useState(3)
   const url = window.location.href
   const idx = {
      'change-password': -1,
      'undefined': 0,
      'material': 1,
      'category': 2,
      'product': 3,
      'size': 4,
      'invoice': 5
   }
   useEffect(()=>{
      console.log('url: ', url)
      let temp = url.split('/')[4]
      
      setChoose(idx[temp])
      console.log('sidebar: ',idx[temp],choose,temp)
   }, [url])
   const navs = [
      {
         'name': 'Dashboard',
         'icon': '<i className="bx bxs-dashboard"></i>',
         'path': '/admin'
      },
      {
         'name': 'Material',
         'icon': '<i className="bx bx-hive"></i>',
         'path': '/admin/material'
      },
      {
         'name': 'Category',
         'icon': '<i className="bx bx-category"></i>',
         'path': '/admin/category'
      },
      {
         'name': 'Product',
         'icon': '<i className="fa-solid fa-ring"></i>',
         'path': '/admin/product'
      },
      {
         'name': 'Size',
         'icon': '<i className="fa-solid fa-s"></i>',
         'path': '/admin/size'
      },
      {
         'name': 'Invoice',
         'icon': '<i class="fa-solid fa-file-invoice-dollar"></i>',
         'path': '/admin/invoice'
      },
   ]

   return (
      <div className={clsx(styles.sidebar)}>
         <div className={clsx(styles.adminGroup)}>
            <h3 className={clsx(styles.title)}>Admin</h3>
            <div className={clsx(styles.actionAdmin)}>
               <Link 
                  className={clsx(styles.changePass, styles.hover, {
                     [styles.active]: choose === -1,
                  })}
                  to="/admin/change-password"
               >
                  Change Password
               </Link>
               <div 
                  className={clsx(styles.logout, styles.hover)}
                  onClick={()=>{
                     sessionStorage.clear('token')
                     window.location.href = '/'
                  }}
               >
                  <i className='bx bx-log-out'></i>
                  Logout
               </div>
            </div>
         </div>
         <nav className={clsx(styles.navBox)}>
            <ul
               className={clsx(styles.nav)}
            >
               {navs.map((nav,index) => (
                  <li 
                     key={index} 
                     className={clsx(styles.navItem, {
                        [styles.active]: index === choose ,
                        [styles.mr12]: index === 3 || index === 4,
                     })}
                     onClick={()=> setChoose(index)}
                  >
                     <Link to={nav.path} className={clsx(styles.navLink)}>
                        
                        <p>
                        {nav.icon && Parser().parse(nav.icon)}
                           {nav.name}
                        </p>
                     </Link>
                  </li>
               ))}
               

               
            </ul>
         </nav>
      </div>
   )
}

export default Sidebar
