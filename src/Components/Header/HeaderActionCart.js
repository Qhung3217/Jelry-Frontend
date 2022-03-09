import clsx from 'clsx'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { currencyFormat } from '../../Utils/NumberFormat'
import styles from './Header.module.css'

function HeaderActionCart(){
  const [carts, setCarts] = useState([])
  const checkbox = useRef(null)
  console.log('before: ',carts)
  useEffect(()=>{
    let cart = localStorage.getItem('cart')
    if (cart) {
      cart = JSON.parse(cart)
      console.log('After: ',cart)
      setCarts(cart)
    }
  },[])
  
  // console.log(carts)
  let total = 0
  if (carts.length > 0)
    total = carts.reduce((result, cart) => result+= cart.product['product_price']*cart.quantity, 0)
  const handleDeleteCart = (index)=>{
    let newCarts = [...carts]
    delete newCarts[index]
    console.log('new: ',newCarts)
    setCarts(newCarts)
  }
  const handleClickItem = () => {
    checkbox.current.checked = false
  }
  return(
    <div className={clsx(styles.headerActionCart)}>
      <label className={clsx(styles.cartAction)} htmlFor="cartCheckbox">
        <i className='bx bx-shopping-bag'></i>
        <span className={clsx(styles.cartCountWrap)} data-count={carts.length}>
          <span className={clsx(styles.cartCount)} >{carts.length}</span>
        </span>
      </label>
      <input 
        type="checkbox" 
        id="cartCheckbox" 
        className={clsx(styles.cartCheckbox)} 
        ref={checkbox}
      />
      <div className={clsx(styles.cartDropdown)}>
        <h3 className={clsx(styles.cartTitle)}>Giỏ hàng</h3>
        <div className={clsx(styles.cartContent)}>
          {carts.map((cart,index)=> (
            <div key={index} className={clsx(styles.cartItem)}>
            <div className={clsx(styles.cartWrap)}>
              <div className={clsx(styles.cartImg)}>
                <Link 
                  to={'/products/'+cart.product['product_slug']}
                  onClick={handleClickItem}
                >
                  <img src={cart.product.image[0]['image_url']} alt="" />
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
                  <span className={clsx(styles.cartSize)}>{cart.size}</span>
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
            <span className={clsx(styles.cartTotalTitle)}>Tổng tiền:</span>
            <span className={clsx(styles.cartTotalPrice)}>{currencyFormat(total)}</span>
          </div>
          <div className={clsx(styles.cartGroupBtn)}>
            <button className={clsx("btn dark large")}>Xem giỏ hàng</button>
            <button className={clsx("btn dark large")}>Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderActionCart