import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; 
import ViewEmpCoMar from './ViewEmpCoMar'
import ViewEmpDisAct from './ViewEmpDisAct'
import ViewEmpEmpAw from './ViewEmpEmpAw'
import ViewEmpEmpClr from './ViewEmpEmpClr'
import ViewEmpEmpCom from './ViewEmpEmpCom'
import ViewEmpEmpFM from './ViewEmpEmpFM'
import ViewEmpEmpSA from './ViewEmpEmpSA'
import ViewEmpPos from './ViewEmpPos'
import ViewEmpPromo from "./ViewEmpPromo";

const ViewEmployee = () => {
  const { emp_no } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleEmployeeEdit = () => {
    navigate(`/dashboard/employee/edit/${emp_no}`)
  }

  const handleServiceEdit = () => {
    navigate(`/dashboard/employee/edit-service/${emp_no}`)
  }

  const handlePayEdit = () => {
    navigate(`/dashboard/employee/edit-pay/${emp_no}`)
  }

  const handleInstructorEdit = () => {
    navigate(`/dashboard/employee/edit-instructor/${emp_no}`)
  }

  const handleMedRecEdit = () => {
    navigate(`/dashboard/employee/edit-medrec/${emp_no}`)
  }

  // to display fitness category name
  const [fitCategories, setFitCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/medical_fitness_category")
      .then((res) => setFitCategories(res.data))
      .catch((err) => console.error("Error fetching fitness categories:", err));
  }, []);
  const getFitnessCategoryName = (id) => {
    const category = fitCategories.find(c => c.medical_fitness_category_id === id);
    return category ? category.fitness_category_name : "N/A";
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/${emp_no}`)
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching employee:", err);
        setLoading(false);
      });
  }, [emp_no]);  

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!employee) return <p className="text-center mt-5 text-danger">Employee not found</p>;

  const {
    full_name, nic_no, passport_no, date_of_birth, gender, marital_status,
    religion, nationality, number_of_children, spouse_name, photo_id,
    
    service_history,
    pay_and_benefits,
    qualification_record,
    medical_and_health_record,
    postings,
    employee_clearances,
    court_martial_records,
    disciplinary_actions,
    employee_awards,
    employee_foreign_missions,
    employee_commendations,
    employee_sporting_achievements,
  } = employee; // object destructuring - pulling out specific fields  

  return (
    <div className="add-employee-page px-5 mt-4">

      {/* one to one information */}
      <div className="table-responsive p-4 mb-4">
        <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
          Personal Identification & Bio Data
        </h3>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="p-3 rounded-3 shadow-sm">
              {photo_id ? (
                <img src={`http://localhost:3000/${photo_id}`} alt="Employee"
                className="rounded shadow-sm mb-2" width="180" height="180"
                style={{ objectFit: "cover" }}/>
              ) : (
                <div
                  className="rounded bg-secondary bg-opacity-50 d-flex align-items-center justify-content-center"
                  style={{ width: "160px", height: "160px" }}>
                    <i className="bi bi-person fs-1 text-light"></i>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-8">
            <div className="p-3 rounded-3 shadow-sm">
              <div className="row">
                <div className="col-md-12">
                  <p><strong>Full Name:</strong> {full_name}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>NIC No:</strong> {nic_no}</p>
                  <p><strong>Passport No:</strong> {passport_no || "N/A"}</p>
                  <p><strong>Date of Birth:</strong> {new Date(date_of_birth).toLocaleDateString()}</p>
                  <p><strong>Gender:</strong> {gender}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Marital Status:</strong> {marital_status}</p>
                  <p><strong>Spouse Name:</strong> {spouse_name || "N/A"}</p>
                  <p><strong>Number of Children:</strong> {number_of_children ?? "N/A"}</p>
                  <p><strong>Religion:</strong> {religion}</p>
                  <p><strong>Nationality:</strong> {nationality}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-end mt-3">
          <button className="edit-btn btn btn-outline-warning px-4 py-2"
            onClick={handleEmployeeEdit}>
            <i className="bi bi-pencil-square me-2"></i>Edit
          </button>
        </div>
      </div>

      <div className="table-responsive p-4 mb-4">
        <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
          Service Information
        </h3>
        <div className="p-3 rounded-3 shadow-sm">
          <div className="row g-3">
            <div className="col-md-6">
              <p><strong>Category:</strong> {service_history.category}</p>
              <p><strong>Type of Service:</strong> {service_history.type_of_service}</p>
              <p><strong>Current Status:</strong> {service_history.current_status}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Enlistment Date:</strong> {new Date(service_history.enlistment_date).toLocaleDateString()}</p>
              <p><strong>Retirement Date:</strong> {service_history.retirement_date ? new Date(service_history.retirement_date).toLocaleDateString() : "N/A"}</p>
              <p><strong>Service Number Stamp:</strong> {service_history.service_number_stamp}</p>
            </div>
          </div>
        </div>
        <div className="text-end mt-3">
          <button className="edit-btn btn btn-outline-warning px-4 py-2"
            onClick={handleServiceEdit}>
            <i className="bi bi-pencil-square me-2"></i>Edit
          </button>
        </div>
      </div>

      <div className="table-responsive p-4 mb-4">
        <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
          Pay Information
        </h3>
        <div className="p-3 rounded-3 shadow-sm">
          <div className="row g-3">
            <div className="col-md-6">
              <p><strong>Pay Code:</strong> {pay_and_benefits.pay_code}</p>
              <p><strong>Basic Pay:</strong> Rs. {Number(pay_and_benefits.basic_pay).toLocaleString()}</p>
              <p><strong>Bank Name:</strong> {pay_and_benefits.bank_name}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Bank Account No:</strong> {pay_and_benefits.bank_account_no}</p>
              <p><strong>EPF No:</strong> {pay_and_benefits.epf_no || "N/A"}</p>
              <p><strong>Insurance No:</strong> {pay_and_benefits.insurance_no || "N/A"}</p>
            </div>
          </div>
        </div>
        <div className="text-end mt-3">
          <button className="edit-btn btn btn-outline-warning px-4 py-2"
            onClick={handlePayEdit}>
            <i className="bi bi-pencil-square me-2"></i>Edit
          </button>
        </div>
      </div>

      <div className="table-responsive p-4 mb-4">
        <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
          Instructor Experience Information
        </h3>
        <div className="p-3 rounded-3 shadow-sm">
          <div className="row g-3">
            <div className="col-md-6">
              <p><strong>Has Instructor Experience:</strong> {qualification_record.has_instructor_experience}</p>
            </div>
          </div>
        </div>
        <div className="text-end mt-3">
          <button className="edit-btn btn btn-outline-warning px-4 py-2"
            onClick={handleInstructorEdit}>
            <i className="bi bi-pencil-square me-2"></i>Edit
          </button>
        </div>
      </div>

      <div className="table-responsive p-4 mb-4">
        <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
          Medical & Health Information
        </h3>
        <div className="p-3 rounded-3 shadow-sm">
          <div className="row g-3">
            <div className="col-md-6">
              <p><strong>Blood Group:</strong> {medical_and_health_record.blood_group}</p>
              <p><strong>Height (cm):</strong> {medical_and_health_record.height_cm}</p>
              <p><strong>Weight (kg):</strong> {medical_and_health_record.weight_kg}</p>
              <p><strong>BMI:</strong> {medical_and_health_record.bmi}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Medical Check Date:</strong> {new Date(medical_and_health_record.medical_check_date).toLocaleDateString()}</p>
              <p><strong>Disability:</strong> {medical_and_health_record.disability || "N/A"}</p>
              <p><strong>Fitness Category:</strong> {getFitnessCategoryName(medical_and_health_record.medical_fitness_category_id)}</p>
            </div>
          </div>
        </div>
        <div className="text-end mt-3">
          <button className="edit-btn btn btn-outline-warning px-4 py-2"
            onClick={handleMedRecEdit}>
            <i className="bi bi-pencil-square me-2"></i>Edit
          </button>
        </div>
      </div>

      {/* one to many information */}
      <ViewEmpPos postings={postings} />
      <ViewEmpEmpClr clearances={employee_clearances} />
      <ViewEmpCoMar courtMartialRecords={court_martial_records} />
      <ViewEmpDisAct disciplinaryActions={disciplinary_actions} />
      <ViewEmpEmpAw awards={employee_awards} />
      <ViewEmpEmpFM missions={employee_foreign_missions} />
      <ViewEmpEmpCom commendations={employee_commendations} />
      <ViewEmpEmpSA sports={employee_sporting_achievements} />
      <ViewEmpPromo emp_no={emp_no} />
    </div>
  )
}

export default ViewEmployee
