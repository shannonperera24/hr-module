import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpCom = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [commendationMaster, setCommendationMaster] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
    commendation_id: "",
    commendation_date: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpComSubmit = async (e) => {
    e.preventDefault();

    if (!formData.emp_no) {
      toast.error("Please enter an Emp No");
      return;
    }

    const payload = {
      emp_no: Number(formData.emp_no),
      commendation_id: formData.commendation_id ? Number(formData.commendation_id) : null,
      commendation_date: formData.commendation_date,
    };

    try {
      await axios.post("http://localhost:3000/employee_commendation", payload);
      toast.success("Commendation added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      if (targetEmpNo) {
        navigate(`/dashboard/view_employee/${targetEmpNo}`);
      } else {
        navigate("/dashboard/awards"); 
      }
    } catch (error) {
      console.error("Error adding commendation:", error);
      toast.error("Failed to add commendation");
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const res = await axios.get("http://localhost:3000/commendation");
        setCommendationMaster(res.data);
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
          <form onSubmit={handleEmpComSubmit}>
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
                <label className="form-label">Commendation *</label>
                <select name="commendation_id" className="form-select"
                  value={formData.commendation_id} onChange={handleChange}
                  required>
                  <option value="">-Select-</option>
                  {commendationMaster.map((c) => (
                    <option key={c.commendation_id} value={c.commendation_id}>
                      {c.commendation_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Commendation Date *</label>
                <input type="date" className="form-control"
                  name="commendation_date" value={formData.commendation_date}
                  onChange={handleChange} required/>
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

export default AddEmpCom