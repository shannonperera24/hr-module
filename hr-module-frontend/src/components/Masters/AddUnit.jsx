import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddUnit = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    unit_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUnitSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      unit_name: formData.unit_name
    };

    try {
      await axios.post("http://localhost:3000/unit", payload);
      toast.success("Unit added successfully!");
      navigate("/dashboard/unit");
    } catch (error) {
      console.error("Error adding unit:", error);
      toast.error("Failed to add unit");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleUnitSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Unit Name *</label>
                <input type="text" name="unit_name"
                  className="form-control" placeholder="Enter unit name"
                  value={formData.unit_name} onChange={handleChange}
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

export default AddUnit