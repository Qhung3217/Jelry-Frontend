import clsx from 'clsx'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import SubNavbar from './SubNavbar'
import { GlobalVariable } from '../GlobalVariable'
// truyen slug and id qua contextData
function Navbar() {
  // const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const {navbarItems, isLoadedNavBar} = useContext(GlobalVariable)
  useEffect(()=>setItems(navbarItems),[isLoadedNavBar])
  
  if (!isLoadedNavBar) {
    return(
      <h1>Loading..</h1>
    )
  }else
    return(
      <ul className={clsx(styles.navbarList)}>
        {items.map(item => (
          <li key={item['material_id']} className={clsx(styles.navbarItem)}>
            <Link to={'/collections/'+item['material_slug']}>
              {item['material_name']}
              {item.category.length > 0 && <i className='bx bx-chevron-down'></i>}
            </Link>
          {item.category.length > 0 && <SubNavbar cates={item.category} prefix={'/collections'}/>}
          </li>
        ))}
        {/* <li className={clsx(styles.navbarItem)}>
          <Link to="/">
            Trang sức bạc
            <i className='bx bx-chevron-down'></i>
          </Link>
          <SubNavbar/>
        </li>
        <li className={clsx(styles.navbarItem)}><Link to="/">Trang sức vàng</Link></li>
        */}
      </ul>
    )
}

export default Navbar