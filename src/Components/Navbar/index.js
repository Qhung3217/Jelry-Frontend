import clsx from 'clsx'
// import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import SubNavbar from './SubNavbar'

function Navbar() {
  // const [isLoaded, setIsLoaded] = useState(false);
  return(
    <ul className={clsx(styles.navbarList)}>
      <li className={clsx(styles.navbarItem)}>
        <Link to="/">
          Trang sức bạc
          <i className='bx bx-chevron-down'></i>
        </Link>
        <SubNavbar/>
      </li>
      <li className={clsx(styles.navbarItem)}><Link to="/">Trang sức vàng</Link></li>
      <li className={clsx(styles.navbarItem)}><Link to="/">Đá tự nhiên</Link></li>
      <li className={clsx(styles.navbarItem)}><Link to="/">Goods</Link></li>

    </ul>
  )
}

export default Navbar