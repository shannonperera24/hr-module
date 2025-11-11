import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import { useEffect } from 'react'

import routeTitles from './config/routeTitles'

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
    const title = routeTitles[location.pathname]
      ?`${routeTitles[location.pathname]} | Pay & Record System`: 'Pay & Record System';
    document.title = title;
  }, [location.pathname]);

  return null;
}


function App() {
  return (
    <BrowserRouter>
      <TitleHandler />
      
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path='employee' element={<Employee />} />    
          <Route path='add_employee' element={<AddEmployee />} />
          <Route path='posting' element={<Posting />} />
          <Route path='pay' element={<Pay />} />
          <Route path='qualification' element={<Qualification />} />
          <Route path='medical' element={<Medical />} />
          <Route path='security' element={<Security />} />
          <Route path='awards' element={<Awards />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
