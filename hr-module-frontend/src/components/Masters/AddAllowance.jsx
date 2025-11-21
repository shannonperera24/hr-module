import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddAllowance = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    allowance_type: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAllowanceSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      allowance_type: formData.allowance_type
    };

    try {
      await axios.post("http://localhost:3000/allowance", payload);
      toast.success("Allowance added successfully!");
      navigate("/dashboard/allowance");
    } catch (error) {
      console.error("Error adding allowance:", error);
      toast.error("Failed to add allowance");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleAllowanceSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Allowance Type *</label>
                <input type="text" name="allowance_type"
                  className="form-control" placeholder="Enter allowance type"
                  value={formData.allowance_type} onChange={handleChange}
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

export default AddAllowance