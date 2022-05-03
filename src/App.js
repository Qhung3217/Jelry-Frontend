import { useState, useEffect } from 'react'
import './App.css'
import Admin from './Components/Admin'
import User from './Components/User'

function App() {
  const [isUrlAdmin, setIsUrlAdmin] = useState(false)
  useEffect(()=>{
    const url = (new URL(window.location.href))
    const prefix = url.pathname.slice(0,6)
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
        <Admin/>
      </div>
  );
}

export default App;
