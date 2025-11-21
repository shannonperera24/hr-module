import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpMedHis = () => {
  const { medical_history_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/medical_history/${medical_history_id}`);

        const med = res.data;
        
        setFormData({
          medical_and_health_record_id: med.medical_and_health_record_id,
          medical_history_date: med.medical_history_date?.split("T")[0] || "",
          medical_history_description: med.medical_history_description
        });

      } catch (err) {
        console.error("Error loading medical history:", err);
        toast.error("Failed to load medical history");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [medical_history_id]);

  const handleEmpMedHisEdit = async (e) => {
    e.preventDefault();

    const payload = {
      medical_and_health_record_id: Number(formData.medical_and_health_record_id),
      medical_history_date: formData.medical_history_date,
      medical_history_description: formData.medical_history_description
    };

    try {
      await axios.patch(`http://localhost:3000/medical_history/${medical_history_id}`, payload);
      toast.success("Medical history updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating medical history:", error);
      toast.error("Failed to update medical history");
    }
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpMedHisEdit}>
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
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditEmpMedHis