import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpCoMar = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
    date_of_trial: "",
    charges: "",
    verdict: "",
    sentence: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpCoMarSubmit = async (e) => {
    e.preventDefault();

    if (!formData.emp_no) {
      toast.error("Please enter an Emp No");
      return;
    }

    const payload = {
      emp_no: Number(formData.emp_no),
      date_of_trial: formData.date_of_trial,
      charges: formData.charges,
      verdict: formData.verdict,
      sentence: formData.sentence,
    };

    try {
      await axios.post("http://localhost:3000/court_martial_record", payload);
      toast.success("Court martial record added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      navigate(`/dashboard/view_employee/${targetEmpNo}`);
    } catch (error) {
      console.error("Error adding record:", error);
      toast.error("Failed to add record");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpCoMarSubmit}>
            <div className="row g-3">
              {!urlEmpNo && (
                <div className="col-md-6">
                  <label className="form-label">Emp No *</label>
                  <input type="number" name="emp_no" className="form-control"
                    value={formData.emp_no} onChange={handleChange}
                    required/>
                </div>
              )}
                <div className="col-md-6">
                    <label className="form-label">Date of Trial *</label>
                    <input type="date" name="date_of_trial" className="form-control"
                        value={formData.date_of_trial} onChange={handleChange}
                        required/>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Charges *</label>
                    <textarea className="form-control" name="charges"
                        value={formData.charges} onChange={handleChange} required />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Verdict *</label>
                    <textarea className="form-control" name="verdict"
                        value={formData.verdict} onChange={handleChange} required />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Sentence *</label>
                    <textarea className="form-control" name="sentence"
                        value={formData.sentence} onChange={handleChange} required />
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

export default AddEmpCoMar