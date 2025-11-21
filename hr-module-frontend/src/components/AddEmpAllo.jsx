import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpAllo = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [allowanceTypes, setAllowanceTypes] = useState([]);
  const [payAndBenefits, setPayAndBenefits] = useState(null);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
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

  const handleEmpAlloSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pay_and_benefits_id) {
      toast.error("Pay and benefits record not found");
      return;
    }

    const payload = {
      pay_and_benefits_id: Number(formData.pay_and_benefits_id),
      allowance_id: Number(formData.allowance_id),
      allowance_amount: Number(formData.allowance_amount),
      allowance_start_date: formData.allowance_start_date,
      allowance_status: formData.allowance_status
    };

    try {
      await axios.post("http://localhost:3000/employee_allowance", payload);
      toast.success("Employee allowance added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      navigate(`/dashboard/view_employee/${targetEmpNo}`);
    } catch (error) {
      console.error("Error adding employee allowance:", error);
      toast.error("Failed to add employee allowance");
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [ alloTypeRes, payRes ] = await Promise.all([
          axios.get("http://localhost:3000/allowance"),
          axios.get("http://localhost:3000/pay_and_benefits"),
        ]);
        setAllowanceTypes(alloTypeRes.data);
        const empPay = payRes.data.find(
          p => p.emp_no === Number(urlEmpNo || passedEmpNo)
        );
        if (empPay) {
          setPayAndBenefits(empPay);
          setFormData(prev => ({
            ...prev,
            pay_and_benefits_id: empPay.pay_and_benefits_id
          }));
        }
      } catch (err) {
        console.error("Error loading dependencies:", err);
      }
    };
    fetchDropdowns();
  }, [urlEmpNo, passedEmpNo]);
      
  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <form onSubmit={handleEmpAlloSubmit}>
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmpAllo