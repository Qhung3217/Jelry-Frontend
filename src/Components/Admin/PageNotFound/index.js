import clsx from 'clsx'
import styles from './PageNotFound.module.css'
import {Helmet} from 'react-helmet-async'
import {Link} from 'react-router-dom'

function PageNotFound(){
   return (
      <>
         <Helmet>
            <title>
               Page Not Found - Jelry
            </title>
         </Helmet>
         <div className="grid wide">
            <div className="row no-gutters">
               <div className="col l-12 m-12 s-12">
                  <div className={clsx(styles.content)}>
                     <h1>404</h1>
                     <p>Page not found</p>
                  </div>
               </div>
            </div>
         </div>

      </>
   )
}

export default PageNotFound