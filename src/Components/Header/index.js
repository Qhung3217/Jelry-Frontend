import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import styles from './Header.module.css'
import Navbar from '../Navbar'
import Search from '../Search'
import HeaderActionCart from './HeaderActionCart'

function Header() {
  const checkbox = useRef()
  return (
    <header className="grid">
      <div className="row no-gutters">
        <div className="col l-12 m-12 s-12">
          <div className={clsx(styles.headerTopbar)}>
            <span className={clsx(styles.headerTopbarContent)}>MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG TRÊN 500.000Đ</span>
          </div>
        </div>
      </div>
      <div className="row no-gutters">

        <div className="col l-12 m-12 s-12">
          <div className={clsx(styles.headerMain, 'row no-gutters')}>
            
            <div className="col l-0 m-3 s-3">
              <div className={clsx(styles.mobileNav)}>
                <label 
                  className={clsx(styles.headerMenuLogo)} 
                  htmlFor="checkboxSidebar"
                  onClick={e => {
                    const lb = e.target.closest('.'+styles.headerMenuLogo)
                    if (lb.classList.contains(styles.headerMenuLogoEvent))
                      lb.classList.remove(styles.headerMenuLogoEvent)
                    else
                      lb.classList.add(styles.headerMenuLogoEvent)
                  }}
                >
                  <i className='bx bx-menu'></i>
                </label>
                <input 
                  type="checkbox" 
                  id="checkboxSidebar" 
                  ref={checkbox} 
                  className={clsx(styles.checkboxSidebar)}
                  onChange={(e)=>{
                    console.log(e.target)
                    if (e.target.checked)
                      document.querySelector('body').classList.add('preventScroll')
                    else
                      document.querySelector('body').classList.remove('preventScroll')

                  }}
                  />
                <label 
                    className={clsx(styles.modalMS)} 
                    htmlFor="checkboxSidebar"
                    onClick={e=>{
                      const lb = document.querySelector('.'+styles.headerMenuLogo)
                      if (lb.classList.contains(styles.headerMenuLogoEvent))
                        lb.classList.remove(styles.headerMenuLogoEvent)
                      else
                        lb.classList.add(styles.headerMenuLogoEvent)
                    }}
                ></label>
                <div className={clsx(styles.sidebar)}>
                  <Navbar checkbox={checkbox} classN={{
                    'el': styles.headerMenuLogo,
                    'class': styles.headerMenuLogoEvent
                    }}/>
                </div>
              </div>
            </div>

            <div className="col l-3 m-6 s-6">
              <div className={clsx(styles.headerLogo)}><Link to="/">Jelry</Link></div>
            </div>
            <div className="col l-6 m-0 s-0">
              <Navbar/>
            </div>
            <div className="col l-3  m-3 s-3">
              <div className={clsx(styles.headerAction)}>
                <div className={clsx(styles.headerActionSearch)}>
                  <Search/> {/*Bi du do dropdown cua search va headerActionCart */}
                </div>
                <HeaderActionCart/>
              </div>
            </div>
          </div>
        </div>

        <div className="col l-0 m-12 s-12">
          <Search mobile={true}/>
        </div>
      </div>
    </header>
  )
}

export default Header