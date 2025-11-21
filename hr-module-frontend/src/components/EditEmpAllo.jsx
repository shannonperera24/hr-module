import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpAllo = () => {
  const { employee_allowance_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [allowanceTypes, setAllowanceTypes] = useState([]);
  const [payAndBenefits, setPayAndBenefits] = useState(null);

  const [formData, setFormData] = useState({
    pay_and_benefits_id: "",
    allowance_id: "",
    allowance_amount: "",
    allowance_start_date: "",
    allowance_status: ""
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
        const [ alloRes, payRes, empAlloRes ] = await Promise.all([
          axios.get("http://localhost:3000/allowance"),
          axios.get("http://localhost:3000/pay_and_benefits"),
          axios.get(`http://localhost:3000/employee_allowance/${employee_allowance_id}`),
        ]);

        const empAllo = empAlloRes.data;
        setAllowanceTypes(alloRes.data);
        const payRecord = payRes.data.find(
          p => p.pay_and_benefits_id === empAllo.pay_and_benefits_id
        );
        setPayAndBenefits(payRecord);
        
        setFormData({
          pay_and_benefits_id: empAllo.pay_and_benefits_id,
          allowance_id: empAllo.allowance_id,
          allowance_amount: empAllo.allowance_amount,
          allowance_start_date: empAllo.allowance_start_date?.split("T")[0] || "",
          allowance_status: empAllo.allowance_status
        });

      } catch (err) {
        console.error("Error loading allowance:", err);
        toast.error("Failed to load allowance");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [employee_allowance_id]);

  const handleEmpAlloEdit = async (e) => {
    e.preventDefault();

    const payload = {
      pay_and_benefits_id: Number(formData.pay_and_benefits_id),
      allowance_id: Number(formData.allowance_id),
      allowance_amount: Number(formData.allowance_amount),
      allowance_start_date: formData.allowance_start_date,
      allowance_status: formData.allowance_status
    };

    try {
      await axios.patch(`http://localhost:3000/employee_allowance/${employee_allowance_id}`, payload);
      toast.success("Employee allowance updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating employee allowance:", error);
      toast.error("Failed to update employee allowance");
    }
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpAlloEdit}>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Pay & Benefits ID</label>
                    <input type="text" className="form-control"
                        value={formData.pay_and_benefits_id} disabled/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Allowance Type *</label>
                    <select name="allowance_id" className="form-select"
                        value={formData.allowance_id} onChange={handleChange}
                        required>
                        <option value="">-Select-</option>
                        {allowanceTypes.map(a => (
                        <option key={a.allowance_id} value={a.allowance_id}>
                            {a.allowance_type}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Allowance Amount *</label>
                    <input type="number" name="allowance_amount"
                        className="form-control" value={formData.allowance_amount}
                        onChange={handleChange} required min="0" step="0.01"/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Start Date *</label>
                    <input type="date" name="allowance_start_date"
                        className="form-control" value={formData.allowance_start_date}
                        onChange={handleChange} required/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Status *</label>
                    <select name="allowance_status" className="form-select"
                        value={formData.allowance_status} onChange={handleChange}
                        required>
                        <option value="">-Select-</option>
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Ended">Ended</option>
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

export default EditEmpAllo