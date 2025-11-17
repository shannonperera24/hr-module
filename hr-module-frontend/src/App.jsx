import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import { useEffect } from 'react'

import routeTitles from './config/routeTitles'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Home from './components/Home'

import Employee from './components/Employee'
import AddEmployee from './components/AddEmployee/AddEmployee'
import ViewEmployee from './components/ViewEmployee/ViewEmployee'
import EditEmpStep1 from './components/EditEmployee/EditEmpStep1'
import EditEmpStep2 from './components/EditEmployee/EditEmpStep2'
import EditEmpStep3 from './components/EditEmployee/EditEmpStep3'
import EditEmpStep4 from './components/EditEmployee/EditEmpStep4'
import EditEmpStep5 from './components/EditEmployee/EditEmpStep5'
import AddEmpCoMar from './components/AddEmpCoMar'
import EditEmpCoMar from './components/EditEmpCoMar'
import AddEmpDisAct from './components/AddEmpDisAct'
import EditEmpDisAct from './components/EditEmpDisAct'
import AddEmpPromo from './components/AddEmpPromo'
import EditEmpPromo from './components/EditEmpPromo'

import Posting from './components/Posting'
import AddPosting from './components/AddPosting'
import EditPosting from './components/EditPosting'

import Pay from './components/Pay'
import Qualification from './components/Qualification'
import Medical from './components/Medical'

import Security from './components/Security'
import AddEmpClr from './components/AddEmpClr'
import EditEmpClr from './components/EditEmpClr'

import Awards from './components/Awards'
import Profile from './components/Profile'


function TitleHandler() {
  const location = useLocation();

  useEffect(() => {
    let path = location.pathname;
    if (path.startsWith('/dashboard/employee/edit/')) {
      document.title = 'Edit Employee | Pay & Record System';
      return;
    }
    if (path.startsWith('/dashboard/view_employee/')) {
      document.title = 'View Employee | Pay & Record System';
      return;
    }
    const title = routeTitles[path]
      ?`${routeTitles[path]} | Pay & Record System`: 'Pay & Record System';
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
          <Route path='view_employee/:emp_no' element={<ViewEmployee />} />
          <Route path='employee/edit/:emp_no' element={<EditEmpStep1 />} />
          <Route path='employee/edit-service/:emp_no' element={<EditEmpStep2 />} /> 
          <Route path='employee/edit-pay/:emp_no' element={<EditEmpStep3 />} />
          <Route path='employee/edit-instructor/:emp_no' element={<EditEmpStep4 />} /> 
          <Route path='employee/edit-medrec/:emp_no' element={<EditEmpStep5 />} />
          <Route path='add_court_martial' element={<AddEmpCoMar />} />
          <Route path='edit_court_martial/:court_martial_record_id' element={<EditEmpCoMar />} />
          <Route path='add_disciplinary_action' element={<AddEmpDisAct />} />
          <Route path='edit_disciplinary_action/:action_id' element={<EditEmpDisAct />} />
          <Route path='add_promotion' element={<AddEmpPromo />} />
          <Route path='edit_promotion/:promotion_id' element={<EditEmpPromo />} />
          <Route path='posting' element={<Posting />} />
          <Route path='pay' element={<Pay />} />
          <Route path='qualification' element={<Qualification />} />
          <Route path='medical' element={<Medical />} />
          <Route path='security' element={<Security />} />
          <Route path="add_emp_clearance" element={<AddEmpClr />} />
          <Route path="edit_emp_clearance/:employee_clearance_id" element={<EditEmpClr />} />
          <Route path="add_posting" element={<AddPosting />} />
          <Route path="edit_posting/:posting_id" element={<EditPosting />} />
          <Route path='awards' element={<Awards />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
