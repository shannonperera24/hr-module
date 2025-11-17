import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpPromo = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [ranks, setRanks] = useState([]);
  const [serviceHistory, setServiceHistory] = useState(null);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
    service_history_id: "",
    old_rank_id: "",
    new_rank_id: "",
    promotion_date: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpPromoSubmit = async (e) => {
    e.preventDefault();

    if (!formData.service_history_id) {
      toast.error("Service history not found");
      return;
    }
    if (formData.old_rank_id === formData.new_rank_id) {
      toast.error("Old rank and new rank cannot be the same.");
      return;
    }

    const payload = {
      service_history_id: Number(formData.service_history_id),
      old_rank_id: Number(formData.old_rank_id),
      new_rank_id: Number(formData.new_rank_id),
      promotion_date: formData.promotion_date
    };

    try {
      await axios.post("http://localhost:3000/promotion", payload);
      toast.success("Promotion added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      navigate(`/dashboard/view_employee/${targetEmpNo}`);
    } catch (error) {
      console.error("Error adding promotion:", error);
      toast.error("Failed to add promotion");
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [ rankRes, historyRes ] = await Promise.all([
          axios.get("http://localhost:3000/army_rank"),
          axios.get("http://localhost:3000/service_history"),
        ]);
        setRanks(rankRes.data);
        const empHistory = historyRes.data.find(
          h => h.emp_no === Number(urlEmpNo || passedEmpNo)
        );
        if (empHistory) {
          setServiceHistory(empHistory);
          setFormData(prev => ({
            ...prev,
            service_history_id: empHistory.service_history_id
          }));
        }
      } catch (err) {
        console.error("Error loading promotion dependencies:", err);
      }
    };
    fetchDropdowns();
  }, [urlEmpNo, passedEmpNo]);
      
  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <form onSubmit={handleEmpPromoSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Service History ID</label>
              <input type="text" className="form-control"
                value={formData.service_history_id} disabled/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Old Rank *</label>
              <select name="old_rank_id" className="form-select"
                value={formData.old_rank_id} onChange={handleChange}
                required>
                <option value="">-Select-</option>
                {ranks.map(r => (
                  <option key={r.rank_id} value={r.rank_id}>
                    {r.rank_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">New Rank *</label>
              <select name="new_rank_id" className="form-select"
                value={formData.new_rank_id} onChange={handleChange}
                required>
                <option value="">-Select-</option>
                {ranks.map(r => (
                  <option key={r.rank_id} value={r.rank_id}>
                    {r.rank_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Promotion Date *</label>
              <input type="date" name="promotion_date"
                value={formData.promotion_date} onChange={handleChange}
                className="form-control" required/>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-success px-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmpPromo