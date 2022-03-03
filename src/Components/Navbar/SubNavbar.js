import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

function SubNavbar() {
  return (
    <ul className={clsx(styles.subNavbarList)}>
          <li className={clsx(styles.subNavbarItem)}><Link to="/">Bông tay bạc</Link></li>
          <li className={clsx(styles.subNavbarItem)}><Link to="/">Dây chuyền bạc</Link></li>
    </ul>
  )
}

export default SubNavbar