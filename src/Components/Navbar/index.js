import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import SubNavbar from './SubNavbar'

function Navbar() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const url = 'http://jelry.test/api/material'

  useEffect(() => {
    fetch(url,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setIsLoaded(true)
        setItems(data.data)
      })
  }, [isLoaded])
  // console.log(items);
  if (!isLoaded) {
    return(
      <h1>Loading..</h1>
    )
  }else
    return(
      <ul className={clsx(styles.navbarList)}>
        {items.map(item => (
          <li key={item['material_id']} className={clsx(styles.navbarItem)}>
            <Link to={'/material/'+item['material_slug']}>
              {item['material_name']}
              {item.category.length > 0 && <i className='bx bx-chevron-down'></i>}
            </Link>
          {item.category.length > 0 && <SubNavbar cates={item.category} prefix={'/material/'+item['material_slug']}/>}
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