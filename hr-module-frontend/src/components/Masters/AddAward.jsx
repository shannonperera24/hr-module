import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddAward = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    award_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAwardSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      award_name: formData.award_name
    };

    try {
      await axios.post("http://localhost:3000/award", payload);
      toast.success("Award added successfully!");
      navigate("/dashboard/award_master");
    } catch (error) {
      console.error("Error adding award:", error);
      toast.error("Failed to add award");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleAwardSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Award Name *</label>
                <input type="text" name="award_name"
                  className="form-control" placeholder="Enter award name"
                  value={formData.award_name} onChange={handleChange}
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

export default AddAward