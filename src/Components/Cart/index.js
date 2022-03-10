import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from './Cart.module.css'

function Cart(){
  return(
    <div className="grid wide">
      <div className={clsx(styles.cartHeading)}>
        <h1 className={clsx(styles.title)}>Giỏ hàng của bạn</h1>
        <p className={clsx(styles.subTitle)}>Có <span>0 sản phẩm</span></p>
      </div>
      <div className={clsx(styles.cartWrapContent, 'row')}>
        <div className="col l-8">
          <div className={clsx(styles.cartContainer)}>
            <p className={clsx(styles.cartEmpty)}>Giỏ hàng của bạn đang trống</p>
          </div>
        </div>

        <div className="col l-4">
          <div className={clsx(styles.cartSideBoxOrder)}>
            <div className={clsx(styles.cartSideBoxOrderTitle)}>
              <h3>Thông tin đơn hàng</h3>
            </div>
            <div className={clsx(styles.cartSideBoxOrderTotal)}>
              <p>
                Tổng tiền: 
                <span className={clsx(styles.cartSideBoxTotalPrice)}>0đ</span>
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