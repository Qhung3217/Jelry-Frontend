import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import clsx from "clsx"
import styles from "../MainPage.module.css"
import Header from '../Header'
import Alert from '../Alert'
import { GlobalVariable } from '../../GlobalVariable'

function ProductCreate() {
   const [values, setValues] = useState({
      'name': '',
      'price': '',
      'desc': '',
      'cate': '',
      'size': [],
      'image': ''
   })
   const [errors, setErrors] = useState([])
   const [sizeList, setSizeList] = useState([])
   const [cateList, setCateList] = useState([])
   const [imgShow, setImgShow] = useState()
   const {url} = useContext(GlobalVariable)
   useEffect(()=>{
      console.log('values: ', values)
   }, [values])
   useEffect(()=> {
      const urlReq = url + '/size'
      fetch(urlReq, {
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
         .then(response => response.json())
         .then(data => setSizeList(data.data))
   },[])
   useEffect(()=> {
      const urlReq = url + '/category'
      fetch(urlReq, {
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         }
      })
         .then(response => response.json())
         .then(data => setCateList(data.data))
   },[])
   useEffect(()=>{
      return()=> {
         imgShow && imgShow.forEach(img => URL.revokeObjectURL(img))
      }
   },[imgShow])

   const handleChange = e => {
      console.log(e.target.value)
      if (e.target.name === 'image'){
         const files = e.target.files
         let arr = []
         for(let i = 0; i < files.length; i++){
            arr.push(URL.createObjectURL(files[i]))
            console.log(URL.createObjectURL(files[i]))
         }
         setImgShow(arr)
         setValues({...values, [e.target.name]: e.target.files})
         
      }
      else
         setValues({...values, [e.target.name]: e.target.value})
   }
   const validate = () => {
      const errors = []
      const arr = Object.values(values.size)
      console.log(parseInt(values.price), arr)
      if (values.name.trim() === '')
         errors.push("Product Name is required")
      if (values.price.trim() === '' || isNaN(parseInt(values.price)))
         errors.push("Product price is required and must be a number")
      if (values.desc === '')
         errors.push("Product desc is required")
      if (values.cate === '-1')
         errors.push("Choose material is required")
      if (arr.every(ar => ar === null))
         errors.push("Size is required")
      if (values.image === '')
         errors.push("Image is required")
      return errors
   }
   const handleSubmit = () =>{
      setErrors([])
      const errors = validate()
      console.log('submit')
      if (errors.length > 0){
         setErrors(errors)
         window.scrollTo(0,0)
         return;
      }
      
      const urlReq = url + '/product'
      // const imgObj = []

      // for (let i = 0; i < values.image.length ; i++){
      //    imgObj.push(values.image[i])

      // }
      // const payload = {
      //    ...values,
      //    'size': Object.values(values.size),
      //    'image': imgObj
      // }

      // console.log('payload ', JSON.stringify(payload))

      const payload = new FormData()
      payload.append('name', values.name)
      payload.append('price', values.price)
      payload.append('desc', values.desc)
      payload.append('cate', values.cate)
      Object.values(values.size).forEach((sz,index) => {
         console.log('sz ',sz)
         payload.append(`size[${index}]`,sz.id)
         payload.append(`quantity[${index}]`,sz.quantity)
      })
      // payload.append('size', Object.values(values.size))
      for (let i = 0; i < values.image.length ; i++)
         payload.append(`image[${i}]`, values.image[i])
      for (var key of payload.entries()) {
            console.log(key[0], key[1]);
      }
      
      fetch(urlReq, {
         method: 'POST',
         body: payload
      })
         .then(res=>res.json())   
         .then(data => {
            // if (data.error === false){
            //    alert(data.message)
            //    let url = window.location.href
            //    url = url.slice(0, url.lastIndexOf('/create'))
            //    window.location.replace(url)
            // }
            // else
            //    alert(data.errors.name)
            console.log('data',data)
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
               <label htmlFor="productDesc">Description</label>
               <div>
                  <CKEditor
                     editor={Editor}
                     onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                     }}
                     onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setValues({...values, 'desc': data})
                        console.log( { event, editor, data } );
                     }}
                  />
               </div>
               </div>
               
               <div className={clsx(styles.formGroup)}>
                  <label>Category</label>
                  <select
                     className={clsx(styles.formControl)}
                     name="cate"
                     onChange={handleChange}
                  >
                     <option value="-1">Choose category</option>
                     {cateList && cateList.map(category => (
                        <option 
                           key={category['category_id']} 
                           value={category['category_id']}
                        >
                           {category['category_name']}
                        </option>
                     ))}
                  </select>
               </div>

               <div className={clsx(styles.formGroup)}>
               <label>Size</label>
               {sizeList.length === 0 ? <h1>Loading...</h1>:
                  <div className={clsx(styles.groupCheckboxWrap)}>
                     {sizeList.map((size, index) => (
                        <div key={index} className={clsx(styles.groupCheckbox)}>
                           <input
                              type="checkbox"
                              className={clsx(styles.formControl)}
                              name="size"
                              onChange={e => {
                                 e.target.nextSibling.classList.toggle(styles.disabled)
                                 if (e.target.nextSibling.classList.contains(styles.disabled)){
                                    let temp = {...values}
                                    delete temp.size[e.target.id]
                                    setValues({
                                       ...temp
                                    })
                                 }
                                 else
                                    setValues({
                                       ...values,
                                       'size': {
                                          ...values.size,
                                          [e.target.id]: {
                                             'id': e.target.id,
                                             'quantity': e.target.nextSibling.querySelector('input').value
                                          }
                                       }
                                    })
                              }}
                              maxLength="50"
                              id={size['size_id']}
                           />
                           <div className={clsx(styles.groupCheckboxLabel, styles.disabled)}>
                              <label>{size['size_name']}</label>
                              <input
                                 type="text"
                                 placeholder="Enter quantity"
                                 data-id={size['size_id']}
                                 onChange={e => {
                                    setValues({
                                       ...values,
                                       'size': {
                                          ...values.size,
                                          [e.target.dataset.id]: {
                                             'id': e.target.dataset.id,
                                             'quantity': e.target.value
                                          }
                                       }
                                    })
                                 }}
                              />
                           </div>
                        </div>
                     ))}
                  </div>}
               </div>

               <div className={clsx(styles.formGroup)}>
               <label htmlFor="productImage">Product Image</label>
               <input
                  type="file"
                  className={clsx(styles.formControl)}
                  id="productImage"
                  placeholder="Choose images"
                  name="image"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                  onClick={e => e.target.value=null}
               />
               {imgShow && <div className={clsx(styles.panelShow)}>
                  {imgShow && imgShow.map((img,index) => (
                     <div key={index} className={clsx(styles.panelItem)}>
                        <img  src={img} />
                     </div>
                  ))}
               </div>}
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
