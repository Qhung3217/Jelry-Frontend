import clsx from 'clsx'
import {useState, useEffect, useContext} from 'react'
import styles from '../MainPage.module.css'
import dashboard from './Dashboard.module.css'
import Header from '../Header'
import {GlobalVariable} from '../../GlobalVariable'
import {currencyFormat} from '../../../Utils/NumberFormat'

function Dashboard(){
   const {url} = useContext(GlobalVariable)
   const [income, setIncome] = useState()
   const months = [
      "January", 
      "February",
      "March", 
      "April", 
      "May", 
      "June",
      "July", 
      "August", 
      "September", 
      "October", 
      "November", 
      "December"
   ]


   useEffect(() =>{
      const urlReq = url + '/income'

      fetch(urlReq, {
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
         .then(response => response.json())
         .then(data=> setIncome(data))
   }, [])

   const getTotalIncome = () => currencyFormat(income.reduce((total, record) => total += record['invoice_total'], 0))
   const getTotalIncomeInMonth = () => {
      const currentMonth = new Date().getMonth()
      let total = 0
      income.forEach(record => {
         const thisMonth = new Date(record['time_order'])
         if (thisMonth.getMonth() === currentMonth)
            total += record['invoice_total']
      })
      return currencyFormat(total)
   }
   const getOrderInMonth = () => {
      const currentMonth = new Date().getMonth()
      let total = 0
      income.forEach(record => {
         const thisMonth = new Date(record['time_order'])
         if (thisMonth.getMonth() === currentMonth)
            total++
      })
      return total
   }
   return(
      <div className={clsx(styles.wrap)}>
         <Header title="Admin's Dashboard"/>
         <div className={clsx(styles.card)}>
            
            <div className={clsx(dashboard.list)}>
               <div className={clsx(dashboard.item)}>
                  <div className={clsx(dashboard.content)}>
                     <h2>Total income</h2>
                     <h1>{income && getTotalIncome()}</h1>
                  </div>
               </div>
               <div className={clsx(dashboard.item)}>
                  <div className={clsx(dashboard.content)}>
                     <h2>Total orders</h2>
                     <h1>{income && income.length} orders</h1>
                  </div>
               </div>
               <div className={clsx(dashboard.item, dashboard.mb8)}>
                  <div className={clsx(dashboard.content)}>
                     <h2>Total income in <span>{months[new Date().getMonth()]}</span></h2>
                     <h1>{income && getTotalIncomeInMonth()}</h1>
                  </div>
               </div>
               <div className={clsx(dashboard.item, dashboard.mb8)}>
                  <div className={clsx(dashboard.content)}>
                     <h2>Total order in <span>{months[new Date().getMonth()]}</span></h2>
                     <h1>{income && getOrderInMonth()} orders</h1>
                  </div>
               </div>
            </div>
            
         </div>
      </div>
   )
}

export default Dashboard