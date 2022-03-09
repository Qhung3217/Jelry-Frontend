import clsx from 'clsx'
import { useState, useEffect, useContext } from 'react'
import {useParams} from 'react-router-dom'
import { GlobalVariable } from "../GlobalVariable"
import styles from './ProductDetail.module.css'
import {currencyFormat} from '../../Utils/NumberFormat'

function ProductDetail(){
  const [isLoaded, setIsLoaded] = useState(false)
  const [product, setProduct] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [quantityInStock, setQuantityInStock] = useState(0)
  const [chooseSize, setChooseSize] = useState('')
  const [chooseImg, setChooseImg] = useState(0)
  const {arrayProductList, url} = useContext(GlobalVariable)
  const {slug} = useParams()
  useEffect(() => {
    let productIndex = arrayProductList()
    let urlReq = url +'/product/'+ productIndex[slug]
    console.log('product list:', productIndex, slug)
    console.log('urlReq: ', urlReq)
    fetch(urlReq, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res=>res.json())
      .then(data =>{
        // data.size.length > 0 && setChooseSize(data.size[0]['size_id'])
        // data.size.length > 0 && setQuantityInStock(data.size[0].pivot['product_size_quantily'])
        if (data.size.length > 0){
          let index = data.size.findIndex(item => item.pivot['product_size_quantily'] > 0)
          setChooseSize(data.size[index]['size_id'])
          setQuantityInStock(data.size[index].pivot['product_size_quantily'])
        }
        setProduct(data)
        // setChooseImg(data.image[0]['image'])
        console.log('data ',data,chooseSize)
        setIsLoaded(true)

      })
      .catch(err =>{
        console.log(err)
        setIsLoaded(false)
      })
      console.log('product', product)
  }, [isLoaded])
  console.log('quantity: ',quantity)
  if (!isLoaded || product.length === 0) {
    return(
      <h1>Loading...</h1>
    )
  }else
    return (
      <div className="grid wide">
        <div className="row">
          <div className="col l-6">
            <div className={clsx(styles.productDetailThumbGroup)}>
              <div className="row">
                <div className="col l-12">
                  <div className={clsx(styles.productDetailMainThumb)}>
                    <img src={product.image[chooseImg]['image_url']} alt="" />
                  </div>
                </div>
              </div>
              <div className={clsx(styles.productDetailSubThumb, 'row')}>
                {product.image.map((image,index) => {
                  return(
                  <div key={image['image_id']} className="col l-3">
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
          <div className="col l-6">
            <div className={clsx(styles.productDetailMain)}>
              <h1 className={clsx(styles.productDetailName)}>{product['product_name']}</h1>
              <span className={clsx(styles.productDetailPrice)}>{currencyFormat(product['product_price'])}</span>
              <div className={clsx(styles.productDetailSizeGroup)}>
                {product.size.length > 0 && product.size.map(size => {
                  let isChoosed = false
                  if (chooseSize === size['size_id'])
                    isChoosed = true
                  console.log('chooseSize: ',chooseSize,'size ',size['size_id'],isChoosed)
                  return(
                  <button 
                    key={size['size_id']} 
                    className={clsx(styles.productDetailSize,'btn',{'dark': isChoosed})}
                    disabled={size.pivot['product_size_quantily'] === 0}
                    onClick={()=>{
                      setQuantityInStock(size.pivot['product_size_quantily'])
                      setChooseSize(size['size_id'])
                      setQuantity(1)
                      console.log('choose size & quantity in stock: ',chooseSize, quantityInStock)
                    }}
                  >
                    {size['size_name']}
                  </button>
                )})}
              </div>
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
                      if (quantityInStock >= quantity){
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
                      }
                      else{
                        carts = [{
                          product,
                          quantity,
                          size: chooseSize
                        }]
                        localStorage.setItem('cart', JSON.stringify(carts))
                      }
                      // window.location.reload()

                    }}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
              <div className={clsx(styles.productDetailDesc)} dangerouslySetInnerHTML={{__html: product['product_desc']}}>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ProductDetail