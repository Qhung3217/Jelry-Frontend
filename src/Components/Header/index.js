import clsx from 'clsx'
import { Link } from 'react-router-dom'
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
                    <label className={clsx(styles.cartAction)} htmlFor="cartCheckbox">
                      <i className='bx bx-shopping-bag'></i>
                      <span className={clsx(styles.cartCountWrap)} data-count='2'>
                        <span className={clsx(styles.cartCount)} >2</span>
                      </span>
                    </label>
                    <input type="checkbox" id="cartCheckbox" className={clsx(styles.cartCheckbox)} />
                    <div className={clsx(styles.cartDropdown)}>
                      <h3 className={clsx(styles.cartTitle)}>Giỏ hàng</h3>
                      <div className={clsx(styles.cartContent)}>
                        <div className={clsx(styles.cartItem)}>
                          <div className={clsx(styles.cartWrap)}>
                            <div className={clsx(styles.cartImg)}>
                              <Link to="/">
                                <img src="https://product.hstatic.net/1000029102/product/jr373-0_5f72d7f4597645b5982495d07b55c1fb_small.jpg" alt="" />
                              </Link>
                            </div>
                            <div className={clsx(styles.cartInfo)}>
                              <div className={clsx(styles.cartNameAndAction)}>
                                <Link to="/">
                                  <span className={clsx(styles.cartName)}>Nhẫn bạc cặp feather</span>
                                </Link>
                                <span className={clsx(styles.cartActionRemove)}>
                                  <i className='bx bx-x'></i>
                                </span>
                              </div>
                              <div className={clsx(styles.cartSizeAndPrice)}>
                                <span className={clsx(styles.cartSize)}>Nhẫn nam</span>
                                <span className={clsx(styles.cartQuantityXPrice)}>
                                  <span className={clsx(styles.cartQuantity)}>1</span>
                                  x
                                  <span className={clsx(styles.cartPrice)}>320,000đ</span></span>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                        
                        <div className={clsx(styles.cartItem)}>
                          <div className={clsx(styles.cartWrap)}>
                            <div className={clsx(styles.cartImg)}>
                            <Link to="/">
                              <img src="https://product.hstatic.net/1000029102/product/jr373-0_5f72d7f4597645b5982495d07b55c1fb_small.jpg" alt="" />
                            </Link>
                            </div>
                            <div className={clsx(styles.cartInfo)}>
                              <div className={clsx(styles.cartNameAndAction)}>
                              <Link to="/">
                                <span className={clsx(styles.cartName)}>Nhẫn bạc cặp feather</span>
                              </Link>
                              <span className={clsx(styles.cartActionRemove)}>
                                <i className='bx bx-x'></i>
                              </span>
                              </div>
                              <div className={clsx(styles.cartSizeAndPrice)}>
                              <span className={clsx(styles.cartSize)}>Nhẫn nam</span>
                              <span className={clsx(styles.cartQuantityXPrice)}>
                                <span className={clsx(styles.cartQuantity)}>1</span>
                                x
                                <span className={clsx(styles.cartPrice)}>320,000đ</span></span>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                      <div className={clsx(styles.seperate)}></div>
                      <div className={clsx(styles.cartBottom)}>
                        <div className={clsx(styles.cartTotal)}>
                          <span className={clsx(styles.cartTotalTitle)}>Tổng tiền:</span>
                          <span className={clsx(styles.cartTotalPrice)}>1,900,000đ</span>
                        </div>
                        <div className={clsx(styles.cartGroupBtn)}>
                          <button className={clsx("btn dark large")}>Xem giỏ hàng</button>
                          <button className={clsx("btn dark large")}>Thanh toán</button>
                        </div>
                      </div>
                    </div>
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