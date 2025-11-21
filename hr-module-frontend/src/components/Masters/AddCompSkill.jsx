import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCompSkill = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    computer_skill_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCompSkillSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      computer_skill_name: formData.computer_skill_name,
    };

    try {
      await axios.post("http://localhost:3000/computer_skill", payload);
      toast.success("Computer skill added successfully!");
      navigate("/dashboard/computer_skill");
    } catch (error) {
      console.error("Error adding computer skill:", error);
      toast.error("Failed to add computer skill");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleCompSkillSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Computer Skill Name *</label>
                <input type="text" name="computer_skill_name"
                  className="form-control" placeholder="Enter computer skill"
                  value={formData.computer_skill_name} onChange={handleChange}
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

export default AddCompSkill