import clsx from 'clsx'
import {useState} from 'react'
import styles from './Search.module.css'

function Search({data, setSearchResult, nameKey, reloadFunc}){
   const [searchKey, setSearchKey] = useState()
   // console.log("sdas",data[0][nameKey])
   const handleSearch = () => {
      const list = data.filter(dt => {
         const lowerCase = dt[nameKey].toLocaleLowerCase()
         return lowerCase.includes(searchKey.toLocaleLowerCase())
      })
      setSearchResult(list)
   }
   return(
      <div className={clsx(styles.searchWrap)}>
         <input
            type="text" 
            name="table_search" 
            className={clsx(styles.searchInput)} 
            placeholder="Search"
            onChange={e=>{
               if (e.target.value === ''){
                  reloadFunc()
               }
               setSearchKey(e.target.value)

            }}
            onKeyUp={e => {
               if (e.keyCode === 13)
                  handleSearch()
            }}
         />
         <div className={clsx(styles.searchAction)}>
            <button 
               type="submit" 
               className={clsx(styles.searchSubmit)}
               onClick={handleSearch}
            >
               <i className="fas fa-search"></i>
            </button>
         </div>
            
      </div>
   )
}

export default Search