import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpDisAct = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
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

  const handleEmpDisActSubmit = async (e) => {
    e.preventDefault();

    if (!formData.emp_no) {
      toast.error("Please enter an Emp No");
      return;
    }

    const payload = {
      emp_no: Number(formData.emp_no),
      date_of_action: formData.date_of_action,
      action_type: formData.action_type,
      outcome: formData.outcome,
      reason_for_action: formData.reason_for_action,
      confidential_remarks: formData.confidential_remarks || null,
    };

    try {
      await axios.post("http://localhost:3000/disciplinary_action", payload);
      toast.success("Disciplinary action added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      navigate(`/dashboard/view_employee/${targetEmpNo}`);
    } catch (error) {
      console.error("Error adding disciplinary action:", error);
      toast.error("Failed to add disciplinary action");
    }
  };

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpDisActSubmit}>
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
                Save
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default AddEmpDisAct