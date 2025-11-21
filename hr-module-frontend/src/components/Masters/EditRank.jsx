import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditRank = () => {
  const { rank_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rank_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRankEdit = async (e) => {
    e.preventDefault();

    const payload = {
      rank_name: formData.rank_name,
    };

    try {
      await axios.patch(`http://localhost:3000/army_rank/${rank_id}`, payload);
      toast.success("Rank updated successfully!");
      navigate("/dashboard/army_rank"); 
    } catch (error) {
      console.error("Error updating rank:", error);
      toast.error("Failed to update rank");
    }
  };

  useEffect(() => {
    const loadRank = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/army_rank/${rank_id}`);
        const r = res.data;

        setFormData({
          rank_name: r.rank_name || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading rank:", err);
        toast.error("Failed to load rank");
        setLoading(false);
      }
    };

    loadRank();
  }, [rank_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleRankEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Rank Name *</label>
                <input type="text" name="rank_name"
                  className="form-control" placeholder="Enter rank name"
                  value={formData.rank_name} onChange={handleChange}
                  required/>
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

export default EditRank