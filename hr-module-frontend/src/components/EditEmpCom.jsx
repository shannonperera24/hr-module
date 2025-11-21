import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpCom = () => {
  const { employee_commendation_id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [commendationMaster, setCommendationMaster] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: "",
    commendation_id: "",
    commendation_date: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpComEdit = async (e) => {
    e.preventDefault();

    const payload = {
      emp_no: Number(formData.emp_no),
      commendation_id: formData.commendation_id ? 
        Number(formData.commendation_id) : null,
      commendation_date: formData.commendation_date,
    };

    try {
      await axios.patch(`http://localhost:3000/employee_commendation/${employee_commendation_id}`, payload);
      toast.success("Commendation updated successfully!");

      const targetEmpNo = formData.emp_no || passedEmpNo;
      if (targetEmpNo) {
        navigate(`/dashboard/view_employee/${targetEmpNo}`);
      } else {
        navigate("/dashboard/awards"); 
      }
    } catch (error) {
      console.error("Error updating commendation:", error);
      toast.error("Failed to update commendation");
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

  useEffect(() => {
    const loadCommendation = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/employee_commendation/${employee_commendation_id}`);
        const c = res.data;

        setFormData({
          emp_no: c.emp_no,
          commendation_id: c.commendation_id ?? "",
          commendation_date: c.commendation_date ? c.commendation_date
            .split("T")[0] : "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading commendation:", err);
        toast.error("Failed to load commendation");
        setLoading(false);
      }
    };

    loadCommendation();
  }, [employee_commendation_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpComEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Emp No *</label>
                <input type="number" name="emp_no" className="form-control"
                  value={formData.emp_no} onChange={handleChange}
                  required/>
              </div>
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
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditEmpCom