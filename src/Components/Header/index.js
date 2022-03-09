import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import Navbar from '../Navbar'
import Search from '../Search'
import HeaderActionCart from './HeaderActionCart'

function Header() {
  return (
    <header className="grid">
      <div className="row no-gutters">
        <div className="col l-12">
          <div className={clsx(styles.headerTopbar)}>
            <span className={clsx(styles.headerTopbarContent)}>MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG TRÊN 500.000Đ</span>
          </div>
        </div>
      </div>
      <div className="row no-gutters">
        <div className="col l-12">
          <div className={clsx(styles.headerMain, 'row no-gutters')}>
              <div className="col l-3">
                <div className={clsx(styles.headerLogo)}><Link to="/">Jelry</Link></div>
              </div>
              <div className="col l-6">
                <Navbar/>
              </div>
              <div className="col l-3">
                <div className={clsx(styles.headerAction)}>
                  <div className={clsx(styles.headerActionSearch)}>
                    <Search/>
                  </div>
                  <HeaderActionCart/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header