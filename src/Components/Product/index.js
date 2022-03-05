import clsx from 'clsx'
import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './Product.module.css'
import { GlobalVariable } from '../GlobalVariable'

function Product(){
  const [isLoaded, setIsLoaded] = useState(false)
  const [products, setProducts] = useState([])
  const { navbarItems, arrayNavbar } = useContext(GlobalVariable)
  const {slug} = useParams() 
  
  useEffect(() => {
    const index = arrayNavbar()
    const id = index[slug]
    console.log(id,slug,index)
    const url = 'http://jelry.test/api/material/'+id
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res=>res.json())
      .then(data=> setProducts(data))
    console.log(products)
    
  }, [isLoaded])

  return(
    <div className={clsx(styles.wrap)}>
      <h1 className={clsx(styles.productTitle)}>Trang sức bạc</h1>
      <div className="grid wide">
        <div className="row">

          <div className="col l-3">
            <div className={clsx(styles.productItem)}>
              <Link className={clsx(styles.productThumb)} to="/">
                <img src="https://product.hstatic.net/1000029102/product/je453-2_1_69f5b8aae57e4e83a9e4fd2839929f8a_grande.jpg" alt="" />  
              </Link>
              <div className={clsx(styles.productDetail)}>
                <div className={clsx(styles.productName)}>
                  <Link to="/">Bông tai bạc 6-prongs CZ ball stud</Link>
                </div>
                <span className={clsx(styles.productPrice)}>
                  320,000đ
                </span>
              </div>
            </div>
          </div>

          <div className="col l-3">
            <div className={clsx(styles.productItem)}>
              <Link className={clsx(styles.productThumb)} to="/">
                <img src="https://product.hstatic.net/1000029102/product/je453-2_1_69f5b8aae57e4e83a9e4fd2839929f8a_grande.jpg" alt="" />  
              </Link>
              <div className={clsx(styles.productDetail)}>
                <div className={clsx(styles.productName)}>
                  <Link to="/">Bông tai bạc 6-prongs CZ ball stud</Link>
                </div>
                <span className={clsx(styles.productPrice)}>
                  320,000đ
                </span>
              </div>
            </div>
          </div>
          <div className="col l-3">
            <div className={clsx(styles.productItem)}>
              <Link className={clsx(styles.productThumb)} to="/">
                <img src="https://product.hstatic.net/1000029102/product/je453-2_1_69f5b8aae57e4e83a9e4fd2839929f8a_grande.jpg" alt="" />  
              </Link>
              <div className={clsx(styles.productDetail)}>
                <div className={clsx(styles.productName)}>
                  <Link to="/">Bông tai bạc 6-prongs CZ ball stud</Link>
                </div>
                <span className={clsx(styles.productPrice)}>
                  320,000đ
                </span>
              </div>
            </div>
          </div>
          <div className="col l-3">
            <div className={clsx(styles.productItem)}>
              <Link className={clsx(styles.productThumb)} to="/">
                <img src="https://product.hstatic.net/1000029102/product/je453-2_1_69f5b8aae57e4e83a9e4fd2839929f8a_grande.jpg" alt="" />  
              </Link>
              <div className={clsx(styles.productDetail)}>
                <div className={clsx(styles.productName)}>
                  <Link to="/">Bông tai bạc 6-prongs CZ ball stud</Link>
                </div>
                <span className={clsx(styles.productPrice)}>
                  320,000đ
                </span>
              </div>
            </div>
          </div>
          <div className="col l-3">
            <div className={clsx(styles.productItem)}>
              <Link className={clsx(styles.productThumb)} to="/">
                <img src="https://product.hstatic.net/1000029102/product/je453-2_1_69f5b8aae57e4e83a9e4fd2839929f8a_grande.jpg" alt="" />  
              </Link>
              <div className={clsx(styles.productDetail)}>
                <div className={clsx(styles.productName)}>
                  <Link to="/">Bông tai bạc 6-prongs CZ ball stud</Link>
                </div>
                <span className={clsx(styles.productPrice)}>
                  320,000đ
                </span>
              </div>
            </div>
          </div>

        </div>  
      </div>
    </div>
  )
}

export default Product