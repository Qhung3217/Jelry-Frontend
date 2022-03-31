import clsx from 'clsx'
import styles from '../MainPage.module.css'
import dashboard from './Dashboard.module.css'
import Header from '../Header'

function Dashboard(){
   return(
      <div className={clsx(styles.wrap)}>
         <Header title="Admin's Dashboard"/>
         <div className={clsx(styles.card)}>
            
            <div className={clsx(dashboard.list)}>
               <div className={clsx(dashboard.item)}>
                  <div className={clsx(dashboard.content)}>
                     <h2>Total income</h2>
                     <h1>200</h1>
                  </div>
               </div>
               <div className={clsx(dashboard.item)}>
                  <div className={clsx(dashboard.content)}>
                     <h2>total income in month</h2>
                     <h1>200</h1>
                  </div>
               </div>
               <div className={clsx(dashboard.item)}>
                  <div className={clsx(dashboard.content)}>
                     <h2>total order</h2>
                     <h1>200</h1>
                  </div>
               </div>
               <div className={clsx(dashboard.item)}>
                  <div className={clsx(dashboard.content)}>
                     <h2>total order in month</h2>
                     <h1>200</h1>
                  </div>
               </div>
            </div>
            
         </div>
      </div>
   )
}

export default Dashboard