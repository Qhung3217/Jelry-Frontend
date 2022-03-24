import { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import clsx from "clsx"
import styles from "../MainPage.module.css"
import Header from '../Header'
import Alert from '../Alert'
import { GlobalVariable } from '../../GlobalVariable'

function CategoryEdit() {
   const [values, setValues] = useState({
      'name': '',
      'parentId': ''
   })
   const [materialList, setMaterialList] = useState()
   const [errors, setErrors] = useState([])
   const {url} = useContext(GlobalVariable)
   let {id} = useParams()

   useEffect(()=>{
      const urlReq = url + "/material"
      let currentValue = {
         'name': '',
         'parentId': ''
      }
      fetch(urlReq, {
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
         .then(response => response.json())
         .then(data => {
            let arr = []
            data.data.forEach(dt => {
               const temp = {
                  'material_name': dt['material_name'],
                  'material_id': dt['material_id']
               }
               arr.push(temp)
               if (dt.category.length > 0) {
                  let idtemp = id
                  const rs = dt.category.find(cate => cate['category_id'] === parseInt(idtemp))
                  // console.log('rs',rs,dt.category, typeof idtemp)
                  if(rs)
                     currentValue = {
                        'name': rs['category_name'],
                        'parentId': dt['material_id']
                     }
               }
                  
            })
            return arr
         })
         .then(result => {setValues(currentValue);setMaterialList(result)})
         // .then(()=>setValues(currentValue))
         
      console.log(values, materialList)
   }, [])

   const handleChange = e => {
      setValues({...values,[e.target.name]: e.target.value})
   }
   const validate = () => {
      const errors = []
      console.log('values: ',values)
      if (values.name.trim() === '')
         errors.push("Category Name is required")
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
      
      const urlReq = url + '/category/' + id
      fetch(urlReq, {
         method: 'PUT',
         headers:{
            'Content-type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify(values)
      })
         .then(res=>res.json())   
         .then((data) => {
            if (data.error === false){
               alert(data.message)
               let url = window.location.href
               url = url.slice(0, url.lastIndexOf('/edit'))
               window.location.replace(url)
            }
            else
               alert(data.errors.name)
         })
         .catch(err => alert(err.message))
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
               <h3 className={clsx(styles.cardTitle)}>Edit Category {id}</h3>
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
                  value={values.name}
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
                     value={values.parentId}
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
                  Edit
               </button>
            </div>
         
         </div>
      </div>
   );
}

export default CategoryEdit;
