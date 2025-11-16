import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpClr = () => {
  const { employee_clearance_id  } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [securityClearances, setSecurityClearances] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: "",
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

  const handleEmpClrEdit = async (e) => {
    e.preventDefault();

    const payload = {
      emp_no: Number(formData.emp_no),
      security_clearance_id: formData.security_clearance_id
        ? Number(formData.security_clearance_id) : null,
      clearance_expiry: formData.clearance_expiry,
      clearance_status: formData.clearance_status,
    };

    try {
      await axios.patch(`http://localhost:3000/employee_clearance/${employee_clearance_id}`, payload);
      toast.success("Clearance updated successfully!");

      const targetEmpNo = formData.emp_no || passedEmpNo;
      if (targetEmpNo) {
        navigate(`/dashboard/view_employee/${targetEmpNo}`);
      } else {
        navigate("/dashboard/security"); 
      }
    } catch (error) {
      console.error("Error updating clearance:", error);
      toast.error("Failed to update clearance");
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

  useEffect(() => {
    const loadClearance = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/employee_clearance/${employee_clearance_id}`);
        const c = res.data;

        setFormData({
          emp_no: c.emp_no,
          security_clearance_id: c.security_clearance_id ?? "",
          clearance_expiry: c.clearance_expiry
            ? c.clearance_expiry.split("T")[0] : "",
          clearance_status: c.clearance_status,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading clearance:", err);
        toast.error("Failed to load clearance");
        setLoading(false);
      }
    };

    loadClearance();
  }, [employee_clearance_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpClrEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Emp No *</label>
                <input type="number" name="emp_no" className="form-control"
                  value={formData.emp_no} onChange={handleChange}
                  required/>
              </div>
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
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditEmpClr