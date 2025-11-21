import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddSpecialDuty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    special_duty_type: "",
    special_duty_description: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSpecialDutySubmit = async (e) => {
    e.preventDefault();

    const payload = {
      special_duty_type: formData.special_duty_type,
      special_duty_description: formData.special_duty_description
    };

    try {
      await axios.post("http://localhost:3000/special_duty", payload);
      toast.success("Special duty added successfully!");
      navigate("/dashboard/special_duty");
    } catch (error) {
      console.error("Error adding special duty:", error);
      toast.error("Failed to add special duty");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleSpecialDutySubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Special Duty Type *</label>
                <input type="text" name="special_duty_type"
                  className="form-control" placeholder="Enter duty type"
                  value={formData.special_duty_type} onChange={handleChange}
                  required/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Special Duty Description *</label>
                <input type="text" name="special_duty_description"
                  className="form-control" placeholder="Enter duty description"
                  value={formData.special_duty_description}
                  onChange={handleChange} required/>
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

export default AddSpecialDuty