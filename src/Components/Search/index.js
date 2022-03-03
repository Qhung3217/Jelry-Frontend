import clsx from 'clsx'
import styles from './Search.module.css'

function Search(){
  return (
    <div className={clsx(styles.searchBox)}>
      <label className={clsx(styles.searchAction)} htmlFor="searchCheckbox">
        <i class='bx bx-search' ></i>
      </label>
      <input type="checkbox" id="searchCheckbox" className={clsx(styles.searchCheckbox)}/>
      <div className={clsx(styles.searchDropdown)}>
        <h3 className={clsx(styles.searchTitle)}>Tìm kiếm</h3>
        <div className={clsx(styles.searchInput)}>
          <input type="text" className={clsx(styles.searchInputKey)} placeholder="Tìm kiếm sản phẩm..."/>
          <button className={clsx(styles.searchBtn)}>
            <i class='bx bx-search' ></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Search