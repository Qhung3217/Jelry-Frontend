import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

function SubNavbar({ cates, prefix, parent }) {
  return (
    <ul className={clsx(styles.subNavbarList)}>
      <li className={clsx(styles.subNavbarItem, styles.noDisplayInDesktopBlock)}>
        <div
          className={styles.subNavbarReturn}
          onClick={e => {
            console.log(e.target.closest('.'+styles.subNavbarList).previousSibling)
            e.target.closest('.'+styles.subNavbarList).previousSibling.classList.remove(styles.activeSubNavbar)}}
        >
            <i className='bx bx-chevron-left'></i>
            <span>Quay về</span>
        </div>
      </li>
      <li className={clsx(styles.subNavbarItem, styles.noDisplayInDesktop, styles.subNavbarViewAll)}>
        <Link to={prefix + '/' + parent.slug}>
            Xem tất cả "{parent.name}"
        </Link>
      </li>
      {cates && cates.map( cate => (
          <li key={cate['category_id']} className={clsx(styles.subNavbarItem)}>
            <Link to={prefix+'/'+cate['category_slug']}>
              <span className={clsx(styles.noDisplayInDesktop)}>-</span> {cate['category_name']}
            </Link>
          </li>
      ))}
          {/* <li className={clsx(styles.subNavbarItem)}><Link to="/">Dây chuyền bạc</Link></li> */}
    </ul>
  )
}

export default SubNavbar