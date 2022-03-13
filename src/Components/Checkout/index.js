import clsx from 'clsx'
import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styles from './Checkout.module.css'
import { currencyFormat } from '../../Utils/NumberFormat'

function Checkout() {
  const [carts, setCarts] = useState([])

  useEffect(()=>{
    let cart = localStorage.getItem('cart')
    if (cart) {
      cart = JSON.parse(cart)
      console.log('Carts: ',cart)
      setCarts(cart)
    }
    
  },[])
  const total = useMemo(()=>{
    if (carts.length > 0) {
      const rlt = carts.reduce((result,cart) => result+= cart.product['product_price']*cart.quantity,0)
      return rlt
    }else
      return 0
  },[carts])

  return(
    <div className="grid wide">
      <h1 className={clsx(styles.titleH1)}>Thanh toán</h1>
      <div className={clsx(styles.rowReverse, "row")}>
        <div className="col l-5">
          <div className={clsx(styles.sidebar)}>
            <h1 className={clsx(styles.titleSideBar)}>Thông tin đơn hàng</h1>
            {carts.map( (cart,index) => (
              <div key={index} className={clsx(styles.cartItem)}>
                <div className={clsx(styles.cartImg)}>
                  <img src={cart.product.image[0]['image_url']} alt={cart.product['product_name']} />
                  <span className={clsx(styles.cartQuantity)}>{cart.quantity}</span>
                </div>
                <div className={clsx(styles.cartInfo)}>
                  <div className={clsx(styles.cartInfoTop)}>
                    <div className={clsx(styles.cartTitle)}>{cart.product['product_name']}</div>
                    <div className={clsx(styles.cartPrice)}>{currencyFormat(cart.product['product_price']*cart.quantity)}</div>
                  </div>
                  <div className={clsx(styles.cartSize)}>
                    {cart.size}
                  </div>
                </div>
              </div>
            ))}
            <div className={clsx(styles.totalGroupWrap)}>
              <div className={clsx(styles.totalGroup)}>
                <div className={clsx(styles.totalName)}>Tạm tính</div>
                <div className={clsx(styles.totalPrice)}>{currencyFormat(total)}</div>
              </div>

              <div className={clsx(styles.totalGroup)}> 
                <div className={clsx(styles.totalName)}>Phí vận chuyển</div>
                <div className={clsx(styles.totalPrice)}>Miễn phí</div>
              </div>
            </div>
            <div className={clsx(styles.totalGroupWrap)}>
              <div className={clsx(styles.totalGroup)}>
                <div className={clsx(styles.totalName)}>Tổng cộng</div>
                <div className={clsx(styles.totalPrice)}><span>VNĐ</span>{currencyFormat(total)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col l-7">
          <div className={clsx(styles.main)}>
            <h1 className={styles.mainTitle}>Thông tin giao hàng</h1>
            <form action="" method="POST" className={clsx(styles.checkoutForm)}>
              <div className={clsx(styles.formGroup)}>
                <label htmlFor="checkout_name" className={clsx(styles.formLabel)}>Họ và tên</label>
                <input type="text" id="checkout_name" name="checkout_name" className={clsx(styles.formInput)}/>
              </div>
              <div className={clsx(styles.formGroup)}>
                <div className={clsx(styles.formGroupWrap)}>
                  <div className={clsx(styles.formGroupEmail)}>
                    <label htmlFor="checkout_email" className={clsx(styles.formLabel)}>Email</label>
                    <input type="text" id="checkout_email" name="checkout_email" className={clsx(styles.formInput)}/>
                  </div>
                  <div className={clsx(styles.formGroupTel)}>
                    <label htmlFor="checkout_tel" className={clsx(styles.formLabel)}>Số điện thoại</label>
                    <input type="text" id="checkout_tel" name="checkout_tel" className={clsx(styles.formInput)}/>
                  </div>
                </div>
              </div>
              <div className={clsx(styles.formGroup)}>
                <label htmlFor="checkout_address" className={clsx(styles.formLabel)}>Địa chỉ</label>
                <input type="text" id="checkout_address" name="checkout_address" className={clsx(styles.formInput)}/>
              </div>

              <div className={clsx(styles.formGroup)}>
                <div className={clsx(styles.formGroupWrap)}>
                  <Link to="/cart">Giỏ hàng</Link>
                  <button type="submit" className={clsx(styles.btnSubmit)}>Hoàn tất đơn hàng</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout