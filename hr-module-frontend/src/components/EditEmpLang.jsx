import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpLang = () => {
  const { qualification_language_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [languageMaster, setLanguageMaster] = useState([]);

  const [formData, setFormData] = useState({
    qualification_record_id: "",
    language_id: "",
    language_proficiency_level: "",
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
        const [ langItemRes, langMasterRes ] = await Promise.all([
          axios.get(`http://localhost:3000/qualification_language/${qualification_language_id}`),
          axios.get("http://localhost:3000/language_proficiency"),
        ]);

        const langItem = langItemRes.data;
        setLanguageMaster(langMasterRes.data);
        
        setFormData({
          qualification_record_id: langItem.qualification_record_id,
          language_id: langItem.language_id,
          language_proficiency_level: langItem.language_proficiency_level
        });
      } catch (err) {
        console.error("Error loading language qualification:", err);
        toast.error("Failed to load language qualification");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [qualification_language_id]);

  const handleEmpLangEdit = async (e) => {
    e.preventDefault();

    const payload = {
      qualification_record_id: Number(formData.qualification_record_id),
      language_id: Number(formData.language_id),
      language_proficiency_level: formData.language_proficiency_level,
    };

    try {
      await axios.patch(`http://localhost:3000/qualification_language/${qualification_language_id}`, payload);
      toast.success("Language proficiency updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating language proficiency:", error);
      toast.error("Failed to update language proficiency");
    }
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpLangEdit}>
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
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditEmpLang