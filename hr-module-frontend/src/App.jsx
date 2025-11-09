import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import { useEffect } from 'react'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Employee from './components/Employee'
import Posting from './components/Posting'
import Pay from './components/Pay'
import Qualification from './components/Qualification'
import Medical from './components/Medical'
import Security from './components/Security'
import Awards from './components/Awards'
import Profile from './components/Profile'
import AddEmployee from './components/AddEmployee'

function TitleHandler() {
  const location = useLocation();

  useEffect(() => {
    const routeTitles = {
      '/': 'Login | Pay & Record System',
      '/dashboard': 'Dashboard | Pay & Record System'
    }

    const title = routeTitles[location.pathname] || 'Pay & Record System'; 
    document.title = title;
  }, [location.pathname]);

  return null;
}


function App() {
  return (
    <BrowserRouter>
      <TitleHandler /> {}
      
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/employee' element={<Employee />} />    
        <Route path='/dashboard/posting' element={<Posting />} />
        <Route path='/dashboard/pay' element={<Pay />} />
        <Route path='/dashboard/qualification' element={<Qualification />} />
        <Route path='/dashboard/medical' element={<Medical />} />
        <Route path='/dashboard/security' element={<Security />} />
        <Route path='/dashboard/awards' element={<Awards />} />
        <Route path='/dashboard/profile' element={<Profile />} />
        <Route path='/dashboard/add_employee' element={<AddEmployee />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
