import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddSportAch = () => {
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

  const handleSportAchSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      sport: formData.sport,
      achievement: formData.achievement,
    };

    try {
      await axios.post("http://localhost:3000/sporting_achievement", payload);
      toast.success("Sporting achievement added successfully!");
      navigate("/dashboard/sporting_achievement");
    } catch (error) {
      console.error("Error adding sporting achievement:", error);
      toast.error("Failed to add sporting achievement");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleSportAchSubmit}>
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
                Save
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  )
}

export default AddSportAch