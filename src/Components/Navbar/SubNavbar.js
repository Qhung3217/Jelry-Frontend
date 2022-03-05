import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

function SubNavbar({ cates, prefix }) {
  return (
    <ul className={clsx(styles.subNavbarList)}>
      {cates && cates.map( cate => (
          <li key={cate['category_id']} className={clsx(styles.subNavbarItem)}><Link to={prefix+'/'+cate['category_slug']}>{cate['category_name']}</Link></li>
      ))}
          {/* <li className={clsx(styles.subNavbarItem)}><Link to="/">Dây chuyền bạc</Link></li> */}
    </ul>
  )
}

export default SubNavbar