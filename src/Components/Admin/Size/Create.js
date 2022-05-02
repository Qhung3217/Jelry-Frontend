import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import clsx from "clsx"
import styles from "../MainPage.module.css"
import Header from '../Header'
import Alert from '../Alert'
import { GlobalVariable } from '../../GlobalVariable'

function SizeCreate() {
   const [values, setValues] = useState({'name': ''})
   const [errors, setErrors] = useState([])
   const {url} = useContext(GlobalVariable)
   const handleChange = e => {
      setValues({[e.target.name]: e.target.value})
   }
   const validate = () => {
      const errors = []
      if (values.name.trim() === '')
         errors.push("Size Name is required")


      return errors
   }
   const handleSubmit = () =>{
      setErrors([])
      const errors = validate()
      if (errors.length > 0){
         setErrors(errors)
         return;
      }
      
      const urlReq = url + '/size'
      fetch(urlReq, {
         method: 'POST',
         headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify(values)
      })
         .then(res=>res.json())   
         .then(data => {
            if (data.error === false){
               alert(data.message)
               let url = window.location.href
               url = url.slice(0, url.lastIndexOf('/create'))
               window.location.replace(url)
            }
            else
               if (data?.errors)
                  alert(data.errors.name)
               else
                  alert(data.message)
         })
   }
   return (
      <div className={clsx(styles.wrap)}>
         <Header title="Size"/>
         <div className={clsx(styles.card,styles.small)}>
            <div className={clsx(styles.cardHeader,styles.primary)}>
               <Link to="/admin/size" className={clsx(styles.back)}>
                  <i className="fa-solid fa-arrow-left"></i>
                  Quay về 
               </Link>
               <h3 className={clsx(styles.cardTitle)}>Add Size</h3>
            </div>
            
            <div className={clsx(styles.cardBody)}>
               {errors.length > 0 && <Alert errors={errors}/>}
               <div className={clsx(styles.formGroup)}>
               <label htmlFor="sizeName">Size Name</label>
               <input
                  type="text"
                  className={clsx(styles.formControl)}
                  id="sizeName"
                  placeholder="Enter size name"
                  name="name"
                  onChange={handleChange}
                  maxLength="50"
               />
               </div>
         
            </div>
            <div className={clsx(styles.cardFooter)}>
               <button 
                  type="submit" 
                  className={clsx(styles.btn,styles.btnPrimary)}
                  onClick={handleSubmit}
               >
                  Submit
               </button>
            </div>
         
         </div>
      </div>
   );
}

export default SizeCreate;
