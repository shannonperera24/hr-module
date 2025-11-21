import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpCoSk = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [qualificationRecord, setQualificationRecord] = useState(null);
  const [computerSkillMaster, setComputerSkillMaster] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
    qualification_record_id: "",
    computer_skill_id: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpCoSkSubmit = async (e) => {
    e.preventDefault();

    if (!formData.qualification_record_id) {
      toast.error("Qualification record not found");
      return;
    }

    const payload = {
      qualification_record_id: Number(formData.qualification_record_id),
      computer_skill_id: Number(formData.computer_skill_id)
    };

    try {
      await axios.post("http://localhost:3000/qualification_computer_skill", payload);
      toast.success("Computer skill added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      navigate(`/dashboard/view_employee/${targetEmpNo}`);
    } catch (error) {
      console.error("Error adding computer skill:", error);
      toast.error("Failed to add computer skill");
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [ recordRes, compMasterRes ] = await Promise.all([
          axios.get("http://localhost:3000/qualification_record"),
          axios.get("http://localhost:3000/computer_skill"),
        ]);
        setComputerSkillMaster(compMasterRes.data);
        const empRecord = recordRes.data.find(
          r => r.emp_no === Number(urlEmpNo || passedEmpNo)
        );
        setQualificationRecord(empRecord);
        setFormData(prev => ({
            ...prev,
            qualification_record_id: empRecord.qualification_record_id
        }));
      } catch (err) {
        console.error("Error loading computer skill dependencies:", err);
      }
    };
    fetchDropdowns();
  }, [urlEmpNo, passedEmpNo]);
      
  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <form onSubmit={handleEmpCoSkSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Qualification Record ID</label>
              <input type="text" className="form-control"
                value={formData.qualification_record_id} disabled/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Computer Skill *</label>
              <select name="computer_skill_id" className="form-select"
                value={formData.computer_skill_id} onChange={handleChange}
                required>
                <option value="">-Select-</option>
                {computerSkillMaster.map(skill => (
                  <option key={skill.computer_skill_id} value={skill.computer_skill_id}>
                    {skill.computer_skill_name}
                  </option>
                ))}
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

export default AddEmpCoSk