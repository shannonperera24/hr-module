import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddForeignMission = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foreign_mission_country: "",
    foreign_mission_description: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleForeignMissionSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      foreign_mission_country: formData.foreign_mission_country,
      foreign_mission_description: formData.foreign_mission_description,
    };

    try {
      await axios.post("http://localhost:3000/foreign_mission", payload);
      toast.success("Foreign mission added successfully!");
      navigate("/dashboard/foreign_mission");
    } catch (error) {
      console.error("Error adding foreign mission:", error);
      toast.error("Failed to add foreign mission");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleForeignMissionSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Country *</label>
                <input type="text" name="foreign_mission_country"
                    className="form-control" placeholder="Enter country name"
                    value={formData.foreign_mission_country} onChange={handleChange}
                    required/>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Description *</label>
                    <textarea name="foreign_mission_description"
                        className="form-control" placeholder="Enter mission description"
                        rows="4" value={formData.foreign_mission_description}
                        onChange={handleChange} required></textarea>
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

export default AddForeignMission