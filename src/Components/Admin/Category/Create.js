import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import clsx from "clsx"
import styles from "../MainPage.module.css"
import Header from '../Header'
import Alert from '../Alert'
import { GlobalVariable } from '../../GlobalVariable'

function CategoryCreate() {
   const [values, setValues] = useState({
      'name': '',
      'parentId': ''
   })
   const [materialList, setMaterialList] = useState()
   const [errors, setErrors] = useState([])
   const {url} = useContext(GlobalVariable)

   useEffect(()=> {
      const urlReq = url + '/material'
      fetch(urlReq, {
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
         .then(response => response.json())
         .then(data => {
            const result = []
            data.data.forEach(dt => {
               let temp = {
                  'material_id': dt['material_id'],
                  'material_name': dt['material_name'],
               }
               result.push(temp)
            })
            return result
         })
         .then(result => setMaterialList(result))
   },[])

   const handleChange = e => {
      setValues({...values, [e.target.name]: e.target.value})
   }
   console.log(values)
   const validate = () => {
      const errors = []
      if (values.name.trim() === '')
         errors.push("Category name is required")
      if (values.parentId === '-1')
         errors.push("Choose material is required")

      return errors
   }
   const handleSubmit = () =>{
      setErrors([])
      const errors = validate()
      if (errors.length > 0){
         setErrors(errors)
         return;
      }
      
      const urlReq = url + '/category'
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
               let href = window.location.href
               href = href.slice(0, href.lastIndexOf('/create'))
               window.location.replace(href)
            }
            else
               if (data?.errors)
                  alert(data.errors.name)
               else
                  alert(data.message)
         })
         .catch(err=> alert(err.message))
   }
   return (
      <div className={clsx(styles.wrap)}>
         <Header title="Category"/>
         <div className={clsx(styles.card,styles.small)}>
            <div className={clsx(styles.cardHeader,styles.primary)}>
               <Link to="/admin/category" className={clsx(styles.back)}>
                  <i className="fa-solid fa-arrow-left"></i>
                  Quay về 
               </Link>
               <h3 className={clsx(styles.cardTitle)}>Add Category</h3>
            </div>
            
            <div className={clsx(styles.cardBody)}>
               {errors.length > 0 && <Alert errors={errors}/>}
               <div className={clsx(styles.formGroup)}>
                  <label htmlFor="categoryName">Category Name</label>
                  <input
                     type="text"
                     className={clsx(styles.formControl)}
                     id="categoryName"
                     placeholder="Enter category name"
                     name="name"
                     onChange={handleChange}
                     maxLength="50"
                  />
               </div>

               <div className={clsx(styles.formGroup)}>
                  <label>Material</label>
                  <select
                     className={clsx(styles.formControl)}
                     name="parentId"
                     onChange={handleChange}
                  >
                     <option value="-1">Choose material</option>
                     {materialList && materialList.map(material => (
                        <option 
                           key={material['material_id']} 
                           value={material['material_id']}
                        >
                           {material['material_name']}
                        </option>
                     ))}
                  </select>
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

export default CategoryCreate;
