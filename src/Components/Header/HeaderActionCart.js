import clsx from 'clsx'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { currencyFormat } from '../../Utils/NumberFormat'
import styles from './Header.module.css'
import {GlobalVariable} from '../GlobalVariable'

function HeaderActionCart(){
  const [carts, setCarts] = useState([])
  // const checkbox = useRef(null)
  const {localStorageChange, headerCartCheckboxRef, url} = useContext(GlobalVariable)
  const prefix = url.slice(0,url.lastIndexOf('/api'))
  console.log('before: ',carts)
  useEffect(()=>{
    let cart = localStorage.getItem('cart')
    if (cart) {
      cart = JSON.parse(cart)
      console.log('After: ',cart)
      setCarts(cart)
    }
  },[localStorageChange])
  
  // console.log(carts)
  let total = 0
  if (carts.length > 0)
    total = carts.reduce((result, cart) => result+= cart.product['product_price']*cart.quantity, 0)
  const handleDeleteCart = (index)=>{
    let newCarts = [...carts]
    newCarts.splice(index,1)
    console.log('new: ',newCarts)
    localStorage.setItem('cart', JSON.stringify(newCarts))
    setCarts(newCarts)
  }
  const handleClickItem = () => {
    headerCartCheckboxRef.current.checked = false
    const labelActiveCartDropDown = document.querySelector('#label')
    const body = document.querySelector('body')
    console.log(labelActiveCartDropDown)
    if (labelActiveCartDropDown) {
      labelActiveCartDropDown.classList.toggle(labelActiveCartDropDown.dataset.class)
    }
    body.classList.toggle('preventScroll')
  }
  // const handleClickOutside = e => {
  //   if (!e.target.closet('.'+styles.cartDropdown))
  //     handleClickItem()
  // }
  return(
    <div className={clsx(styles.headerActionCart)}>
      <label 
        className={clsx(styles.cartAction, styles.cartClose)} 
        htmlFor="cartCheckbox" 
        id="label"
        data-class={styles.cartClose}
      >
        <i className='bx bx-shopping-bag'></i>
        <span className={clsx(styles.cartCountWrap)} data-count={carts.length}>
          <span className={clsx(styles.cartCount)} >{carts.length}</span>
        </span>
      </label>
      <input 
        type="checkbox" 
        id="cartCheckbox" 
        className={clsx(styles.cartCheckbox)} 
        ref={headerCartCheckboxRef}
        onChange={e=>{
          const label = document.getElementById('label')
          if (e.target.checked === false){
            label.classList.add(styles.cartClose)
            document.querySelector('body').classList.remove('preventScroll')

          }
          else{
            label.classList.remove(styles.cartClose)
            document.querySelector('body').classList.add('preventScroll')
          }
        }}
      />
      <label className={clsx(styles.modal)} htmlFor="cartCheckbox" id="modalActiveCartDropDown"></label>
      <div className={clsx(styles.cartDropdown)}>
        <h3 className={clsx(styles.cartTitle)}>Gi??? h??ng</h3>
        <div className={clsx(styles.cartContent)}>
          {carts.length === 0 ? 
            (
              <div className={clsx(styles.cartNothing)}>
                <i className='bx bx-cart'></i>
                <div className={clsx(styles.cartNothingText)}>Hi???n ch??a c?? s???n ph???m</div>
              </div>
            ) 
          : 
            carts.map((cart,index)=> (
              <div key={index} className={clsx(styles.cartItem)}>
              <div className={clsx(styles.cartWrap)}>
                <div className={clsx(styles.cartImg)}>
                  <Link 
                    to={'/products/'+cart.product['product_slug']}
                    onClick={handleClickItem}
                  >
                    <img src={prefix + '/' + cart.product.image[0]['image_url']} alt="" />
                  </Link>
                </div>
                <div className={clsx(styles.cartInfo)}>
                  <div className={clsx(styles.cartNameAndAction)}>
                    <Link 
                      to={'/products/'+cart.product['product_slug']}
                      onClick={handleClickItem}
                    >
                      <span className={clsx(styles.cartName)}>{cart.product['product_name']}</span>
                    </Link>
                    <span 
                      className={clsx(styles.cartActionRemove)}
                      onClick={()=>handleDeleteCart(index)}
                    >
                      <i className='bx bx-x'></i>
                    </span>
                  </div>
                  <div className={clsx(styles.cartSizeAndPrice)}>
                    <span className={clsx(styles.cartSize)}>{cart.size !== 'None' && cart.size}</span>
                    <span className={clsx(styles.cartQuantityXPrice)}>
                      <span className={clsx(styles.cartQuantity)}>{cart.quantity}</span>
                      x
                      <span className={clsx(styles.cartPrice)}>{currencyFormat(cart.product['product_price'])}</span>
                    </span>
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
        <div className={clsx(styles.seperate)}></div>
        <div className={clsx(styles.cartBottom)}>
          <div className={clsx(styles.cartTotal)}>
            <span className={clsx(styles.cartTotalTitle)}>T???ng ti???n:</span>
            <span className={clsx(styles.cartTotalPrice)}>{currencyFormat(total)}</span>
          </div>
          <div className={clsx(styles.cartGroupBtn)}>
            <Link 
              to="/cart" 
              className={clsx("btn dark large")}
              onClick={handleClickItem}
            >
              Xem gi??? h??ng
            </Link>
            <Link 
              to="/checkout" 
              className={clsx("btn dark large")}
              onClick={handleClickItem}
            >
              Thanh to??n
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default HeaderActionCart