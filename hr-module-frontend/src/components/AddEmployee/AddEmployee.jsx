import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import AddEmpStep1 from './AddEmpStep1'
import AddEmpStep2 from './AddEmpStep2'
import AddEmpStep3 from './AddEmpStep3'
import AddEmpStep4 from './AddEmpStep4'
import AddEmpStep5 from './AddEmpStep5'

const AddEmployee = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState(null);
  
  const [formData, setFormData] = useState({
    // Step 1 - Employee table
    nic_no: "", passport_no: "", full_name: "", name_in_sinhala: "", 
    name_in_tamil: "", date_of_birth: "", gender: "", marital_status: "",
    spouse_name: "", number_of_children: "0", religion: "", 
    nationality: "Sri Lankan", photo_id: null,
    //Step 2 - Service history table
    category: "", type_of_service: "", enlistment_date: "", 
    current_status: "", retirement_date: "", service_number_stamp: "",
    //Step 3 - Pay and benefits table
    pay_code: "", basic_pay: "", bank_account_no: "", bank_name: "",
    epf_no: "", insurance_no: "",
    //Step 4 - Qualification record table
    has_instructor_experience: "",
    //Step 5 - Medical and health record table
    blood_group: "", height_cm: "", weight_kg: "", bmi: "", 
    medical_check_date: "", disability: "", 
    medical_fitness_category_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo_id: e.target.files[0] }));
  };

  // Step 1 - Employee submit
  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (key === 'photo_id' && value instanceof File) {
          data.append('photo_id', value);
        } else if (value === "" || value === undefined) {
          data.append(key, null);
        } else {
          data.append(key, value);
        }
      }

      const res = await axios.post("http://localhost:3000/employee", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201 || res.status === 200) {
        const emp_no = res.data.emp_no;
        setEmployeeId(emp_no);
        toast.success("Employee saved successfully!");
        setStep(2);
      }
    } catch (err) {
      console.error("Error adding employee: ", err);
      toast.error("Failed to save employee");
    }
  };

  // Step 2 - Service history submit
  const handleServiceSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId) {
      toast.warn("Employee ID missing. Please complete Step 1 first.");
      return;
    }

    try {
      const payload = {
        emp_no: employeeId,
        category: formData.category,
        type_of_service: formData.type_of_service,
        enlistment_date: formData.enlistment_date,
        current_status: formData.current_status,
        retirement_date: formData.retirement_date,
        service_number_stamp: formData.service_number_stamp,
      };

      const res = await axios.post("http://localhost:3000/service_history", payload);

      if (res.status === 201 || res.status === 200) {
        toast.success("Service information saved successfully!");
        setStep(3);
      }
    } catch (err) {
      console.error("Error adding service information: ", err);
      toast.error("Failed to save service information");
    }
  };

  //Step 3 - Pay and benefits submit
  const handlePaySubmit = async (e) => {
    e.preventDefault();

    if (!employeeId) {
      toast.warn("Employee ID missing. Please complete Step 1 first.");
      return;
    }

    try {
      const payload = {
        emp_no: employeeId,
        pay_code: formData.pay_code,
        basic_pay: parseFloat(formData.basic_pay),
        bank_account_no: formData.bank_account_no,
        bank_name: formData.bank_name,
        epf_no: formData.epf_no || null,
        insurance_no: formData.insurance_no || null,
      };

      Object.keys(payload).forEach(
        (key) => payload[key] === "" && delete payload[key]
      );

      const res = await axios.post("http://localhost:3000/pay_and_benefits", payload);

      if (res.status === 201 || res.status === 200) {
        toast.success("Pay information saved successfully!");
        setStep(4);
      }
    } catch (err) {
      console.error("Error adding pay information: ", err);
      toast.error("Failed to save pay information");
    }
  };

  // Step 4 - Qualification record submit
  const handleInstructorSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId) {
      toast.warn("Employee ID missing. Please complete Step 1 first.");
      return;
    }

    try {
      const payload = {
        emp_no: employeeId,
        has_instructor_experience: formData.has_instructor_experience,
      };

      const res = await axios.post("http://localhost:3000/qualification_record", payload);

      if (res.status === 201 || res.status === 200) {
        toast.success("Instructor experience information saved successfully!");
        setStep(5);
      }
    } catch (err) {
      console.error("Error adding instructor experience information: ", err);
      toast.error("Failed to save instructor experience information");
    }
  };

  // Step 5 - Medical and health record submit
  const handleMedRecSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId) {
      toast.warn("Employee ID missing. Please complete Step 1 first.");
      return;
    }

    try {
      const payload = {
        emp_no: employeeId,
        blood_group: formData.blood_group,
        height_cm: formData.height_cm, 
        weight_kg: formData.weight_kg,
        bmi: formData.bmi, 
        medical_check_date: formData.medical_check_date, 
        disability: formData.disability,
        medical_fitness_category_id: formData.medical_fitness_category_id ? Number(formData.medical_fitness_category_id) : undefined,
      };

      Object.keys(payload).forEach(
        (key) => payload[key] === undefined && delete payload[key]
      );

      const res = await axios.post("http://localhost:3000/medical_and_health_record", payload);

      if (res.status === 201 || res.status === 200) {
        toast.success("Medical & health information saved successfully!");
        navigate('/dashboard/employee');
      }
    } catch (err) {
      console.error("Error adding medical & health information: ", err);
      toast.error("Failed to save medical & health information");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4">
        {step === 1 && (
          <AddEmpStep1 formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} 
          handleEmployeeSubmit={handleEmployeeSubmit}/>
        )}
        {step === 2 && (
          <AddEmpStep2 formData={formData} handleChange={handleChange}
          handleServiceSubmit={handleServiceSubmit}/>
        )}
        {step === 3 && (
          <AddEmpStep3 formData={formData} handleChange={handleChange}
          handlePaySubmit={handlePaySubmit}/>
        )}
        {step === 4 && (
          <AddEmpStep4 formData={formData} handleChange={handleChange}
          handleInstructorSubmit={handleInstructorSubmit}/>
        )}
        {step === 5 && (
          <AddEmpStep5 formData={formData} handleChange={handleChange}
          handleMedRecSubmit={handleMedRecSubmit}/>
        )}
      </div>
    </div>
  )
}

export default AddEmployee