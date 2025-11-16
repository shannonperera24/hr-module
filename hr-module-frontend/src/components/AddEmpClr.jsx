import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpClr = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [securityClearances, setSecurityClearances] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
    security_clearance_id: "",
    clearance_expiry: "",
    clearance_status: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpClrSubmit = async (e) => {
    e.preventDefault();

    if (!formData.emp_no) {
      toast.error("Please enter an Emp No");
      return;
    }

    const payload = {
      emp_no: Number(formData.emp_no),
      security_clearance_id: formData.security_clearance_id
        ? Number(formData.security_clearance_id) : null,
      clearance_expiry: formData.clearance_expiry,
      clearance_status: formData.clearance_status,
    };

    try {
      await axios.post("http://localhost:3000/employee_clearance", payload);
      toast.success("Clearance added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      if (targetEmpNo) {
        navigate(`/dashboard/view_employee/${targetEmpNo}`);
      } else {
        navigate("/dashboard/security"); 
      }
    } catch (error) {
      console.error("Error adding clearance:", error);
      toast.error("Failed to add clearance");
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const res = await axios.get("http://localhost:3000/security_clearance");
        setSecurityClearances(res.data);
      } catch (error) {
        console.error("Error loading dropdown data:", error);
      }
    };
    fetchDropdowns();
  }, []);

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpClrSubmit}>
            <div className="row g-3">
              {!urlEmpNo && (
                <div className="col-md-6">
                  <label className="form-label">Emp No *</label>
                  <input type="number" name="emp_no" className="form-control"
                    value={formData.emp_no} onChange={handleChange}
                    required/>
                </div>
              )}

              <div className="col-md-6">
                <label className="form-label">Security Clearance Level *</label>
                <select name="security_clearance_id" className="form-select"
                  value={formData.security_clearance_id} onChange={handleChange}
                  required>
                  <option value="">-Select-</option>
                  {securityClearances.map((sc) => (
                    <option key={sc.security_clearance_id} value={sc.security_clearance_id}>
                      {sc.security_clearance_level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Expiry *</label>
                <input type="date" className="form-control" name="clearance_expiry" 
                  value={formData.clearance_expiry} onChange={handleChange}
                  required/>
              </div>

              <div className="col-md-6">
                <label className="form-label">Clearance Status *</label>
                <select name="clearance_status" className="form-select"
                  value={formData.clearance_status} onChange={handleChange}
                  required>
                  <option value="">-Select-</option>
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                  <option value="Revoked">Revoked</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-success px-4">
                Save
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default AddEmpClr