import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddATC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    course_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      course_name: formData.course_name,
    };

    try {
      await axios.post("http://localhost:3000/army_training_course", payload);
      toast.success("Training course added successfully!");
      navigate("/dashboard/army_training_course");
    } catch (error) {
      console.error("Error adding training course:", error);
      toast.error("Failed to add training course");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleCourseSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Course Name *</label>
                <input type="text" name="course_name"
                  className="form-control" placeholder="Enter course name"
                  value={formData.course_name} onChange={handleChange}
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

export default AddATC