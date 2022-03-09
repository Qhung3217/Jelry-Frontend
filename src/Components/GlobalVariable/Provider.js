import { useState, useEffect } from "react"
import GlobalVariable from "./Context.js"

function Provider({children}){
  const [navbarItems, setNavbarItems] = useState([])
  const [productList, setProductList] = useState([])
  const [isLoadedNavBar, setIsLoadedNavBar] = useState(false)
  const [isLoadedProduct, setIsLoadedProduct] = useState(false)
  let url = 'http://jelry.test/api'

  useEffect(() => {
    let navbarUrl = url + '/material'
    fetch(navbarUrl,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setNavbarItems(data.data)
      })
      .then(()=>setIsLoadedNavBar(true))
      console.log('navlist: ',navbarItems,'loaded: ', isLoadedNavBar)
  }, [isLoadedNavBar])

  useEffect(() => {
    let productUrl = url +'/product'
    fetch(productUrl,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setProductList(data.data)
      })
      .then(()=>setIsLoadedProduct(true))
      console.log('product: ',productList,'loaded: ', isLoadedProduct)
  }, [isLoadedProduct])

  function arrayNavbar(){
    let material = {}
    let category = {}
    navbarItems.forEach(navbarItem => {
      let slug = navbarItem['material_slug']
      let id = navbarItem['material_id']
      material = {
        ...material,
        [slug]: {
          id,
          'name': navbarItem['material_name']
        }
      }
      if (navbarItem.category.length > 0) {
        let arrCate = []
        navbarItem.category.map(cate=> {
          category={
            ...category,
            [cate['category_slug']]:{
              'id': cate['category_id'],
              'name': cate['category_name']
              }
          }
          arrCate.push(cate['category_id'])
          // material = {
          //   ...material,
          //   [slug]: {
          //     'id': id,
          //     'cate':{
          //       ...material[slug].cate,
          //       [cate['category_slug']]:cate['category_id']
          //     }
          //   }
          // }
        })
        material = {
            ...material,
            [slug]: {
              ...material[slug],
              'cate': arrCate
            }
          }
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
    navbarItems,
    setNavbarItems,
    productList, 
    setProductList,
    isLoadedNavBar,
    isLoadedProduct,
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