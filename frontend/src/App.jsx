import { useState } from 'react'
import AppRoutes from "./Routes"
import NavBar from './NavBar'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>      
        <NavBar/>
        <AppRoutes/>
      
    </>
  )
}

export default App
