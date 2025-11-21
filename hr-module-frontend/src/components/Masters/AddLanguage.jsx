import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddLanguage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    language_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLanguageSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      language_name: formData.language_name,
    };

    try {
      await axios.post("http://localhost:3000/language_proficiency", payload);
      toast.success("Language added successfully!");
      navigate("/dashboard/language_proficiency");
    } catch (error) {
      console.error("Error adding language:", error);
      toast.error("Failed to add language");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleLanguageSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Language Name *</label>
                <input type="text" name="language_name"
                  className="form-control" placeholder="Enter language"
                  value={formData.language_name} onChange={handleChange}
                  required/>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-success px-4">
                Save
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default AddLanguage