import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddOverseasPosting = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    overseas_posting_type: "",
    overseas_posting_country: "",
    overseas_posting_description: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleOverseasPostingSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      overseas_posting_type: formData.overseas_posting_type,
      overseas_posting_country: formData.overseas_posting_country,
      overseas_posting_description: formData.overseas_posting_description
    };

    try {
      await axios.post("http://localhost:3000/overseas_posting", payload);
      toast.success("Overseas posting added successfully!");
      navigate("/dashboard/overseas_posting");
    } catch (error) {
      console.error("Error adding overseas posting:", error);
      toast.error("Failed to add overseas posting");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleOverseasPostingSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Posting Type *</label>
                <input type="text" name="overseas_posting_type"
                  className="form-control" placeholder="Enter posting type"
                  value={formData.overseas_posting_type} onChange={handleChange}
                  required/>
              </div>
              <div className="col-md-4">
                <label className="form-label">Country *</label>
                <input type="text" name="overseas_posting_country"
                  className="form-control" placeholder="Enter country"
                  value={formData.overseas_posting_country} onChange={handleChange}
                  required/>
              </div>
              <div className="col-md-4">
                <label className="form-label">Description *</label>
                <input type="text" name="overseas_posting_description"
                  className="form-control" placeholder="Enter description"
                  value={formData.overseas_posting_description} onChange={handleChange}
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

export default AddOverseasPosting