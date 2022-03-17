import { useState } from 'react'
import clsx from 'clsx'
import styles from './Alert.module.css'

function Alert({trigger = true, error, message, title, setMes}){
  const [show, setShow] = useState(trigger)
  return(
    <>
      {show &&
        <div className={clsx(styles.modal)}>
          <div className={clsx(styles.container)}>
            <div className={clsx(styles.icon, {
              [styles.iconSucces]: error===false,
              [styles.iconFail]: error===true,

            })}>
              {error ? 
                <i className='bx bx-check-circle'></i>
                :
                <i className='bx bx-x-circle'></i>
              }
            </div>
            <div className={clsx(styles.main)}>
              <h1 className={clsx(styles.title)}>
                {title}
              </h1>
              <p className={clsx(styles.text)}>
                {message}
              </p>
              <button 
                className={clsx('btn',{
                  [styles.fail]: error===true,
                  [styles.success]: error===false
                })}
                onClick={()=>{
                  setShow(!show)
                  setMes()
                  if (error === false){
                    let url = (new URL(window.location.href))
                    window.location.replace(url.origin)
                  }
                }}
              >
                OK
              </button>
            </div>

          </div>
        </div>
      }
    </>
  )
}

export default Alert