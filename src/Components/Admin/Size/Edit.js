import { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import clsx from "clsx"
import styles from "../MainPage.module.css"
import Header from '../Header'
import Alert from '../Alert'
import { GlobalVariable } from '../../GlobalVariable'

function SizeEdit() {
   const [values, setValues] = useState({
      'name': '',
   })
   const [errors, setErrors] = useState([])
   const {url} = useContext(GlobalVariable)
   let {id} = useParams()

   useEffect(()=>{
      const urlReq = url + "/size/"+id
      fetch(urlReq, {
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
         .then(response => response.json())
         .then(data => setValues({
            'name': data['size_name']
         }))
      console.log(values)
   }, [])

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
      
      const urlReq = url + '/size/' + id
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
         <Header title="Size"/>
         <div className={clsx(styles.card,styles.small)}>
            <div className={clsx(styles.cardHeader,styles.primary)}>
               <Link to="/admin/size" className={clsx(styles.back)}>
                  <i className="fa-solid fa-arrow-left"></i>
                  Quay về 
               </Link>
               <h3 className={clsx(styles.cardTitle)}>Edit Size {id}</h3>
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
                  value={values.name}
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
                  Edit
               </button>
            </div>
         
         </div>
      </div>
   );
}

export default SizeEdit;
