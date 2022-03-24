import clsx from 'clsx'
import styles from './Alert.module.css'

function Alert({errors}){
   return (
      <div className={clsx(styles.alert)}>
         {errors.map(error => (
            <p>- {error}</p>
         ))}
      </div>
   )
}

export default Alert