import clsx from 'clsx'
import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import {Helmet} from 'react-helmet-async'
import { Link } from 'react-router-dom'
import styles from './Checkout.module.css'
import { currencyFormat } from '../../Utils/NumberFormat'
import {validateEmail, validatePhone} from '../../Utils/Regex'
import { GlobalVariable } from '../GlobalVariable'
import Alert from '../Alert'

function Checkout() {
  const [carts, setCarts] = useState([])
  const [isNameEmpty, setIsNameEmpty] = useState(false)
  const [isEmailEmpty, setIsEmailEmpty] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isTelsEmpty, setIsTelsEmpty] = useState(false)
  const [isTelsValid, setIsTelsValid] = useState(true)
  const [isAddressEmpty, setIsAddressEmpty] = useState(false)
  const [isProvinceEmpty, setIsProvinceEmpty] = useState(false)
  const [isDistrictEmpty, setIsDistrictEmpty] = useState(false)
  const [isWardEmpty, setIsWardEmpty] = useState(false)
  const [message, setMessage] = useState()
  const inputName = useRef(null)
  const {url} = useContext(GlobalVariable)
  const prefix = url.slice(0,url.lastIndexOf('/api'))

  const [userInfo, setUserInfo] = useState({
    'customer_name': '',
    'customer_email': '',
    'customer_tel': '',
    'customer_province': '',
    'customer_district': '',
    'customer_ward': '',
    'customer_address': '',
    'total': ''
  })
  let allValid = {
    'name': isNameEmpty,
    'email': !!isEmailValid && isEmailEmpty,
    'tels': !!isTelsValid && isTelsEmpty,
    'province': isProvinceEmpty,
    'district': isDistrictEmpty,
    'ward': isWardEmpty,
    'address': isAddressEmpty
  }
  
  useEffect(()=>{
    if (inputName.current)
      inputName.current.focus()
    let cart = localStorage.getItem('cart')
    if (cart) {
      cart = JSON.parse(cart)
      console.log('Carts: ',cart)
      setCarts(cart)
    }
  },[])
  
  const total = useMemo(()=>{
    let rlt
    if (carts.length > 0) {
      rlt = carts.reduce((result,cart) => result+= cart.product['product_price']*cart.quantity,0)
      console.log('rlt: ',rlt)
    }else
      rlt = 0
    setUserInfo({...userInfo, 'total': rlt})
    return rlt
  },[carts])

  function fetchInvoiceDetailStore(data){
    const url = 'http://jelry.test/api'
    let urlReq = url + '/invoice'
    fetch(urlReq, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data=>setMessage({...data, 'trigger': true}))
      .catch(err=>console.log(err))

      console.log("mess",message)
  }
  
  const handleSubmit = () => {
    console.log(userInfo, carts, allValid)
  
    if (!allValid.name && !allValid.email && !allValid.tels && !allValid.address && !allValid.province && !allValid.ward && !allValid.district){
      console.log(userInfo, carts, allValid)
      const products = []
      carts.forEach(cart => {
        products.push({
          'id':cart.product['product_id'],
          'price': cart.product['product_price'],
          'quantity': cart.quantity,
          'size': cart.size
        })
      })
      const payload = {
        ...userInfo,
        'products': products
      }
      console.log('payload: ',payload)
      fetchInvoiceDetailStore(payload)
      localStorage.removeItem('cart')
    }
    
  }

  return(
    <div className={clsx(styles.textAlign, "grid wide")}>
      <Helmet>
          <title>
            Jelry - Checkout
          </title>
      </Helmet>
      {message && <Alert 
        trigger={message.trigger}
        error={message.error}
        message={message.message}
        title={message.title}
        setMes={setMessage}
      />}
      <h1 className={clsx(styles.titleH1)}>Thanh to??n</h1>
      <div className={clsx(styles.rowReverse, "row no-gutters")}>
        <div className="col l-5 m-12 s-12">
          <div className={clsx(styles.sidebar)}>
            <div 
              className={clsx(styles.cartSummary)}
              onClick={(e)=> e.target.closest('.'+styles.cartSummary).classList.toggle(styles.cartOpen)}
            >
              <div className={clsx(styles.cartSummaryIcon)}>
                <i className='bx bx-cart'></i>
                <span>Hi???n th??? th??ng tin ????n h??ng</span>
                <span className={clsx(styles.summaryOpen)}>???n th??ng tin ????n h??ng</span>
                <i className='bx bx-chevron-down' ></i>
                <i className={clsx(styles.summaryOpen,'bx bx-chevron-up')}></i>
              </div>
              <div className={clsx(styles.cartSummaryTotal)}>{currencyFormat(total)}</div>
            </div>
            
            <div className={clsx(styles.cartDetail)}>
              <h1 className={clsx(styles.titleSideBar)}>Th??ng tin ????n h??ng</h1>
              {carts.map( (cart,index) => (
                <div key={index} className={clsx(styles.cartItem)}>
                  <div className={clsx(styles.cartImg)}>
                    <img src={prefix + '/' + cart.product.image[0]['image_url']} alt={cart.product['product_name']} />
                    <span className={clsx(styles.cartQuantity)}>{cart.quantity}</span>
                  </div>
                  <div className={clsx(styles.cartInfo)}>
                    <div className={clsx(styles.cartInfoTop)}>
                      <div className={clsx(styles.cartTitle)}>{cart.product['product_name']}</div>
                      <div className={clsx(styles.cartPrice)}>{currencyFormat(cart.product['product_price']*cart.quantity)}</div>
                    </div>
              
                    <div className={clsx(styles.cartSize)}>
                      {cart.size !== "None" && cart.size}
                    </div>
                  </div>
                </div>
              ))}
              <div className={clsx(styles.totalGroupWrap)}>
                <div className={clsx(styles.totalGroup)}>
                  <div className={clsx(styles.totalName)}>T???m t??nh</div>
                  <div className={clsx(styles.totalPrice)}>{currencyFormat(total)}</div>
                </div>
                <div className={clsx(styles.totalGroup)}>
                  <div className={clsx(styles.totalName)}>Ph?? v???n chuy???n</div>
                  <div className={clsx(styles.totalPrice)}>Mi???n ph??</div>
                </div>
              </div>
              <div className={clsx(styles.totalGroupWrap)}>
                <div className={clsx(styles.totalGroup)}>
                  <div className={clsx(styles.totalName)}>T???ng c???ng</div>
                  <div className={clsx(styles.totalPrice)}><span>VN??</span>{currencyFormat(total)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col l-7 m-12 s-12">
          <div className={clsx(styles.main)}>
            <h1 className={styles.mainTitle}>Th??ng tin giao h??ng</h1>
            <div className={clsx(styles.checkoutForm)}>
              <div className={clsx(styles.formGroup)}>
                <label htmlFor="checkout_name" className={clsx(styles.formLabel)}>H??? v?? t??n</label>
                <input 
                  type="text" 
                  id="checkout_name" 
                  name="checkout_name" 
                  className={clsx(styles.formInput,{
                    [styles.inputAlert]: isNameEmpty
                  })}
                  ref={inputName}
                  value={userInfo.customer_name}
                  onChange={e=>{
                    setUserInfo({...userInfo, 'customer_name': e.target.value})
                    setIsNameEmpty(false)
                  }}
                  onBlur={(e)=> e.target.value === '' && setIsNameEmpty(true)}
                />
                <div className={clsx(styles.alert)}>
                  {isNameEmpty && <p>Vui l??ng nh???p h??? v?? t??n</p>}
                </div>
              </div>
              <div className={clsx(styles.formGroup)}>
                <div className={clsx(styles.formGroupWrap)}>
                  <div className={clsx(styles.formGroupEmail)}>
                    <label htmlFor="checkout_email" className={clsx(styles.formLabel)}>Email</label>
                    <input 
                      type="text" 
                      id="checkout_email" 
                      name="checkout_email" 
                      className={clsx(styles.formInput,{
                        [styles.inputAlert]: isEmailEmpty||!isEmailValid
                      })}
                      value={userInfo.customer_email}
                      onChange={e=>{
                        setUserInfo({...userInfo, 'customer_email': e.target.value})
                        setIsEmailValid(true)
                        setIsEmailEmpty(false)
                      }}
                      onBlur={(e)=> {
                        e.target.value !== '' && setIsEmailValid(validateEmail(e.target.value))
                        e.target.value === '' && setIsEmailEmpty(true)
                      }}
                    />
                    <div className={clsx(styles.alert)}>
                      {isEmailEmpty && <p>Vui l??ng nh???p email</p>}
                      {!isEmailValid && <p>Email kh??ng h???p l???</p>}
                    </div>
                  </div>
                  <div className={clsx(styles.formGroupTel)}>
                    <label htmlFor="checkout_tel" className={clsx(styles.formLabel)}>S??? ??i???n tho???i</label>
                    <input 
                      type="text" 
                      id="checkout_tel" 
                      name="checkout_tel" 
                      className={clsx(styles.formInput, {
                        [styles.inputAlert]: isTelsEmpty || !isTelsValid
                      })}
                      value={userInfo.customer_tel}
                      onChange={e=>{
                        setUserInfo({...userInfo, 'customer_tel': e.target.value})
                        setIsTelsEmpty(false)
                        setIsTelsValid(true)
                      }}
                      onBlur={e=>{
                        e.target.value === '' && setIsTelsEmpty(true)
                        e.target.value !== '' && setIsTelsValid(validatePhone(e.target.value))
                      }}
                    />
                    <div className={clsx(styles.alert)}>
                      {isTelsEmpty && <p>Vui l??ng nh???p s??? ??i???n tho???i</p>}
                      {!isTelsValid && <p>S??? ??i???n tho???i kh??ng h???p l???</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className={clsx(styles.formGroup)}>
                <label htmlFor="checkout_province" className={clsx(styles.formLabel)}>T???nh/Th??nh ph???</label>
                <input 
                  type="text" 
                  id="checkout_province" 
                  name="checkout_province" 
                  className={clsx(styles.formInput, {
                    [styles.inputAlert]: isProvinceEmpty
                  })}
                  value={userInfo.customer_province}
                  onChange={e=>{
                    setUserInfo({...userInfo, 'customer_province': e.target.value})
                    setIsProvinceEmpty(false)
                  }}
                  onBlur={e=>e.target.value === '' && setIsProvinceEmpty(true)}
                />
                <div className={clsx(styles.alert)}>
                  {isProvinceEmpty && <p>Vui l??ng nh???p t???nh/th??nh ph???</p>}
                </div>
              </div>

              <div className={clsx(styles.formGroup)}>
                <label htmlFor="checkout_district" className={clsx(styles.formLabel)}>Qu???n/Huy???n</label>
                <input 
                  type="text" 
                  id="checkout_district" 
                  name="checkout_district" 
                  className={clsx(styles.formInput, {
                    [styles.inputAlert]: isDistrictEmpty
                  })}
                  value={userInfo.customer_district}
                  onChange={e=>{
                    setUserInfo({...userInfo, 'customer_district': e.target.value})
                    setIsDistrictEmpty(false)
                  }}
                  onBlur={e=>e.target.value === '' && setIsDistrictEmpty(true)}
                />
                <div className={clsx(styles.alert)}>
                  {isDistrictEmpty && <p>Vui l??ng nh???p qu???n/huy???n</p>}
                </div>
              </div>

              <div className={clsx(styles.formGroup)}>
                <label htmlFor="checkout_ward" className={clsx(styles.formLabel)}>X??/Ph?????ng/Th??? tr???n</label>
                <input 
                  type="text" 
                  id="checkout_ward" 
                  name="checkout_ward" 
                  className={clsx(styles.formInput, {
                    [styles.inputAlert]: isWardEmpty
                  })}
                  value={userInfo.customer_ward}
                  onChange={e=>{
                    setUserInfo({...userInfo, 'customer_ward': e.target.value})
                    setIsWardEmpty(false)
                  }}
                  onBlur={e=>e.target.value === '' && setIsWardEmpty(true)}
                />
                <div className={clsx(styles.alert)}>
                  {isWardEmpty && <p>Vui l??ng nh???p x??/ph?????ng/th??? tr???n</p>}
                </div>
              </div>

              <div className={clsx(styles.formGroup)}>
                <label htmlFor="checkout_address" className={clsx(styles.formLabel)}>?????a ch???</label>
                <input 
                  type="text" 
                  id="checkout_address" 
                  name="checkout_address" 
                  className={clsx(styles.formInput, {
                    [styles.inputAlert]: isAddressEmpty
                  })}
                  value={userInfo.customer_address}
                  onChange={e=>{
                    setUserInfo({...userInfo, 'customer_address': e.target.value})
                    setIsAddressEmpty(false)
                  }}
                  onBlur={e=>e.target.value === '' && setIsAddressEmpty(true)}
                  placeholder="V?? d???: s??? nh??, t??n ???????ng, ..."
                />
                <div className={clsx(styles.alert)}>
                  {isAddressEmpty && <p>Vui l??ng nh???p ?????a ch???</p>}
                </div>
              </div>

              

              <div className={clsx(styles.formGroup)}>
                <div className={clsx(styles.formGroupWrap)}>
                  <Link to="/cart">Gi??? h??ng</Link>
                  <button 
                    className={clsx(styles.btnSubmit)}
                    onClick={()=>
                      handleSubmit()
                    }
                  >
                    Ho??n t???t ????n h??ng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout