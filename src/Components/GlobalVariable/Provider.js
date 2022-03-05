import { useState } from "react"
import GlobalVariable from "./Context.js"

function Provider({children}){
  const [navbarItems, setNavbarItems] = useState([])

  function arrayNavbar(){
    let result = {}
    navbarItems.forEach(navbarItem => {
      let slug = navbarItem['material_slug']
      let id = navbarItem['material_id']
      // result.push ({
      //   [slug]: id,
      // })
      result = {
        ...result,
        [slug]: id,
      }
      if (navbarItem.category.length > 0) {
        navbarItem.category.map(cate=> result={...result,[cate['category_slug']]:cate['category_id'],})
      }
    })
    return result
  }

  const contextData = {
    navbarItems,
    setNavbarItems,
    arrayNavbar
  }

  return(
    <GlobalVariable.Provider value={contextData}>
      {children}
    </GlobalVariable.Provider>
  )
}

export default Provider