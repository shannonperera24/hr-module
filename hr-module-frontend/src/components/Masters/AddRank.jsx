import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddRank = () => {
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

  const handleRankSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      rank_name: formData.rank_name
    };

    try {
      await axios.post("http://localhost:3000/army_rank", payload);
      toast.success("Rank added successfully!");
      navigate("/dashboard/army_rank"); 
    } catch (error) {
      console.error("Error adding rank:", error);
      toast.error("Failed to add rank");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleRankSubmit}>
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
                Save
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default AddRank