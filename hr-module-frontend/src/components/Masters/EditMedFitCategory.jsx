import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditMedFitCategory = () => {
  const { medical_fitness_category_id } = useParams();
  const [loading, setLoading] = useState(true);
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

  const handleMedFitCategoryEdit = async (e) => {
    e.preventDefault();

    const payload = {
      fitness_category_name: formData.fitness_category_name,
      fitness_category_description: formData.fitness_category_description,
    };

    try {
      await axios.patch(
        `http://localhost:3000/medical_fitness_category/${medical_fitness_category_id}`,
        payload
      );
      toast.success("Medical Fitness Category updated successfully!");
      navigate("/dashboard/medical_fitness_category");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category");
    }
  };

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/medical_fitness_category/${medical_fitness_category_id}`
        );
        const c = res.data;
        setFormData({
          fitness_category_name: c.fitness_category_name || "",
          fitness_category_description: c.fitness_category_description || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading medical fitness category:", err);
        toast.error("Failed to load category");
        setLoading(false);
      }
    };

    loadCategory();
  }, [medical_fitness_category_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleMedFitCategoryEdit}>
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
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditMedFitCategory