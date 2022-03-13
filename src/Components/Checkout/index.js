import clsx from 'clsx'
import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styles from './Checkout.module.css'
import { currencyFormat } from '../../Utils/NumberFormat'
import {handleSubmit} from './Functions'
import {validateEmail, validatePhone} from '../../Utils/Regex'

function Checkout() {
  const [carts, setCarts] = useState([])
  const [isNameEmpty, setIsNameEmpty] = useState(false)
  const [isEmailEmpty, setIsEmailEmpty] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isTelsEmpty, setIsTelsEmpty] = useState(false)
  const [isTelsValid, setIsTelsValid] = useState(true)
  const [isAddressEmpty, setIsAddressEmpty] = useState(false)
  const [userInfo, setUserInfo] = useState({
    'customer_name': '',
    'customer_email': '',
    'customer_tel': '',
    'customer_address': '',
    'total': ''
  })
  const allValid = {
    'name': isNameEmpty,
    'email': !!isEmailValid && isEmailEmpty,
    'tels': !!isTelsValid && isTelsEmpty,
    'address': isAddressEmpty
  }
  useEffect(()=>{
    let cart = localStorage.getItem('cart')
    if (cart) {
      cart = JSON.parse(cart)
      console.log('Carts: ',cart)
      setCarts(cart)
    }
  },[])

  const total = useMemo(()=>{
    let rlt
    if (carts.length > 0) {
      rlt = carts.reduce((result,cart) => result+= cart.product['product_price']*cart.quantity,0)
      console.log('rlt: ',rlt)
    }else
      rlt = 0
    setUserInfo({...userInfo, 'total': rlt})
    return rlt
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
            <div className={clsx(styles.checkoutForm)}>
              <div className={clsx(styles.formGroup)}>
                <label htmlFor="checkout_name" className={clsx(styles.formLabel)}>Họ và tên</label>
                <input 
                  type="text" 
                  id="checkout_name" 
                  name="checkout_name" 
                  className={clsx(styles.formInput,{
                    [styles.inputAlert]: isNameEmpty
                  })}
                  value={userInfo.customer_name}
                  onChange={e=>{
                    setUserInfo({...userInfo, 'customer_name': e.target.value})
                    setIsNameEmpty(false)
                  }}
                  onBlur={(e)=> e.target.value === '' && setIsNameEmpty(true)}
                />
                <div className={clsx(styles.alert)}>
                  {isNameEmpty && <p>Vui lòng nhập họ và tên</p>}
                </div>
              </div>
              <div className={clsx(styles.formGroup)}>
                <div className={clsx(styles.formGroupWrap)}>
                  <div className={clsx(styles.formGroupEmail)}>
                    <label htmlFor="checkout_email" className={clsx(styles.formLabel)}>Email</label>
                    <input 
                      type="text" 
                      id="checkout_email" 
                      name="checkout_email" 
                      className={clsx(styles.formInput,{
                        [styles.inputAlert]: isEmailEmpty||!isEmailValid
                      })}
                      value={userInfo.customer_email}
                      onChange={e=>{
                        setUserInfo({...userInfo, 'customer_email': e.target.value})
                        setIsEmailValid(true)
                        setIsEmailEmpty(false)
                      }}
                      onBlur={(e)=> {
                        e.target.value !== '' && setIsEmailValid(validateEmail(e.target.value))
                        e.target.value === '' && setIsEmailEmpty(true)
                      }}
                    />
                    <div className={clsx(styles.alert)}>
                      {isEmailEmpty && <p>Vui lòng nhập email</p>}
                      {!isEmailValid && <p>Email không hợp lệ</p>}
                    </div>
                  </div>
                  <div className={clsx(styles.formGroupTel)}>
                    <label htmlFor="checkout_tel" className={clsx(styles.formLabel)}>Số điện thoại</label>
                    <input 
                      type="text" 
                      id="checkout_tel" 
                      name="checkout_tel" 
                      className={clsx(styles.formInput, {
                        [styles.inputAlert]: isTelsEmpty || !isTelsValid
                      })}
                      value={userInfo.customer_tel}
                      onChange={e=>{
                        setUserInfo({...userInfo, 'customer_tel': e.target.value})
                        setIsTelsEmpty(false)
                        setIsTelsValid(true)
                      }}
                      onBlur={e=>{
                        e.target.value === '' && setIsTelsEmpty(true)
                        e.target.value !== '' && setIsTelsValid(validatePhone(e.target.value))
                      }}
                    />
                    <div className={clsx(styles.alert)}>
                      {isTelsEmpty && <p>Vui lòng nhập số điện thoại</p>}
                      {!isTelsValid && <p>Số điện thoại không hợp lệ</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className={clsx(styles.formGroup)}>
                <label htmlFor="checkout_address" className={clsx(styles.formLabel)}>Địa chỉ</label>
                <input 
                  type="text" 
                  id="checkout_address" 
                  name="checkout_address" 
                  className={clsx(styles.formInput, {
                    [styles.inputAlert]: isAddressEmpty
                  })}
                  value={userInfo.customer_address}
                  onChange={e=>{
                    setUserInfo({...userInfo, 'customer_address': e.target.value})
                    setIsAddressEmpty(false)
                  }}
                  onBlur={e=>e.target.value === '' && setIsAddressEmpty(true)}
                />
                <div className={clsx(styles.alert)}>
                  {isAddressEmpty && <p>Vui lòng nhập địa chỉ</p>}
                </div>
              </div>

              <div className={clsx(styles.formGroup)}>
                <div className={clsx(styles.formGroupWrap)}>
                  <Link to="/cart">Giỏ hàng</Link>
                  <button 
                    className={clsx(styles.btnSubmit)}
                    onClick={()=>{
                      handleSubmit(userInfo, carts, allValid)
                    }}
                  >
                    Hoàn tất đơn hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout