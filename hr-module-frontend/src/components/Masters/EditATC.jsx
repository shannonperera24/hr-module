import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditATC = () => {
  const { course_id } = useParams();
  const [loading, setLoading] = useState(true);
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

  const handleCourseEdit = async (e) => {
    e.preventDefault();

    const payload = {
      course_name: formData.course_name,
    };

    try {
      await axios.patch(
        `http://localhost:3000/army_training_course/${course_id}`,
        payload
      );
      toast.success("Training course updated successfully!");
      navigate("/dashboard/army_training_course");
    } catch (error) {
      console.error("Error updating training course:", error);
      toast.error("Failed to update training course");
    }
  };

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/army_training_course/${course_id}`
        );
        const c = res.data;
        setFormData({
          course_name: c.course_name || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading training course:", err);
        toast.error("Failed to load course");
        setLoading(false);
      }
    };

    loadCourse();
  }, [course_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleCourseEdit}>
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
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditATC