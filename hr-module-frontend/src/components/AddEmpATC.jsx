import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpATC = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [qualificationRecord, setQualificationRecord] = useState(null);
  const [courseMaster, setCourseMaster] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
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

  const handleEmpATCSubmit = async (e) => {
    e.preventDefault();

    if (!formData.qualification_record_id) {
      toast.error("Qualification record not found");
      return;
    }

    const payload = {
      qualification_record_id: Number(formData.qualification_record_id),
      course_id: Number(formData.course_id),
      course_institution: formData.course_institution,
      course_date_completed: formData.course_date_completed
    };

    try {
      await axios.post("http://localhost:3000/qualification_army_training_course", payload);
      toast.success("Army training course added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      navigate(`/dashboard/view_employee/${targetEmpNo}`);
    } catch (error) {
      console.error("Error adding army training course:", error);
      toast.error("Failed to add army training course");
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [ recordRes, courseMasterRes ] = await Promise.all([
          axios.get("http://localhost:3000/qualification_record"),
          axios.get("http://localhost:3000/army_training_course"),
        ]);
        setCourseMaster(courseMasterRes.data);
        const empRecord = recordRes.data.find(
          r => r.emp_no === Number(urlEmpNo || passedEmpNo)
        );
        setQualificationRecord(empRecord);
        setFormData(prev => ({
            ...prev,
            qualification_record_id: empRecord.qualification_record_id
        }));
      } catch (err) {
        console.error("Error loading army training course dependencies:", err);
      }
    };
    fetchDropdowns();
  }, [urlEmpNo, passedEmpNo]);
      
  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <form onSubmit={handleEmpATCSubmit}>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmpATC