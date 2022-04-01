import { useState, useEffect } from 'react'
import './App.css'
import Admin from './Components/Admin'
import User from './Components/User'

function App() {
  const [isUrlAdmin, setIsUrlAdmin] = useState(false)
  useEffect(()=>{
    const url = (new URL(window.location.href))
    // console.log('url: ', url)
    const prefix = url.pathname.slice(0,6)
    // console.log('app prefix: ',prefix)
    if (prefix === '/admin')
      setIsUrlAdmin(true)
    else
      setIsUrlAdmin(false)
  },[window.location.href])
  if (!isUrlAdmin)
    return (
      <div className="App">
        <User/>
      </div>
    )
  else
    return (
      <div className="App">
        {/* {!isUrlAdmin ? <User/> : <Admin/>} */}
        <Admin/>
      </div>
  );
}

export default App;
