import clsx from 'clsx'
import {useState, useContext} from 'react'
import {Helmet} from 'react-helmet-async'
import PropTypes from 'prop-types'
import styles from './Login.module.css'
import {GlobalVariable} from '../../GlobalVariable'
import Alert from '../Alert'

async function loginUser(credentials, url) {
   return fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify(credentials)
   })
      .then(res => res.json())
   }

function Login({ setToken }){
   const {url} = useContext(GlobalVariable)
   const [username, setUsername] = useState()
   const [password, setPassword] = useState()
   const [error, setError] = useState()
   const handleSubmit = async () => {
      const urlReq = url + '/login'
      console.log(username, password)

      const token = await loginUser({username, password}, urlReq)
      if (token.status === 'success')
         setToken(token)
      else{
         setError([token.message])
      }
   }
   return (
      <div className={clsx(styles.loginWrap)}>
         <Helmet>
            <title>
               Login - Jelry
            </title>
         </Helmet>
         <div className={clsx(styles.content)}>
            <h1 className={clsx(styles.title)}>Please Log In</h1>
            {error && <Alert errors={error}/>}
            <div className={clsx(styles.formGroup)}>
               <label htmlFor="username">Username</label>
               <input
                  type="text"
                  id="username"
                  placeholder="Enter username"
                  onChange={e => setUsername(e.target.value)}
               />
            </div>
            <div className={clsx(styles.formGroup)}>
               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  onChange={e => setPassword(e.target.value)}
               />
            </div>
            <div className={clsx(styles.formBottom)}>
               <button onClick={handleSubmit}>Login</button>
            </div>
         </div>
      </div>
   )
}

Login.propTypes = {
   setToken: PropTypes.func.isRequired
};

export default Login