import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpCivil = () => {
  const { qualification_has_civil_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [civilMaster, setCivilMaster] = useState([]);

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ civilItemRes, civilMasterRes ] = await Promise.all([
          axios.get(`http://localhost:3000/qualification_has_civil/${qualification_has_civil_id}`),
          axios.get("http://localhost:3000/civil_qualification"),
        ]);

        const civilItem = civilItemRes.data;
        setCivilMaster(civilMasterRes.data);
        
        setFormData({
          qualification_record_id: civilItem.qualification_record_id,
          civil_qualification_id: civilItem.civil_qualification_id,
          civil_qualification_institution: civilItem.civil_qualification_institution,
          civil_qualification_date_completed:
            civilItem.civil_qualification_date_completed?.split("T")[0] || ""
        });
      } catch (err) {
        console.error("Error loading civil qualification:", err);
        toast.error("Failed to load civil qualification");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [qualification_has_civil_id]);

  const handleEmpCivilEdit = async (e) => {
    e.preventDefault();

    const payload = {
      qualification_record_id: Number(formData.qualification_record_id),
      civil_qualification_id: Number(formData.civil_qualification_id),
      civil_qualification_institution: formData.civil_qualification_institution,
      civil_qualification_date_completed: formData.civil_qualification_date_completed
    };

    try {
      await axios.patch(`http://localhost:3000/qualification_has_civil/${qualification_has_civil_id}`, payload);
      toast.success("Civil qualification updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating civil qualification:", error);
      toast.error("Failed to update civil qualification");
    }
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpCivilEdit}>
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
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditEmpCivil