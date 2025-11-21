import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCommendation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    commendation_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCommendationSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      commendation_name: formData.commendation_name
    };

    try {
      await axios.post("http://localhost:3000/commendation", payload);
      toast.success("Commendation added successfully!");
      navigate("/dashboard/commendation");
    } catch (error) {
      console.error("Error adding commendation:", error);
      toast.error("Failed to add commendation");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleCommendationSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Commendation Name *</label>
                <input type="text" name="commendation_name"
                  className="form-control" placeholder="Enter commendation name"
                  value={formData.commendation_name} onChange={handleChange}
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

export default AddCommendation