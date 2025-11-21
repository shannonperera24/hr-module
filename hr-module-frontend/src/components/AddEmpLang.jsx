import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpLang = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [qualificationRecord, setQualificationRecord] = useState(null);
  const [languageMaster, setLanguageMaster] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
    qualification_record_id: "",
    language_id: "",
    language_proficiency_level: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpLangSubmit = async (e) => {
    e.preventDefault();

    if (!formData.qualification_record_id) {
      toast.error("Qualification record not found");
      return;
    }

    const payload = {
      qualification_record_id: Number(formData.qualification_record_id),
      language_id: Number(formData.language_id),
      language_proficiency_level: formData.language_proficiency_level
    };

    try {
      await axios.post("http://localhost:3000/qualification_language", payload);
      toast.success("Language proficiency added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      navigate(`/dashboard/view_employee/${targetEmpNo}`);
    } catch (error) {
      console.error("Error adding language proficiency:", error);
      toast.error("Failed to add language proficiency");
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [ recordRes, langRes ] = await Promise.all([
          axios.get("http://localhost:3000/qualification_record"),
          axios.get("http://localhost:3000/language_proficiency"),
        ]);
        setLanguageMaster(langRes.data);
        const empRecord = recordRes.data.find(
          r => r.emp_no === Number(urlEmpNo || passedEmpNo)
        );
        setQualificationRecord(empRecord);
        setFormData(prev => ({
            ...prev,
            qualification_record_id: empRecord.qualification_record_id
        }));
      } catch (err) {
        console.error("Error loading language dependencies:", err);
      }
    };
    fetchDropdowns();
  }, [urlEmpNo, passedEmpNo]);
      
  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <form onSubmit={handleEmpLangSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Qualification Record ID</label>
              <input type="text" className="form-control"
                value={formData.qualification_record_id} disabled/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Language *</label>
              <select name="language_id" className="form-select"
                value={formData.language_id} onChange={handleChange}
                required>
                <option value="">-Select-</option>
                {languageMaster.map(lang => (
                  <option key={lang.language_id} value={lang.language_id}>
                    {lang.language_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Proficiency Level *</label>
              <select name="language_proficiency_level" className="form-select"
                value={formData.language_proficiency_level} onChange={handleChange}
                required>
                <option value="">-Select-</option>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Fluent">Fluent</option>
              </select>
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

export default AddEmpLang