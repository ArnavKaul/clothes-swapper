import { useState } from 'react'
import LandingPage from './LandingPage'
import './App.css'
import ItemDetails from './ItemDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ItemDetails/>
    </>
  )
}

export default App
