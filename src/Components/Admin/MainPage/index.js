import clsx from 'clsx'
import styles from './MainPage.module.css'
import Sidebar from '../Sidebar'

function MainPage(){
   return(
      <div className="grid">
         <div className="row">
            <div className="col l-4">
               <div className={clsx(styles.sidebar)}>
                  <Sidebar/>
               </div>
            </div>
            <div className="col l-8">
               <div className={clsx(styles.content)}>
                  <h1>hello</h1>
               </div>
            </div>
         </div>
      </div>
   )
}

export default MainPage