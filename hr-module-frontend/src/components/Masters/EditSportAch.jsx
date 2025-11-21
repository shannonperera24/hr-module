import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditSportAch = () => {
  const { sporting_achievement_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sport: "",
    achievement: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSportAchEdit = async (e) => {
    e.preventDefault();

    const payload = {
      sport: formData.sport,
      achievement: formData.achievement,
    };

    try {
      await axios.patch(
        `http://localhost:3000/sporting_achievement/${sporting_achievement_id}`,
        payload
      );
      toast.success("Sporting achievement updated successfully!");
      navigate("/dashboard/sporting_achievement");
    } catch (error) {
      console.error("Error updating sporting achievement:", error);
      toast.error("Failed to update sporting achievement");
    }
  };

  useEffect(() => {
    const loadSportAch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/sporting_achievement/${sporting_achievement_id}`
        );
        const s = res.data;
        setFormData({
          sport: s.sport || "",
          achievement: s.achievement || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading sporting achievement:", err);
        toast.error("Failed to load sporting achievement");
        setLoading(false);
      }
    };

    loadSportAch();
  }, [sporting_achievement_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleSportAchEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Sport *</label>
                <input type="text" name="sport"
                  className="form-control" placeholder="Enter sport"
                  value={formData.sport} onChange={handleChange}
                  required/>
              </div>

              <div className="col-md-12">
                <label className="form-label">Achievement *</label>
                <textarea name="achievement" className="form-control"
                  placeholder="Enter achievement details" rows="4"
                  value={formData.achievement} onChange={handleChange}
                  required></textarea>
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

export default EditSportAch