import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpAward = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [awardMaster, setAwardMaster] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
    award_id: "",
    award_date: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpAwardSubmit = async (e) => {
    e.preventDefault();

    if (!formData.emp_no) {
      toast.error("Please enter an Emp No");
      return;
    }

    const payload = {
      emp_no: Number(formData.emp_no),
      award_id: formData.award_id ? Number(formData.award_id) : null,
      award_date: formData.award_date,
    };

    try {
      await axios.post("http://localhost:3000/employee_award", payload);
      toast.success("Award added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      if (targetEmpNo) {
        navigate(`/dashboard/view_employee/${targetEmpNo}`);
      } else {
        navigate("/dashboard/awards"); 
      }
    } catch (error) {
      console.error("Error adding award:", error);
      toast.error("Failed to add award");
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const res = await axios.get("http://localhost:3000/award");
        setAwardMaster(res.data);
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
          <form onSubmit={handleEmpAwardSubmit}>
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
                <label className="form-label">Award *</label>
                <select name="award_id" className="form-select"
                  value={formData.award_id} onChange={handleChange}
                  required>
                  <option value="">-Select-</option>
                  {awardMaster.map((a) => (
                    <option key={a.award_id} value={a.award_id}>
                      {a.award_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Award Date *</label>
                <input type="date" className="form-control"
                  name="award_date" value={formData.award_date}
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

export default AddEmpAward