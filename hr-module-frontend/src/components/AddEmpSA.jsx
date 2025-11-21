import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpSA = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [saMaster, setSAMaster] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
    sporting_achievement_id: "",
    achievement_date: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpSASubmit = async (e) => {
    e.preventDefault();

    if (!formData.emp_no) {
      toast.error("Please enter an Emp No");
      return;
    }

    const payload = {
      emp_no: Number(formData.emp_no),
      sporting_achievement_id: formData.sporting_achievement_id 
        ? Number(formData.sporting_achievement_id) 
        : null,
      achievement_date: formData.achievement_date,
    };

    try {
      await axios.post("http://localhost:3000/employee_sporting_achievement", payload);
      toast.success("Sporting achievement added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      if (targetEmpNo) {
        navigate(`/dashboard/view_employee/${targetEmpNo}`);
      } else {
        navigate("/dashboard/awards"); 
      }
    } catch (error) {
      console.error("Error adding sporting achievement:", error);
      toast.error("Failed to add sporting achievement");
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const res = await axios.get("http://localhost:3000/sporting_achievement");
        setSAMaster(res.data);
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
          <form onSubmit={handleEmpSASubmit}>
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
                <label className="form-label">Sporting Achievement *</label>
                <select name="sporting_achievement_id" className="form-select"
                  value={formData.sporting_achievement_id} onChange={handleChange}
                  required>
                  <option value="">-Select-</option>
                  {saMaster.map((s) => (
                    <option key={s.sporting_achievement_id} value={s.sporting_achievement_id}>
                      {s.sport} - {s.achievement}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Achievement Date *</label>
                <input type="date" className="form-control"
                  name="achievement_date" value={formData.achievement_date}
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

export default AddEmpSA