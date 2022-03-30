import { useEffect, useContext, useState } from 'react'
import clsx from 'clsx'
import styles from '../MainPage.module.css'
import Header from '../Header'
import Table from '../Table'
import {GlobalVariable} from '../../GlobalVariable'

function ProductList(){
   const { url } = useContext(GlobalVariable)
   const [items, setItems] = useState()
   const [isLoaded, setIsLoaded] = useState(true)
   const [reload, setReload] = useState(false)
   const [imgs, setImgs] = useState({})
   useEffect(()=>{
      const urlReq = url + '/product'
      fetch(urlReq, {
         'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
         .then(res => res.json())
         .then(data=>{
            setItems(data.data)
            console.log(data)
         })
         .then(()=>setIsLoaded(false))
         .catch(err=>{
            setIsLoaded(true)
            console.log('Loaded product failed: ' + err.message)
         })
            
   },[reload])
   useEffect(()=> {
      console.log(items)
      let obj = {}
      items && items.forEach(item => {
         if (item.image.length > 0){
            let temp =[]
            item.image.forEach(img => temp.push('http://jelry.test/'+img['image_url']))
            obj = {
               ...obj,
               [item['product_id']]: temp
            }
         } 
      })
      items && setImgs(obj)
      console.log(imgs)
   }, [items])
   const th = [
      {
         'name': 'ID',
         'name_code': 'product_id'
      }, 
      {
         'name': 'Name',
         'name_code': 'product_name'
      },
      {
         'name': 'Price',
         'name_code': 'product_price'
      },
      {
         'name': 'Size',
         'name_code': 'size',
         'columnsShow': ['size_name'],
         'type': 'array',
         'pivot': 'product_size_quantily'
      }
   ]

   
   
   const showSearchResult = (result) => {
      setItems(result)
   }
   const handleReload = ()=>{
      setReload(!reload)
   }
   if (isLoaded)
      return (<h1>Loading...</h1>)
   else
      return(
         <div className={clsx(styles.wrap)}>
            <Header title="Product"/>
            <Table
               th={th}
               items={items} 
               title={"Product Table"} 
               href="/admin/product/create"
               showSearchResult={showSearchResult}
               nameKey="product_name"
               reloadCallback={handleReload}
               urlAPI={url}
               APIName="product"
               tableEditName='category'
               hoverPanel={imgs}
            />

         </div>
      )
}

export default ProductList