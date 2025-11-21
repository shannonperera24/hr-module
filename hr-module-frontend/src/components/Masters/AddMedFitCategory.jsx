import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddMedFitCategory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fitness_category_name: "",
    fitness_category_description: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleMedFitCategorySubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fitness_category_name: formData.fitness_category_name,
      fitness_category_description: formData.fitness_category_description,
    };

    try {
      await axios.post("http://localhost:3000/medical_fitness_category", payload);
      toast.success("Medical Fitness Category added successfully!");
      navigate("/dashboard/medical_fitness_category");
    } catch (error) {
      console.error("Error adding medical fitness category:", error);
      toast.error("Failed to add category");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleMedFitCategorySubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Category Name *</label>
                <input type="text" name="fitness_category_name"
                  className="form-control" placeholder="Enter category name (max 5 chars)"
                  maxLength={5} value={formData.fitness_category_name}
                  onChange={handleChange} required/>
              </div>

              <div className="col-md-12">
                <label className="form-label">Description *</label>
                <textarea name="fitness_category_description"
                  className="form-control" placeholder="Enter category description"
                  rows="3" value={formData.fitness_category_description}
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

export default AddMedFitCategory