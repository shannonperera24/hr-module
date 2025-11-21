import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpCivil = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [qualificationRecord, setQualificationRecord] = useState(null);
  const [civilMaster, setCivilMaster] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
    qualification_record_id: "",
    civil_qualification_id: "",
    civil_qualification_institution: "",
    civil_qualification_date_completed: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpCivilSubmit = async (e) => {
    e.preventDefault();

    if (!formData.qualification_record_id) {
      toast.error("Qualification record not found");
      return;
    }

    const payload = {
      qualification_record_id: Number(formData.qualification_record_id),
      civil_qualification_id: Number(formData.civil_qualification_id),
      civil_qualification_institution: formData.civil_qualification_institution,
      civil_qualification_date_completed: formData.civil_qualification_date_completed
    };

    try {
      await axios.post("http://localhost:3000/qualification_has_civil", payload);
      toast.success("Civil qualification added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      navigate(`/dashboard/view_employee/${targetEmpNo}`);
    } catch (error) {
      console.error("Error adding civil qualification:", error);
      toast.error("Failed to add civil qualification");
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [ recordRes, civilMasterRes ] = await Promise.all([
          axios.get("http://localhost:3000/qualification_record"),
          axios.get("http://localhost:3000/civil_qualification"),
        ]);
        setCivilMaster(civilMasterRes.data);
        const empRecord = recordRes.data.find(
          r => r.emp_no === Number(urlEmpNo || passedEmpNo)
        );
        setQualificationRecord(empRecord);
        setFormData(prev => ({
            ...prev,
            qualification_record_id: empRecord.qualification_record_id
        }));
      } catch (err) {
        console.error("Error loading civil qualification dependencies:", err);
      }
    };
    fetchDropdowns();
  }, [urlEmpNo, passedEmpNo]);
      
  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <form onSubmit={handleEmpCivilSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Qualification Record ID</label>
              <input type="text" className="form-control"
                value={formData.qualification_record_id} disabled/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Civil Qualification *</label>
              <select name="civil_qualification_id" className="form-select"
                value={formData.civil_qualification_id} onChange={handleChange}
                required>
                <option value="">-Select-</option>
                {civilMaster.map(c => (
                  <option key={c.civil_qualification_id} value={c.civil_qualification_id}>
                    {c.civil_qualification_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Institution *</label>
              <input type="text" name="civil_qualification_institution"
                className="form-control" value={formData.civil_qualification_institution}
                onChange={handleChange} required/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Completed Date *</label>
              <input type="date" name="civil_qualification_date_completed"
                className="form-control" value={formData.civil_qualification_date_completed}
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

export default AddEmpCivil