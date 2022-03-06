import clsx from 'clsx'
import styles from './ProductDetail.module.css'

function ProductDetail(){
  return (
    <div className="grid wide">
      <div className="row">
        <div className="col l-6">
          <div className={clsx(styles.productDetailThumb)}>
            <img src="/assets/images/LandingPage/home_category_5_banner.jpg" alt="" />
          </div>
        </div>
        <div className="col l-6">
          <div className={clsx(styles.productDetailMain)}>
            <h1 className={clsx(styles.productDetailName)}>Nhẫn bạc nam Vintage Feather</h1>
            <span className={clsx(styles.productDetailPrice)}>760,000₫</span>
            <div className={clsx(styles.productDetailSizeGroup)}>
              <button className={clsx(styles.productDetailSize)}>#14</button>
              <button className={clsx(styles.productDetailSize)}>#5</button>
            </div>
            <div className={clsx(styles.productDetailAction)}>
              <div className={clsx(styles.productDetailQuantityGroup)}>
                <button className={clsx(styles.productDetailQuantityBtn)}>-</button>
                <span className={clsx(styles.productDetailQuantity)}>2</span>
                <button className={clsx(styles.productDetailQuantityBtn)}>+</button>
              </div> 
              <div className={clsx(styles.productDetailCheckout)}>
                <button className='btn dark'>Thêm vào giỏ</button>
              </div>
              <div className={clsx(styles.productDetailDesc)}>
                Chất liệu: Bạc nguyên chất 92.5% oxidized.
                Kích thước: nhẫn dày 1.4mm, bản nhẫn 7mm.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail