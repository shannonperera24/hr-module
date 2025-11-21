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
import AddEmpClr from './components/AddEmpClr'
import EditEmpClr from './components/EditEmpClr'
import AddEmpAllo from './components/AddEmpAllo'
import EditEmpAllo from './components/EditEmpAllo'
import AddEmpLoan from './components/AddEmpLoan'
import EditEmpLoan from './components/EditEmpLoan'
import AddEmpCivil from './components/AddEmpCivil'
import EditEmpCivil from './components/EditEmpCivil'
import AddEmpATC from './components/AddEmpATC'
import EditEmpATC from './components/EditEmpATC'
import AddEmpLang from './components/AddEmpLang'
import EditEmpLang from './components/EditEmpLang'
import AddEmpCoSk from './components/AddEmpCoSk'
import EditEmpCoSk from './components/EditEmpCoSk'
import AddEmpAward from './components/AddEmpAward'
import EditEmpAward from './components/EditEmpAward'
import AddEmpCom from './components/AddEmpCom'
import EditEmpCom from './components/EditEmpCom'
import AddEmpFM from './components/AddEmpFM'
import EditEmpFM from './components/EditEmpFM'
import AddEmpSA from './components/AddEmpSA'
import EditEmpSA from './components/EditEmpSA'
import AddEmpMedHis from './components/AddEmpMedHis'
import EditEmpMedHis from './components/EditEmpMedHis'

import Posting from './components/Posting'
import AddPosting from './components/AddPosting'
import EditPosting from './components/EditPosting'
import Rank from './components/Masters/Rank'
import AddRank from './components/Masters/AddRank'
import EditRank from './components/Masters/EditRank'
import CorpAndRegiment from './components/Masters/CorpAndRegiment'
import AddCorpAndReg from './components/Masters/AddCorpAndReg'
import EditCorpAndReg from './components/Masters/EditCorpAndReg'
import Unit from './components/Masters/Unit'
import AddUnit from './components/Masters/AddUnit'
import EditUnit from './components/Masters/EditUnit'
import Appointment from './components/Masters/Appointment'
import AddAppointment from './components/Masters/AddAppointment'
import EditAppointment from './components/Masters/EditAppointment'
import SpecialDuty from './components/Masters/SpecialDuty'
import AddSpecialDuty from './components/Masters/AddSpecialDuty'
import EditSpecialDuty from './components/Masters/EditSpecialDuty'
import OverseasPosting from './components/Masters/OverseasPosting'
import AddOverseasPosting from './components/Masters/AddOverseasPosting'
import EditOverseasPosting from './components/Masters/EditOverseasPosting'

import Pay from './components/Pay'
import Qualification from './components/Qualification'
import Medical from './components/Medical'
import Security from './components/Security'
import Awards from './components/Awards'
import Profile from './components/Profile'

import SecurityClearance from './components/Masters/SecurityClearance'
import AddSecurityClearance from './components/Masters/AddSecurityClearance'
import EditSecurityClearance from './components/Masters/EditSecurityClearance'

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
          <Route path="add_emp_clearance" element={<AddEmpClr />} />
          <Route path="edit_emp_clearance/:employee_clearance_id" element={<EditEmpClr />} />
          <Route path='add_court_martial' element={<AddEmpCoMar />} />
          <Route path='edit_court_martial/:court_martial_record_id' element={<EditEmpCoMar />} />
          <Route path='add_disciplinary_action' element={<AddEmpDisAct />} />
          <Route path='edit_disciplinary_action/:action_id' element={<EditEmpDisAct />} />
          <Route path='add_promotion' element={<AddEmpPromo />} />
          <Route path='edit_promotion/:promotion_id' element={<EditEmpPromo />} />
          <Route path='add_emp_allowance' element={<AddEmpAllo />} />
          <Route path='edit_emp_allowance/:employee_allowance_id' element={<EditEmpAllo />} />
          <Route path='add_loan' element={<AddEmpLoan />} />
          <Route path='edit_loan/:loan_id' element={<EditEmpLoan />} />
          <Route path='add_emp_civil' element={<AddEmpCivil />} />
          <Route path='edit_emp_civil/:qualification_has_civil_id' element={<EditEmpCivil />} />
          <Route path='add_emp_atc' element={<AddEmpATC />} />
          <Route path='edit_emp_atc/:qualification_course_id' element={<EditEmpATC />} />
          <Route path='add_emp_lang' element={<AddEmpLang />} />
          <Route path='edit_emp_lang/:qualification_language_id' element={<EditEmpLang />} />
          <Route path='add_emp_comp_skill' element={<AddEmpCoSk />} />
          <Route path='edit_emp_comp_skill/:qualification_computer_skill_id' element={<EditEmpCoSk />} />
          <Route path='add_emp_award' element={<AddEmpAward />} />
          <Route path='edit_emp_award/:employee_award_id' element={<EditEmpAward />} />
          <Route path='add_emp_commendation' element={<AddEmpCom />} />
          <Route path='edit_emp_commendation/:employee_commendation_id' element={<EditEmpCom />} />
          <Route path='add_emp_fm' element={<AddEmpFM />} />
          <Route path='edit_emp_fm/:employee_foreign_mission_id' element={<EditEmpFM />} />
          <Route path='add_emp_sa' element={<AddEmpSA />} />
          <Route path='edit_emp_sa/:employee_sporting_achievement_id' element={<EditEmpSA />} />
          <Route path='add_medical_history' element={<AddEmpMedHis />} />
          <Route path='edit_medical_history/:medical_history_id' element={<EditEmpMedHis />} />
          <Route path='posting' element={<Posting />} />
          <Route path="add_posting" element={<AddPosting />} />
          <Route path="edit_posting/:posting_id" element={<EditPosting />} />
          <Route path='army_rank' element={<Rank />} />
          <Route path='add_rank' element={<AddRank />} />
          <Route path='edit_rank/:rank_id' element={<EditRank />} />
          <Route path='corp_and_regiment' element={<CorpAndRegiment />} />
          <Route path='add_corp_and_reg' element={<AddCorpAndReg />} />
          <Route path='edit_corp_and_reg/:corp_and_regiment_id' element={<EditCorpAndReg />} />
          <Route path='unit' element={<Unit />} />
          <Route path='add_unit' element={<AddUnit />} />
          <Route path='edit_unit/:unit_id' element={<EditUnit />} />
          <Route path='appointment' element={<Appointment />} />
          <Route path='add_appointment' element={<AddAppointment />} />
          <Route path='edit_appointment/:appointment_id' element={<EditAppointment />} />
          <Route path='special_duty' element={<SpecialDuty />} />
          <Route path='add_special_duty' element={<AddSpecialDuty />} />
          <Route path='edit_special_duty/:special_duty_id' element={<EditSpecialDuty />} />
          <Route path='overseas_posting' element={<OverseasPosting />} />
          <Route path='add_overseas_posting' element={<AddOverseasPosting />} />
          <Route path='edit_overseas_posting/:overseas_posting_id' element={<EditOverseasPosting />} />
          <Route path='pay' element={<Pay />} />
          <Route path='qualification' element={<Qualification />} />
          <Route path='medical' element={<Medical />} />
          <Route path='security' element={<Security />} />
          <Route path='security_clearance' element={<SecurityClearance />} />
          <Route path='add_security_clearance' element={<AddSecurityClearance />} />
          <Route path='edit_security_clearance/:security_clearance_id' element={<EditSecurityClearance />} />
          <Route path='awards' element={<Awards />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
