import clsx from 'clsx'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import SubNavbar from './SubNavbar'
import { GlobalVariable } from '../GlobalVariable'
// truyen slug and id qua contextData
function Navbar({checkbox, classN}) {
  // const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const {navbarItems, isLoadedNavBar} = useContext(GlobalVariable)
  useEffect(()=>setItems(navbarItems),[isLoadedNavBar])
  
  if (!isLoadedNavBar) {
    return(
      <h1>Loading..</h1>
    )
  }else
    return(
      <ul className={clsx(styles.navbarList)}>
        {items.map(item => (
          <li key={item['material_id']} className={clsx(styles.navbarItem)}>
            <Link to={'/collections/'+item['material_slug']} className={clsx(styles.onlyDisplayInDesktop)}>
              {item['material_name']}
              {item.category.length > 0 && <i className='bx bx-chevron-down'></i>}
            </Link>
            {item.category.length > 0 ?
              <><div 
                className={clsx(styles.noDisplayInDesktop)}
                id={"subNav-"+item['material_id']}
                data-class={styles.activeSubNavbar}
                onClick={e => {
                  const div = document.getElementById("subNav-"+item['material_id'])
                  console.log(div.nextSibling)
                  div.classList.toggle(styles.activeSubNavbar)
                  
                }}
              >
                {item['material_name']}
                <i className='bx bx-chevron-right'></i>
              </div>
              <SubNavbar 
                cates={item.category} 
                prefix={'/collections'} 
                parent={{
                  'slug': item['material_slug'],
                  'name': item['material_name'],
                  'id': "subNav-"+item['material_id'],
                }}
                checkbox={checkbox}
                classN={classN}
              /></>
            :
              <Link 
                to={'/collections/'+item['material_slug']} 
                className={clsx(styles.noDisplayInDesktop)}
                onClick={()=> {
                  document.querySelector('.'+classN.el).classList.remove(classN.class)
                  checkbox.current.checked = false
                  document.querySelector('body').classList.remove('preventScroll')
                }}
              >
                {item['material_name']}
              </Link>
            }
          </li>
        ))}
        {/* <li className={clsx(styles.navbarItem)}>
          <Link to="/">
            Trang sức bạc
            <i className='bx bx-chevron-down'></i>
          </Link>
          <SubNavbar/>
        </li>
        <li className={clsx(styles.navbarItem)}><Link to="/">Trang sức vàng</Link></li>
        */}
      </ul>
    )
}

export default Navbar