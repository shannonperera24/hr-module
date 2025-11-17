import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpDisAct = () => {
  const { action_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emp_no: "",
    date_of_action: "",
    action_type: "",
    outcome: "",
    reason_for_action: "",
    confidential_remarks: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpDisActEdit = async (e) => {
    e.preventDefault();

    const payload = {
      emp_no: Number(formData.emp_no),
      date_of_action: formData.date_of_action,
      action_type: formData.action_type,
      outcome: formData.outcome,
      reason_for_action: formData.reason_for_action,
      confidential_remarks: formData.confidential_remarks || null,
    };

    try {
      await axios.patch(`http://localhost:3000/disciplinary_action/${action_id}`, payload);
      toast.success("Disciplinary action updated successfully!");
      navigate(`/dashboard/view_employee/${formData.emp_no}`);
    } catch (error) {
      console.error("Error updating disciplinary action:", error);
      toast.error("Failed to update disciplinary action");
    }
  };

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/disciplinary_action/${action_id}`);
        const r = res.data;

        setFormData({
          emp_no: r.emp_no,
          date_of_action: r.date_of_action
            ? r.date_of_action.split("T")[0] : "",
          action_type: r.action_type || "",
          outcome: r.outcome || "",
          reason_for_action: r.reason_for_action || "",
          confidential_remarks: r.confidential_remarks || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading disciplinary action:", err);
        toast.error("Failed to load disciplinary action");
        setLoading(false);
      }
    };

    loadRecord();
  }, [action_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpDisActEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Emp No *</label>
                <input type="number" name="emp_no" className="form-control"
                  value={formData.emp_no} onChange={handleChange}
                  required/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Date of Action *</label>
                <input type="date" name="date_of_action"
                  className="form-control" value={formData.date_of_action}
                  onChange={handleChange} required/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Action Type *</label>
                <input
                  type="text" name="action_type"
                  className="form-control" value={formData.action_type}
                  onChange={handleChange} required/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Outcome *</label>
                <input type="text" name="outcome"
                  className="form-control" value={formData.outcome}
                  onChange={handleChange} required/>
              </div>
              <div className="col-md-12">
                <label className="form-label">Reason for Action *</label>
                <textarea name="reason_for_action" className="form-control"
                  value={formData.reason_for_action} onChange={handleChange}
                  required/>
              </div>
              <div className="col-md-12">
                <label className="form-label">Confidential Remarks</label>
                <textarea name="confidential_remarks" className="form-control"
                  value={formData.confidential_remarks} onChange={handleChange}/>
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

export default EditEmpDisAct