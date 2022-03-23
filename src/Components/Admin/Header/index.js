import clsx from 'clsx'
import styles from './Header.module.css'

function Header({ title }){
   return(
      <div className={clsx(styles.header)}>
         <h1 className={clsx(styles.title)}>{title}</h1>
      </div>
   )
}

export default Header