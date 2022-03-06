import { useState } from "react"
import GlobalVariable from "./Context.js"

function Provider({children}){
  const [navbarItems, setNavbarItems] = useState([])
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

  const contextData = {
    url,
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