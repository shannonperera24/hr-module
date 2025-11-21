import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpAward = () => {
  const { employee_award_id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [awardMaster, setAwardMaster] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: "",
    award_id: "",
    award_date: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpAwardEdit = async (e) => {
    e.preventDefault();

    const payload = {
      emp_no: Number(formData.emp_no),
      award_id: formData.award_id ? Number(formData.award_id) : null,
      award_date: formData.award_date,
    };

    try {
      await axios.patch(`http://localhost:3000/employee_award/${employee_award_id}`, payload);
      toast.success("Award updated successfully!");

      const targetEmpNo = formData.emp_no || passedEmpNo;
      if (targetEmpNo) {
        navigate(`/dashboard/view_employee/${targetEmpNo}`);
      } else {
        navigate("/dashboard/awards"); 
      }
    } catch (error) {
      console.error("Error updating award:", error);
      toast.error("Failed to update award");
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

  useEffect(() => {
    const loadAward = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/employee_award/${employee_award_id}`);
        const a = res.data;

        setFormData({
          emp_no: a.emp_no,
          award_id: a.award_id ?? "",
          award_date: a.award_date ? a.award_date.split("T")[0] : "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading award:", err);
        toast.error("Failed to load award");
        setLoading(false);
      }
    };

    loadAward();
  }, [employee_award_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpAwardEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Emp No *</label>
                <input type="number" name="emp_no" className="form-control"
                  value={formData.emp_no} onChange={handleChange}
                  required/>
              </div>
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
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditEmpAward