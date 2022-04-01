import { useEffect, useContext, useState } from 'react'
import {Helmet} from 'react-helmet-async'
import clsx from 'clsx'
import styles from '../MainPage.module.css'
import Header from '../Header'
import Table from '../Table'
import {GlobalVariable} from '../../GlobalVariable'

function CategoryList(){
   const { url } = useContext(GlobalVariable)
   const [items, setItems] = useState()
   const [isLoaded, setIsLoaded] = useState(true)
   const [reload, setReload] = useState(false)

   useEffect(()=>{
      const urlReq = url + '/material'
      fetch(urlReq, {
         'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
         .then(res => res.json())
         .then(data=>{
            const arr = []
            data.data.forEach(dt => {
               
               if (dt.category.length > 0) {
                  dt.category.forEach(cate => {
                     const temp = {
                        'category_id': cate['category_id'],
                        'category_name': cate['category_name'],
                        'material_name': dt['material_name'],
                        'material_id': dt['material_id']
                     }
                     arr.push(temp)
                  })
               }
            })
            return arr
         })
         .then(result => setItems(result))
         .then(()=>setIsLoaded(false))
         .catch(err=>{
            setIsLoaded(true)
            console.log('Loaded material failed: ' + err.message)
         })
         console.log('item: ',items)
   },[reload])

   const th = [
      {
         'name': 'ID',
         'name_code': 'category_id'
      }, 
      {
         'name': 'Name',
         'name_code': 'category_name'
      },
      {
         'name': 'Material',
         'name_code': 'material_name'
      },
   ]
   const showSearchResult = (result) => {
      setItems(result)
   }
   const handleReload = ()=>{
      setReload(!reload)
   }
   if (isLoaded)
      return (<>
         <Helmet>
               <title>
                  Category Management
               </title>
         </Helmet>
         <h1>Loading...</h1>
      </>)
   else
      return(
         <>
            <Helmet>
               <title>
                  Category Management
               </title>
            </Helmet>
            <div className={clsx(styles.wrap)}>
               <Header title="Category"/>
               <Table
                  th={th}
                  items={items} 
                  title={"Category Table"} 
                  href="/admin/category/create"
                  showSearchResult={showSearchResult}
                  nameKey="category_name"
                  reloadCallback={handleReload}
                  urlAPI={url}
                  APIName="category"
                  tableEditName='category'
               />

            </div>
         </>
      )
}

export default CategoryList