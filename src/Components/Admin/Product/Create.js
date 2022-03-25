import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import clsx from "clsx"
import styles from "../MainPage.module.css"
import Header from '../Header'
import Alert from '../Alert'
import { GlobalVariable } from '../../GlobalVariable'

function ProductCreate() {
   const [values, setValues] = useState({'name': ''})
   const [errors, setErrors] = useState([])
   const {url} = useContext(GlobalVariable)
   const handleChange = e => {
      setValues({[e.target.name]: e.target.value})
   }
   const validate = () => {
      const errors = []
      if (values.name.trim() === '')
         errors.push("Product Name is required")


      return errors
   }
   const handleSubmit = () =>{
      setErrors([])
      const errors = validate()
      if (errors.length > 0){
         setErrors(errors)
         return;
      }
      
      const urlReq = url + '/material'
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
               alert(data.errors.name)
         })
   }
   return (
      <div className={clsx(styles.wrap)}>
         <Header title="Product"/>
         <div className={clsx(styles.card,styles.small)}>
            <div className={clsx(styles.cardHeader,styles.primary)}>
               <Link to="/admin/product" className={clsx(styles.back)}>
                  <i className="fa-solid fa-arrow-left"></i>
                  Quay về 
               </Link>
               <h3 className={clsx(styles.cardTitle)}>Add Product</h3>
            </div>
            
            <div className={clsx(styles.cardBody)}>
               {errors.length > 0 && <Alert errors={errors}/>}
               <div className={clsx(styles.formGroup)}>
               <label htmlFor="productName">Product Name</label>
               <input
                  type="text"
                  className={clsx(styles.formControl)}
                  id="productName"
                  placeholder="Enter product name"
                  name="name"
                  onChange={handleChange}
                  maxLength="50"
               />
               </div>
         
               <div className={clsx(styles.formGroup)}>
               <label htmlFor="productPrice">Product Price</label>
               <input
                  type="text"
                  className={clsx(styles.formControl)}
                  id="productPrice"
                  placeholder="Enter product price"
                  name="price"
                  onChange={handleChange}
                  maxLength="50"
               />
               </div>

               <div className={clsx(styles.formGroup)}>
               <label>Size</label>
               <input
                  type="checkbox"
                  className={clsx(styles.formControl)}
                  name="size"
                  onChange={handleChange}
                  maxLength="50"
               />
               </div>

               <div className={clsx(styles.formGroup)}>
               <label htmlFor="productImage">Product Image</label>
               <input
                  type="file"
                  className={clsx(styles.formControl)}
                  id="productImage"
                  placeholder="Choose images"
                  name="image"
                  multiple="true"
                  onChange={handleChange}
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

export default ProductCreate;
