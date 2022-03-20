import clsx from 'clsx'
import { useState, useRef, useContext, useEffect } from 'react'
import {GlobalVariable} from '../GlobalVariable'
import { currencyFormat } from '../../Utils/NumberFormat'
import { Link } from 'react-router-dom'
import styles from './Search.module.css'


function Search({ mobile = false}){
  const [searchKey, setSearchKey] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const {productList} = useContext(GlobalVariable)
  const activeSearch = useRef(null)
  
  useEffect(()=> {
    const result = productList.filter(prod=>{
      let name = prod['product_name'].toLocaleLowerCase()
      // let name = key.toLocaleLowerCase()
      return name.includes(searchKey.toLocaleLowerCase())
    })
    console.log('result: ', result,'searchKey: ', searchKey)
    setSearchResult(result)
  }, [searchKey])
  
  const handleClickLink = () => {
    setSearchKey('')
    activeSearch.current.checked = false
  }

  return (
    <div className={clsx(styles.searchBox,{
      [styles.displayNone]: mobile === false
    })}>
      <label 
        className={clsx(styles.searchAction, {
          [styles.onlyDisplayInDesktop]: mobile === false,
          [styles.displayNone]: mobile === true
        })} 
        htmlFor="searchCheckbox"
      >
        <i className='bx bx-search' ></i>
      </label>
      <input 
        type="checkbox" 
        id="searchCheckbox" 
        className={clsx(styles.searchCheckbox)}
        ref={activeSearch}
        />
      <label className={clsx(styles.modal, styles.onlyDisplayInDesktop)} htmlFor="searchCheckbox"></label>
      <div className={clsx(styles.searchDropdown)}>
        
        <h3 className={clsx(styles.searchTitle)}>Tìm kiếm</h3>
        <p className={clsx(styles.searchNotice)}>Vui lòng nhập chữ có dấu!</p>
        <div className={clsx(styles.searchInput)}>
          <input 
            type="text"
            value={searchKey}
            onChange={(e)=>{
              setSearchKey(e.target.value)
            }}
            className={clsx(styles.searchInputKey)} 
            placeholder="Tìm kiếm sản phẩm..."
          />
          <button 
            className={clsx(styles.searchBtn)}
            // onClick={handleSearch}
          >
            <i className='bx bx-search' ></i>
          </button>
          <div 
            className={clsx(styles.searchSuggestWrap, {
              [styles.show]: searchResult.length > 0 && searchKey !== ''
            })}
          >
            <div className={clsx(styles.searchSuggest)}>
              {searchResult.length > 0 && searchKey !== '' && searchResult.map((srch, index) => (
                <div key={index} className={clsx(styles.searchItem)}>
                  <div className={clsx(styles.searchItemInfo)}>
                    <Link 
                      to={"/products/"+ srch["product_slug"]}
                      onClick={handleClickLink}
                    >
                      {srch['product_name']}
                    </Link>
                    <span className={clsx(styles.searchItemPrice)}>{currencyFormat(srch['product_price'])}</span>
                  </div>
                  {srch.image.length > 0 && 
                  <div className={clsx(styles.searchItemThumb)}>
                    <Link 
                      to={"/products/" + srch["product_slug"]}
                      onClick={handleClickLink}
                    >
                      <img src={srch.image[0]['image_url']} alt={srch['product_name']} />
                    </Link>
                  </div>}
                </div>
              ))}
              

              {/* <div className={clsx(styles.searchItem)}>
                <div className={clsx(styles.searchItemInfo)}>
                  <Link to="/">Nhẫn cặp bạc Twisted</Link>
                  <span className={clsx(styles.searchItemPrice)}>260.000đ</span>
                </div>
                <div className={clsx(styles.searchItemThumb)}>
                  <img src="https://product.hstatic.net/1000029102/product/jr366-0_6f4b184a6ae44a73a3ae6392949f6315_compact.jpg" alt="Nhẫn cặp bạc Twisted" />
                </div>
              </div> */}
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Search