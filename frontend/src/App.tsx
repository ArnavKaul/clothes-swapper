import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router, Routes, Route
import LandingPage from './LandingPage';
import NavBar from './components/ui/navbar'; 
import './App.css';

function App() {

  return (
    <Router>
      <NavBar /> 
      <Routes> 
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
