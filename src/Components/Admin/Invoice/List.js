import { useEffect, useContext, useState } from 'react'
import {Helmet} from 'react-helmet-async'
import clsx from 'clsx'
import styles from '../MainPage.module.css'
import Header from '../Header'
import Table from '../Table'
import {GlobalVariable} from '../../GlobalVariable'

function InvoiceList(){
   const { url } = useContext(GlobalVariable)
   const [items, setItems] = useState()
   const [isLoaded, setIsLoaded] = useState(true)
   const [reload, setReload] = useState(false)

   useEffect(()=>{
      const urlReq = url + '/invoice'
      fetch(urlReq, {
         'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
         .then(res => res.json())
         .then(data=>setItems(data))
         .then(()=>setIsLoaded(false))
         .catch(err=>{
            setIsLoaded(true)
            console.log('Loaded invoice failed: ' + err.message)
         })
   },[reload])

   const th = [
      {
         'name': 'ID',
         'name_code': 'invoice_id'
      }, 
      {
         'name': 'Customer Name',
         'name_code': 'invoice_customer_name'
      },
      {
         'name': 'Email',
         'name_code': 'invoice_customer_email'
      },
      {
         'name': 'Tels',
         'name_code': 'invoice_customer_tels'
      },
      {
         'name': 'Province',
         'name_code': 'invoice_customer_province'
      },
      {
         'name': 'District',
         'name_code': 'invoice_customer_district'
      },
      {
         'name': 'Ward',
         'name_code': 'invoice_customer_ward'
      },
      {
         'name': 'Address',
         'name_code': 'invoice_customer_address'
      },
      {
         'name': 'Total',
         'name_code': 'invoice_total'
      },
      {
         'name': 'Time',
         'name_code': 'created_at'
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
                  Invoice Management
               </title>
         </Helmet>
         <h1>Loading...</h1>
      </>)
   else
      return(
         <div className={clsx(styles.wrap)}>
            <Helmet>
               <title>
                  Invoice Management
               </title>
            </Helmet>
            <Header title="Invoice"/>
            <Table
               th={th}
               items={items} 
               title={"Invoice Table"} 
               showSearchResult={showSearchResult}
               nameKey="invoice_name"
               searchColumn="invoice_customer_name"
               reloadCallback={handleReload}
               urlAPI={url}
               APIName="invoice"
            />

         </div>
      )
}

export default InvoiceList