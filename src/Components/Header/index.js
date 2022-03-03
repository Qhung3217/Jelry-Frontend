import clsx from 'clsx'
import styles from './Header.module.css'
import Navbar from '../Navbar'
import Search from '../Search'

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
                <div className={clsx(styles.headerLogo)}>Jelry</div>
              </div>
              <div className="col l-6">
                <Navbar/>
              </div>
              <div className="col l-3">
                <div className={clsx(styles.headerAction)}>
                  <div className={clsx(styles.headerActionSearch)}>
                    <Search/>
                  </div>
                  <div className={clsx(styles.headerActionCart)}>
                    <div className={clsx(styles.cartAction)}>
                      <i class='bx bx-shopping-bag'></i>
                      <span className={clsx(styles.cartCountWrap)} data-count='2'>
                        <span className={clsx(styles.cartCount)} >2</span>
                      </span>
                    </div>
                    <div className={clsx(styles.cartDropdown)}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header