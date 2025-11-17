import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpCoMar = () => {
  const { court_martial_record_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emp_no: "",
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

  const handleEmpCoMarEdit = async (e) => {
    e.preventDefault();

    const payload = {
      emp_no: Number(formData.emp_no),
      date_of_trial: formData.date_of_trial,
      charges: formData.charges,
      verdict: formData.verdict,
      sentence: formData.sentence,
    };

    try {
      await axios.patch(`http://localhost:3000/court_martial_record/${court_martial_record_id}`, payload);
      toast.success("Court martial record updated successfully!");
      navigate(`/dashboard/view_employee/${formData.emp_no}`);
    } catch (error) {
      console.error("Error updating record:", error);
      toast.error("Failed to update record");
    }
  };

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/court_martial_record/${court_martial_record_id}`);
        const r = res.data;

        setFormData({
          emp_no: r.emp_no,
          date_of_trial: r.date_of_trial
            ? r.date_of_trial.split("T")[0] : "",
          charges: r.charges || "",
          verdict: r.verdict || "",
          sentence: r.sentence || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading record:", err);
        toast.error("Failed to load record");
        setLoading(false);
      }
    };

    loadRecord();
  }, [court_martial_record_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpCoMarEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Emp No *</label>
                <input type="number" name="emp_no" className="form-control"
                  value={formData.emp_no} onChange={handleChange}
                  required/>
              </div>
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
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditEmpCoMar