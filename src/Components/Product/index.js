import clsx from "clsx"
import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import styles from "./Product.module.css"
import {currencyFormat} from '../../Utils/NumberFormat'
import { GlobalVariable } from "../GlobalVariable"

function Product() {
  const [products, setProducts] = useState([])
  const { arrayNavbar, arrayProductList, productList, isLoadedProduct } = useContext(GlobalVariable)
  const { slug } = useParams()
  const [material, category] = arrayNavbar()
  const productIndex = arrayProductList()

  useEffect(() => {
    if (material[slug]) {
      //?. neu ko co return undefined
      let productShow = []
      material[slug].cate && material[slug].cate.map(cate=>{
        let temp = productList.filter(prod => prod['category_id'] === cate)
        // console.log('product show in map: ',productShow)
        if (productShow.length > 0)
          productShow[0].push(temp)
        else
          productShow.push(temp)
      })
      // console.log(material[slug]?.cate)
      if (productShow.length > 0){
        productShow = productShow[0].flat()
        setProducts(productShow)
      }
      console.log('material product show: ', productShow)
    }
    if (category[slug]) {
      let productShow = productList.filter(prod => prod['category_id'] === category[slug].id)
      console.log('category product show: ',productShow)
      setProducts(productShow)
    }

    console.log(material, category, productIndex)
    console.log(productList)
  }, [slug])

  if (!isLoadedProduct) return <h1>Loading...</h1>
  else
    return (
      <div className={clsx(styles.wrap)}>
        <h1 className={clsx(styles.productTitle)}>{(material[slug] && material[slug].name) || (category[slug] && category[slug].name)}</h1>
        <div className="grid wide">
          <div className="row">
            {products.length > 0 &&
              products.map((product) => (
                <div key={product["product_id"]} className="col l-3">
                  <div className={clsx(styles.productItem)}>
                    <Link className={clsx(styles.productThumb)} to={"/products/" + product["product_slug"]}>
                      {product.image[0] &&
                      <img
                        src={product.image[0]['image_url']}
                        alt=""
                      />}
                    </Link>
                    <div className={clsx(styles.productDetail)}>
                      <div className={clsx(styles.productName)}>
                        <Link to={"/products/" + product["product_slug"]}>
                          {product["product_name"]}
                        </Link>
                      </div>
                      <span className={clsx(styles.productPrice)}>
                        {currencyFormat(product["product_price"])}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
}

export default Product
