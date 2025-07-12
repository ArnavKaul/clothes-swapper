<<<<<<< HEAD
import { useState } from 'react'
import LandingPage from './LandingPage'
import './App.css'
import ItemDetails from './ItemDetails'
<<<<<<< HEAD
import ItemListing from './ItemListing'
import AdminPanel from './AdminPanel'
import UserDashboard from './UserDashboard'
=======
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, Route
import LandingPage from './LandingPage';
import NavBar from './components/ui/navbar'; 
import './App.css';
>>>>>>> c811ff7 (navbar and basic auth)
>>>>>>> f8a847b (navbar and basic auth)

function App() {

  return (
<<<<<<< HEAD
    <>
      <AdminPanel />
    </>
  )
=======
    <Router>
      <NavBar /> 
      <Routes> 
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
>>>>>>> c811ff7 (navbar and basic auth)
}

export default App;
