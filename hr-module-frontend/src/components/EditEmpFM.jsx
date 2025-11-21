import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpFM = () => {
  const { employee_foreign_mission_id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [fmMaster, setFMMaster] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: "",
    foreign_mission_id: "",
    foreign_mission_date: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpFMEdit = async (e) => {
    e.preventDefault();

    const payload = {
      emp_no: Number(formData.emp_no),
      foreign_mission_id: formData.foreign_mission_id ? Number(formData.foreign_mission_id) : null,
      foreign_mission_date: formData.foreign_mission_date,
    };

    try {
      await axios.patch(`http://localhost:3000/employee_foreign_mission/${employee_foreign_mission_id}`, payload);
      toast.success("Foreign mission updated successfully!");

      const targetEmpNo = formData.emp_no || passedEmpNo;
      if (targetEmpNo) {
        navigate(`/dashboard/view_employee/${targetEmpNo}`);
      } else {
        navigate("/dashboard/awards"); 
      }
    } catch (error) {
      console.error("Error updating foreign mission:", error);
      toast.error("Failed to update foreign mission");
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const res = await axios.get("http://localhost:3000/foreign_mission");
        setFMMaster(res.data);
      } catch (error) {
        console.error("Error loading dropdown data:", error);
      }
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    const loadFM = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/employee_foreign_mission/${employee_foreign_mission_id}`);
        const fm = res.data;

        setFormData({
          emp_no: fm.emp_no,
          foreign_mission_id: fm.foreign_mission_id ?? "",
          foreign_mission_date: fm.foreign_mission_date ? fm.foreign_mission_date.split("T")[0] : "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading foreign mission:", err);
        toast.error("Failed to load foreign mission");
        setLoading(false);
      }
    };

    loadFM();
  }, [employee_foreign_mission_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpFMEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Emp No *</label>
                <input type="number" name="emp_no" className="form-control"
                  value={formData.emp_no} onChange={handleChange}
                  required/>
              </div>
              <div className="col-md-6">
                    <label className="form-label">Foreign Mission *</label>
                    <select name="foreign_mission_id" className="form-select"
                        value={formData.foreign_mission_id} onChange={handleChange}
                        required>
                        <option value="">-Select-</option>
                        {fmMaster.map((fm) => (
                        <option key={fm.foreign_mission_id} value={fm.foreign_mission_id}>
                            {fm.foreign_mission_country}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Mission Date *</label>
                    <input type="date" className="form-control"
                        name="foreign_mission_date" value={formData.foreign_mission_date}
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

export default EditEmpFM