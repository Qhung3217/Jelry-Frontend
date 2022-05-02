import clsx from 'clsx'
import { useState, useEffect, useContext } from 'react'
import {Helmet} from 'react-helmet-async'
import { Link } from 'react-router-dom'
import styles from './Cart.module.css'
import {currencyFormat} from '../../Utils/NumberFormat'
import { GlobalVariable } from '../GlobalVariable'

function Cart(){
  const [carts, setCarts] = useState([])
  const [isLoadedCart, setIsLoadedCart] = useState(false)
  const {quantityList, setLocalStorageChange, localStorageChange, url} = useContext(GlobalVariable)
  const prefix = url.slice(0,url.lastIndexOf('/api'))
  let total = 0
  if (carts.length > 0){
    total = carts.reduce((result,cart) => result += cart.product['product_price']*cart.quantity,0)
  }
  useEffect(()=>{
    let cart = localStorage.getItem('cart')
    if (cart){
      cart = JSON.parse(cart)
      setCarts(cart)
      setIsLoadedCart(true)
    }
  },[])

  const setLocalStorage = (value) => localStorage.setItem('cart', JSON.stringify(value))

  const handleIncrease = (e,index) => {
    const cart = carts[index]
    const maxQuantity = quantityList[cart.product['product_id']].size[cart.size] 
    console.log('max quantity: ', maxQuantity)
    if (maxQuantity > cart.quantity){
      let quantityTemp = [...carts]
      quantityTemp[index].quantity += 1
      console.log('quantity temp: ', quantityTemp)
      setLocalStorage(quantityTemp)
      setCarts(quantityTemp)
      setLocalStorageChange(!localStorageChange)

    }
  }

  const handleDecrease = (e,index) => {
    const cart = carts[index]
    if (cart.quantity > 1){
      let quantityTemp = [...carts]
      quantityTemp[index].quantity -= 1
      console.log('quantity temp: ', quantityTemp)
      setLocalStorage(quantityTemp)
      setCarts(quantityTemp)
      setLocalStorageChange(!localStorageChange)

    }
  }

  const handleRemove = index => {
    let newCarts = [...carts]
    newCarts.splice(index,1)
    console.log('new: ',newCarts)
    localStorage.setItem('cart', JSON.stringify(newCarts))
    setCarts(newCarts)
    setLocalStorageChange(!localStorageChange)
  }

  let countProd = 0
  if (carts.length > 0)
    countProd = carts.reduce((result,cart) => result += cart.quantity,0)

  
  return(
    <div className="grid wide">
      <Helmet>
          <title>
            Jelry - Your Cart
          </title>
      </Helmet>
      <div className={clsx(styles.cartHeading)}>
        <h1 className={clsx(styles.title)}>Giỏ hàng của bạn</h1>
        <p className={clsx(styles.subTitle)}>Có <span>{countProd} sản phẩm</span></p>
      </div>
      <div className={clsx(styles.cartWrapContent, 'row')}>
        <div className="col l-8 m-12 s-12">
          <div className={clsx(styles.cartContainer)}>
            {carts.length === 0 ? 
              <p className={clsx(styles.cartEmpty)}>Giỏ hàng của bạn đang trống</p>
              : 
              carts.map((cart,index) => (
                <div key={index} className={clsx(styles.cartItem)}>
                  <div className={clsx(styles.cartImage)}>
                    {cart.product.image.length > 0 && <img src={prefix + '/' + cart.product.image[0]['image_url']} alt={cart.product['product_name']} />}
                  </div>
                  <div className={clsx(styles.cartInfo)}>
                    <div className={clsx(styles.cartTitleAndAction)}>
                      <div className={clsx(styles.cartTitle)}>
                        <h3>{cart.product['product_name']}</h3>
                      </div>
                      <div className={clsx(styles.cartActionRemove)}>
                        <span
                          onClick={()=> handleRemove(index)}
                        >
                          Xóa
                        </span>
                      </div>
                    </div>
                    <div className={clsx(styles.cartPrice)}>
                      {currencyFormat(cart.product['product_price'])}
                    </div>
                    <div className={clsx(styles.cartSize)}>
                      {cart.size !== 'None' && cart.size}
                    </div>
                    <div className={clsx(styles.cartInfoBottom)}>
                      <div className={clsx(styles.cartQuantityGroup)}>
                        <span 
                          className={clsx(styles.cartAction,{
                            [styles.hidden]: cart.quantity === 1
                          })}
                          onClick={e => handleDecrease(e,index)}
                        >
                          -
                        </span>
                        <span 
                          className={clsx(styles.cartQuantity)}
                        >
                          {cart.quantity}
                        </span>
                        <span 
                          className={clsx(styles.cartAction,{
                            [styles.hidden]: cart.quantity === quantityList[carts[index].product['product_id']].size[carts[index].size] 
                          })}
                          onClick={(e)=>{
                            handleIncrease(e,index)
                          }}
                        >
                          +
                        </span>
                      </div>
                      <div className={clsx(styles.cartTotal)}>
                        {currencyFormat(cart.quantity*cart.product['product_price'])}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className="col l-4 m-12 s-12">
          <div className={clsx(styles.cartSideBoxOrder)}>
            
            <div className={clsx(styles.cartSideBoxOrderTitle)}>
              <h3>Thông tin đơn hàng</h3>
            </div>
            <div className={clsx(styles.cartSideBoxOrderTotal)}>
              <p>
                Tổng tiền: 
                <span className={clsx(styles.cartSideBoxTotalPrice)}>{currencyFormat(total)}</span>
              </p>
            </div>
            <div className={clsx(styles.cartSideBoxText)}>
              <p>
                Phí vận chuyển sẽ được tính ở trang thanh toán.
                <br/>
                Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
              </p>
            </div>

            <div className={clsx(styles.cartSideBoxAction)}>
              <Link to="/checkout" className={clsx('btn', styles.actionCheckout)}>Thanh toán</Link>
              <div className={clsx(styles.actionRedirect)}>
                <Link to="/">
                  <i className='bx bx-reply'></i>
                  <span className={clsx(styles.spanText)}>Tiếp tục mua hàng</span>
                </Link>
              </div>
            </div>

          </div>
          
        </div>  

      </div>
    </div>
  )
}

export default Cart