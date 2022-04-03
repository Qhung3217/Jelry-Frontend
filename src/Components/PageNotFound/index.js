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
                     <h1>Không tìm thấy trang</h1>
                     <p>Xin lỗi, chúng tôi không tìm thấy trang này</p>
                     <Link to='/'>Trở  về trang chủ</Link>
                  </div>
               </div>
            </div>
         </div>

      </>
   )
}

export default PageNotFound