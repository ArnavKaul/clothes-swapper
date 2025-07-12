import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import ItemDetails from './ItemDetails'
import ItemListing from './ItemListing'
import AdminPanel from './AdminPanel'
import UserDashboard from './UserDashboard'
import NavBar from './components/ui/navbar'
import LoginPage from './login'
import './App.css'
import HeroLandingPage from './HeroLandingPage'
import Register from './register'

function App() {
  const [username, setusername] = useState('');
  return (
  
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/items" element={<ItemListing />} />
        <Route path="/items/:id" element={<ItemDetails />} />
        <Route path="/landing/herolandingpage" element={<HeroLandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<Register/>} />

      </Routes>
    </Router>
  )
}

export default App