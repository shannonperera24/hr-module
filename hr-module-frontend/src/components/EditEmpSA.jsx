import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpSA = () => {
  const { employee_sporting_achievement_id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [saMaster, setSAMaster] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: "",
    sporting_achievement_id: "",
    achievement_date: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpSAEdit = async (e) => {
    e.preventDefault();

    const payload = {
      emp_no: Number(formData.emp_no),
      sporting_achievement_id: formData.sporting_achievement_id
        ? Number(formData.sporting_achievement_id) : null,
      achievement_date: formData.achievement_date,
    };

    try {
      await axios.patch(`http://localhost:3000/employee_sporting_achievement/${employee_sporting_achievement_id}`, payload);
      toast.success("Sporting achievement updated successfully!");

      const targetEmpNo = formData.emp_no || passedEmpNo;
      if (targetEmpNo) {
        navigate(`/dashboard/view_employee/${targetEmpNo}`);
      } else {
        navigate("/dashboard/awards"); 
      }
    } catch (error) {
      console.error("Error updating sporting achievement:", error);
      toast.error("Failed to update sporting achievement");
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

  useEffect(() => {
    const loadSA = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/employee_sporting_achievement/${employee_sporting_achievement_id}`);
        const s = res.data;

        setFormData({
          emp_no: s.emp_no,
          sporting_achievement_id: s.sporting_achievement_id ?? "",
          achievement_date: s.achievement_date
            ? s.achievement_date.split("T")[0] : "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading sporting achievement:", err);
        toast.error("Failed to load sporting achievement");
        setLoading(false);
      }
    };

    loadSA();
  }, [employee_sporting_achievement_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpSAEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Emp No *</label>
                <input type="number" name="emp_no" className="form-control"
                  value={formData.emp_no} onChange={handleChange}
                  required/>
              </div>
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
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditEmpSA