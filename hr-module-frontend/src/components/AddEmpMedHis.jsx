import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpMedHis = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [medRecord, setMedRecord] = useState(null);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
    medical_and_health_record_id: "",
    medical_history_date: "",
    medical_history_description: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpMedHisSubmit = async (e) => {
    e.preventDefault();

    if (!formData.medical_and_health_record_id) {
      toast.error("Medical and health record not found");
      return;
    }

    const payload = {
      medical_and_health_record_id: Number(formData.medical_and_health_record_id),
      medical_history_date: formData.medical_history_date,
      medical_history_description: formData.medical_history_description
    };

    try {
      await axios.post("http://localhost:3000/medical_history", payload);
      toast.success("Medical history added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      navigate(`/dashboard/view_employee/${targetEmpNo}`);
    } catch (error) {
      console.error("Error adding medical history:", error);
      toast.error("Failed to add medical history");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const recordRes = await axios.get("http://localhost:3000/medical_and_health_record");
        const record = recordRes.data.find(
          (r) => r.emp_no === Number(urlEmpNo || passedEmpNo)
        );
        if (record) {
          setMedRecord(record);
          setFormData(prev => ({
            ...prev,
            medical_and_health_record_id: record.medical_and_health_record_id
          }));
        }
      } catch (err) {
        console.error("Error loading dependencies:", err);
      }
    };
    loadData();
  }, [urlEmpNo, passedEmpNo]);
      
  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <form onSubmit={handleEmpMedHisSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Medical Record ID</label>
              <input type="text" className="form-control"
                value={formData.medical_and_health_record_id} disabled/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Medical History Date *</label>
              <input type="date" name="medical_history_date"
                className="form-control" value={formData.medical_history_date}
                onChange={handleChange} required/>
            </div>
            <div className="col-md-12">
              <label className="form-label">Description *</label>
              <textarea name="medical_history_description"
                className="form-control" rows="3"
                value={formData.medical_history_description}
                onChange={handleChange} required></textarea>
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

export default AddEmpMedHis