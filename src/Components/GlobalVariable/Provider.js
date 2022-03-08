import { useState } from "react"
import GlobalVariable from "./Context.js"

function Provider({children}){
  const [navbarItems, setNavbarItems] = useState([])
  const [productList, setProductList] = useState([])
  let url = 'http://jelry.test/api'
  function arrayNavbar(){
    let material = {}
    let category = {}
    navbarItems.forEach(navbarItem => {
      let slug = navbarItem['material_slug']
      let id = navbarItem['material_id']
      material = {
        ...material,
        [slug]: id,
      }
      if (navbarItem.category.length > 0) {
        navbarItem.category.map(cate=> category={...category,[cate['category_slug']]:cate['category_id'],})
      }
    })
    return [material, category]
  }

  function arrayProductList(){
    let productIndex = {}
    productList.forEach(product => {
      let slug = product['product_slug']
      let id = product['product_id']
      // console.log(slug,id)
      productIndex = {
        ...productIndex,
        [slug]: id,
      }
    })
    return productIndex
  }

  const contextData = {
    url,
    navbarItems,
    setNavbarItems,
    productList, 
    setProductList,
    arrayNavbar,
    arrayProductList
  }

  return(
    <GlobalVariable.Provider value={contextData}>
      {children}
    </GlobalVariable.Provider>
  )
}

export default Provider