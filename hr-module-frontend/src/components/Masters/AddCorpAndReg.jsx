import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCorpAndReg = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    corp_and_regiment_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCorpAndRegSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      corp_and_regiment_name: formData.corp_and_regiment_name
    };

    try {
      await axios.post("http://localhost:3000/corp_and_regiment", payload);
      toast.success("Corp and regiment added successfully!");
      navigate("/dashboard/corp_and_regiment"); 
    } catch (error) {
      console.error("Error adding corp and regiment:", error);
      toast.error("Failed to add corp and regiment");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleCorpAndRegSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Corp & Regiment Name *</label>
                <input type="text" name="corp_and_regiment_name"
                  className="form-control" placeholder="Enter corps & regiment name"
                  value={formData.corp_and_regiment_name} onChange={handleChange}
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

export default AddCorpAndReg