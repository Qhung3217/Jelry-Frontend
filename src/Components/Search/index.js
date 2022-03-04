import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from './Search.module.css'


function Search(){
  return (
    <div className={clsx(styles.searchBox)}>
      <label className={clsx(styles.searchAction)} htmlFor="searchCheckbox">
        <i className='bx bx-search' ></i>
      </label>
      <input type="checkbox" id="searchCheckbox" className={clsx(styles.searchCheckbox)}/>
      <div className={clsx(styles.searchDropdown)}>
        
        <h3 className={clsx(styles.searchTitle)}>Tìm kiếm</h3>

        <div className={clsx(styles.searchInput)}>
          <input type="text" className={clsx(styles.searchInputKey)} placeholder="Tìm kiếm sản phẩm..."/>
          <button className={clsx(styles.searchBtn)}>
            <i className='bx bx-search' ></i>
          </button>
          <div className={clsx(styles.searchSuggestWrap)}>
            <div className={clsx(styles.searchSuggest)}>
              <div className={clsx(styles.searchItem)}>
                <div className={clsx(styles.searchItemInfo)}>
                  <Link to="/">Nhẫn cặp bạc Twisted</Link>
                  <span className={clsx(styles.searchItemPrice)}>260.000đ</span>
                </div>
                <div className={clsx(styles.searchItemThumb)}>
                  <Link to="/">
                    <img src="https://product.hstatic.net/1000029102/product/jr366-0_6f4b184a6ae44a73a3ae6392949f6315_compact.jpg" alt="Nhẫn cặp bạc Twisted" />
                  </Link>
                </div>
              </div>

              <div className={clsx(styles.searchItem)}>
                <div className={clsx(styles.searchItemInfo)}>
                  <Link to="/">Nhẫn cặp bạc Twisted</Link>
                  <span className={clsx(styles.searchItemPrice)}>260.000đ</span>
                </div>
                <div className={clsx(styles.searchItemThumb)}>
                  <img src="https://product.hstatic.net/1000029102/product/jr366-0_6f4b184a6ae44a73a3ae6392949f6315_compact.jpg" alt="Nhẫn cặp bạc Twisted" />
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Search