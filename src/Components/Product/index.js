import clsx from "clsx"
import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import styles from "./Product.module.css"
import {currencyFormat} from '../../Utils/NumberFormat'
import { GlobalVariable } from "../GlobalVariable"

function Product() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const { arrayNavbar, url, setProductList } = useContext(GlobalVariable);
  const { slug } = useParams();

  useEffect(() => {
    const [material, category] = arrayNavbar();
    let urlReq;
    if (material[slug]) {
      urlReq = url + "/material/" + material[slug];
    }
    if (category[slug]) {
      urlReq = url + "/category/" + category[slug];
    }

    console.log(material, category, urlReq);

    fetch(urlReq, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        console.log(data.data[0].image[0]['image_url'])
        setProducts(data.data)
        setProductList(data.data)
        setIsLoaded(true)
      })
      .catch((err) => {
        console.log(err)
        setIsLoaded(false)
      })
  }, [slug])

  if (!isLoaded) return <h1>Loading...</h1>
  else
    return (
      <div className={clsx(styles.wrap)}>
        <h1 className={clsx(styles.productTitle)}>Trang sức bạc</h1>
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
