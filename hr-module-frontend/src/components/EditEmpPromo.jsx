import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpPromo = () => {
  const { promotion_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [ranks, setRanks] = useState([]);
  const [serviceHistory, setServiceHistory] = useState(null);

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ promoRes, rankRes, historyRes ] = await Promise.all([
          axios.get(`http://localhost:3000/promotion/${promotion_id}`),
          axios.get("http://localhost:3000/army_rank"),
          axios.get("http://localhost:3000/service_history"),
        ]);

        const promo = promoRes.data;
        setRanks(rankRes.data);
        const empHistory = historyRes.data.find(
          h => h.service_history_id === promo.service_history_id
        );
        setServiceHistory(empHistory);
        
        setFormData({
          service_history_id: promo.service_history_id,
          old_rank_id: promo.old_rank_id,
          new_rank_id: promo.new_rank_id,
          promotion_date: promo.promotion_date?.split("T")[0] || "",
        });

      } catch (err) {
        console.error("Error loading promotion:", err);
        toast.error("Failed to load promotion");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [promotion_id]);

  const handleEmpPromoEdit = async (e) => {
    e.preventDefault();

    if (formData.old_rank_id === formData.new_rank_id) {
      toast.error("Old rank and new rank cannot be the same.");
      return;
    }

    const payload = {
      service_history_id: Number(formData.service_history_id),
      old_rank_id: Number(formData.old_rank_id),
      new_rank_id: Number(formData.new_rank_id),
      promotion_date: formData.promotion_date,
    };

    try {
      await axios.patch(`http://localhost:3000/promotion/${promotion_id}`, payload);
      toast.success("Promotion updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating promotion:", error);
      toast.error("Failed to update promotion");
    }
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpPromoEdit}>
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
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditEmpPromo