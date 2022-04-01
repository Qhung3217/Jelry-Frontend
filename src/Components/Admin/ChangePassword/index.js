import clsx from 'clsx'
import { useState, useContext } from 'react'
import styles from './ChangePassword.module.css'
import Alert from '../Alert'
import {GlobalVariable} from '../../GlobalVariable'

function ChangePassword(){
   const [values, setValues] = useState({
      'oldPass': '',
      'newPass': '',
      'confirmPass': ''
   })
   const [errors, setErrors] = useState([])
   const {url} = useContext(GlobalVariable)

   const handleChange = e => {
      setValues({...values, [e.target.name]: e.target.value})
   }
   console.log(values)
   const validate = () => {
      const errors = []
      if (values.oldPass.trim() === '')
         errors.push("Current password is required")
      if (values.newPass.trim() === '')
         errors.push("New password is required")
      if (values.confirmPass.trim() === '')
         errors.push("Confirm password is required")
      if (values.newPass !== values.confirmPass)
         errors.push("Confirm password didn't match")
      return errors
   }
   const handleSubmit = () =>{
      setErrors([])
      const errors = validate()
      if (errors.length > 0){
         setErrors(errors)
         return;
      }
      const payload = {
         'newPass': values.newPass,
      }
      const urlReq = url + '/change-password'
      fetch(urlReq, {
         method: 'POST',
         headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify(payload)
      })
         .then(res=>res.json())   
         .then(data => {
            if (data.error === false){
               alert(data.message)
               window.location.href = '/admin'
            }
            else
               alert(data.message)
         })
         .catch(err=> alert(err.message))
   }
   return (
      <div className={clsx(styles.loginWrap)}>
         <div className={clsx(styles.content)}>
            <h1 className={clsx(styles.title)}>Change your password</h1>
            {errors && <Alert errors={errors}/>}
            <div className={clsx(styles.formGroup)}>
               <label htmlFor="oldPass">Current Password</label>
               <input
                  type="text"
                  id="oldPass"
                  placeholder="Current password"
                  name="oldPass"
                  onChange={handleChange}
               />
            </div>
            <div className={clsx(styles.formGroup)}>
               <label htmlFor="password">New Password</label>
               <input
                  type="text"
                  id="password"
                  placeholder="New password"
                  name="newPass"
                  onChange={handleChange}
               />
            </div>
            <div className={clsx(styles.formGroup)}>
               <label htmlFor="retypePassword">Confirm new Password</label>
               <input
                  type="text"
                  id="retypePassword"
                  placeholder="Confirm new password"
                  name="confirmPass"
                  onChange={handleChange}
               />
            </div>
            <div className={clsx(styles.formBottom)}>
               <button 
                  onClick={handleSubmit}
               >
                  Submit
               </button>
            </div>
         </div>
      </div>
   )
}

export default ChangePassword