import { useEffect, useContext, useState } from 'react'
import {Helmet} from 'react-helmet-async'
import clsx from 'clsx'
import styles from '../MainPage.module.css'
import Header from '../Header'
import Table from '../Table'
import {GlobalVariable} from '../../GlobalVariable'

function MaterialList(){
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
         .then(data=>setItems(data.data))
         .then(()=>setIsLoaded(false))
         .catch(err=>{
            setIsLoaded(true)
            console.log('Loaded material failed: ' + err.message)
         })
   },[reload])

   const th = [
      {
         'name': 'ID',
         'name_code': 'material_id'
      }, 
      {
         'name': 'Name',
         'name_code': 'material_name'
      }
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
                  Material Management
               </title>
         </Helmet>
         <h1>Loading...</h1>
      </>)
   else
      return(
         <div className={clsx(styles.wrap)}>
            <Helmet>
               <title>
                  Material Management
               </title>
            </Helmet>
            <Header title="Material"/>
            <Table
               th={th}
               items={items} 
               title={"Material Table"} 
               href="/admin/material/create"
               showSearchResult={showSearchResult}
               nameKey="material_name"
               reloadCallback={handleReload}
               urlAPI={url}
               APIName="material"
               tableEditName='material'
            />

         </div>
      )
}

export default MaterialList