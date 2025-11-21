import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpATC = () => {
  const { qualification_course_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [courseMaster, setCourseMaster] = useState([]);

  const [formData, setFormData] = useState({
    qualification_record_id: "",
    course_id: "",
    course_institution: "",
    course_date_completed: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ atcItemRes, courseMasterRes ] = await Promise.all([
          axios.get(`http://localhost:3000/qualification_army_training_course/${qualification_course_id}`),
          axios.get("http://localhost:3000/army_training_course"),
        ]);

        const atcItem = atcItemRes.data;
        setCourseMaster(courseMasterRes.data);
        
        setFormData({
          qualification_record_id: atcItem.qualification_record_id,
          course_id: atcItem.course_id,
          course_institution: atcItem.course_institution,
          course_date_completed:
            atcItem.course_date_completed?.split("T")[0] || ""
        });
      } catch (err) {
        console.error("Error loading army training course:", err);
        toast.error("Failed to load army training course");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [qualification_course_id]);

  const handleEmpATCEdit = async (e) => {
    e.preventDefault();

    const payload = {
      qualification_record_id: Number(formData.qualification_record_id),
      course_id: Number(formData.course_id),
      course_institution: formData.course_institution,
      course_date_completed: formData.course_date_completed
    };

    try {
      await axios.patch(`http://localhost:3000/qualification_army_training_course/${qualification_course_id}`, payload);
      toast.success("Army training course updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating army training course:", error);
      toast.error("Failed to update army training course");
    }
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpATCEdit}>
            <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Qualification Record ID</label>
                  <input type="text" className="form-control"
                      value={formData.qualification_record_id} disabled/>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Army Training Course *</label>
                  <select name="course_id" className="form-select"
                    value={formData.course_id} onChange={handleChange} required>
                    <option value="">-Select-</option>
                    {courseMaster.map(c => (
                      <option key={c.course_id} value={c.course_id}>
                        {c.course_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Institution *</label>
                  <input type="text" name="course_institution"
                    className="form-control" value={formData.course_institution}
                    onChange={handleChange} required/>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Completed Date *</label>
                  <input type="date" name="course_date_completed"
                    className="form-control" value={formData.course_date_completed}
                    onChange={handleChange} required/>
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

export default EditEmpATC