import clsx from 'clsx'
import { useState, useEffect, useContext } from 'react'
import {useParams} from 'react-router-dom'
import { GlobalVariable } from "../GlobalVariable"
import styles from './ProductDetail.module.css'
import {currencyFormat} from '../../Utils/NumberFormat'

function ProductDetail(){
  const [product, setProduct] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [quantityInStock, setQuantityInStock] = useState(0)
  const [chooseSize, setChooseSize] = useState('')
  const [chooseImg, setChooseImg] = useState(0)
  const {arrayProductList, productList, isLoadedProduct, setLocalStorageChange, localStorageChange, headerCartCheckboxRef} = useContext(GlobalVariable)
  const {slug} = useParams()
  const [isSoldOut, setIsSoldOut] = useState(true)

  useEffect(() => {
    if (isLoadedProduct){
      let productIndex = arrayProductList()
      console.log('product index:', productIndex)
      let temp = productList.find( prod => prod['product_id'] === productIndex[slug])
      console.log('temp: ',temp)
      if (temp.size.length > 0){
        setIsSoldOut(!!temp.size.reduce((result, size)=> result += size.pivot['product_size_quantily'],0))
        console.log('isSoldOut: ',isSoldOut)
        let index = temp.size.findIndex(item => item.pivot['product_size_quantily'] > 0)
        if (index !== -1){
          setChooseSize(temp.size[index]['size_name'])
          setQuantityInStock(temp.size[index].pivot['product_size_quantily'])
        }
      }
      setProduct(temp)
    }
  }, [slug, isLoadedProduct])
  console.log('quantity: ',quantity)

  if (!isLoadedProduct || product.length === 0) {
    return(
      <h1>Loading...</h1>
    )
  }else
    return (
      <div className="grid wide">
        <div className="row">
          <div className="col l-6 m-6 s-12">
            <div className={clsx(styles.productDetailThumbGroup)}>
              <div className="row">
                <div className="col l-12 m-12 s-12">
                  <div className={clsx(styles.productDetailMainThumb)}>
                    <img src={product.image[chooseImg]['image_url']} alt="" />
                  </div>
                </div>
              </div>
              <div className={clsx(styles.productDetailSubThumb, 'row')}>
                {product.image.map((image,index) => {
                  return(
                  <div key={image['image_id']} className="col l-3 m-3 s-3">
                    <div 
                      className={clsx(styles.productDetailSubThumbItem, 
                                                {[styles.productDetailThumbActive]: index===chooseImg})
                                }
                      onClick={()=>setChooseImg(index)}
                    >
                      <img src={image['image_url']} alt="" />
                    </div>
                  </div>
                )})}
              </div>
              
              {/* <div className={clsx(styles.productDetailSubThumb)}>
                <img src="/assets/images/LandingPage/home_category_5_banner.jpg" alt="" />
                <img src="/assets/images/LandingPage/home_category_2_banner.jpg" alt="" />
              </div> */}
            </div>
          </div>
          <div className="col l-6 m-6 s-12">
            <div className={clsx(styles.productDetailMain)}>
              <h1 className={clsx(styles.productDetailName)}>{product['product_name']}</h1>
              <span className={clsx(styles.productDetailPrice)}>{isSoldOut ? currencyFormat(product['product_price']) : <p>Hết hàng</p>}</span>
              {isSoldOut && 
              <div className={clsx(styles.productDetailSizeGroup)}>
                {product.size.length > 0 && product.size.map(size => {
                  let isChoosed = false
                  if (chooseSize === size['size_name'])
                    isChoosed = true
                  console.log('chooseSize: ',chooseSize,'size ',size['size_id'],isChoosed)
                  return(
                  <button 
                    key={size['size_id']} 
                    className={clsx(styles.productDetailSize,'btn',{
                      'dark': isChoosed,
                      [styles.noDisplay]: size['size_name']==='None'
                    })}
                    disabled={size.pivot['product_size_quantily'] === 0}
                    onClick={()=>{
                      setQuantityInStock(size.pivot['product_size_quantily'])
                      setChooseSize(size['size_name'])
                      setQuantity(1)
                      console.log('choose size & quantity in stock: ',chooseSize, quantityInStock)
                    }}
                  >
                    {size['size_name']}
                  </button>
                )})}
              </div>}
              {isSoldOut &&
              <div className={clsx(styles.productDetailAction)}>
                <div className={clsx(styles.productDetailQuantityGroup)}>
                  <button 
                    className={clsx(styles.productDetailQuantityBtn,'btn')}
                    onClick={()=>{
                      let newQuantity
                      if (quantity === 1)
                        newQuantity = 1
                      else
                        newQuantity = quantity - 1
                      setQuantity(newQuantity)
                    }}
                  >
                    -
                  </button>
                  <div 
                    className={clsx(styles.productDetailQuantity)}
                  >
                    {quantity}
                  </div>
                  <button 
                    className={clsx(styles.productDetailQuantityBtn,'btn')}
                    onClick={()=>{
                      let newQuantity 
                      if (quantityInStock > quantity){
                        newQuantity = quantity + 1
                        setQuantity(newQuantity)
                      }
                    }}
                  >
                    +
                  </button>
                </div> 
                <div className={clsx(styles.productDetailCheckout)}>
                  <button 
                    className='btn dark'
                    onClick={()=>{
                      let carts = localStorage.getItem('cart')
                      console.log('quantity checkout: ',quantity,carts)
                      if (carts){
                        carts = JSON.parse(carts)
                        var index = carts.findIndex(cart => cart.product.product_id === product.product_id && cart.size === chooseSize)
                        console.log('index: ',index, 'quantity: ', quantity)
                        if (index!==-1)
                          carts[index].quantity += quantity;
                        else
                          carts.push({
                            product,
                            quantity,
                            size: chooseSize
                          })
                        localStorage.setItem('cart', JSON.stringify(carts))
                        setLocalStorageChange(!localStorageChange)
                        headerCartCheckboxRef.current.checked = true
                        window.scrollTo(0, 0)
                        document.querySelector('body').classList.toggle('preventScroll')
                      }
                      else{
                        carts = [{
                          product,
                          quantity,
                          size: chooseSize
                        }]
                        localStorage.setItem('cart', JSON.stringify(carts))
                        setLocalStorageChange(!localStorageChange)
                        headerCartCheckboxRef.current.checked = true
                        window.scrollTo(0, 0)
                        document.querySelector('body').classList.toggle('preventScroll')
                      }
                      // window.location.reload()

                    }}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>}
              <div className={clsx(styles.productDetailDesc)} dangerouslySetInnerHTML={{__html: product['product_desc']}}>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ProductDetail