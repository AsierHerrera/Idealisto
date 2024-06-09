import { useState, useEffect } from 'react'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import UserContext from './context/userContext'
import './App.css'


function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
  },[user]);
 
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  )
}

export default App
