import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddEmpLoan = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [payBenefitsList, setPayBenefitsList] = useState([]);
  const [employeePayBenefits, setEmployeePayBenefits] = useState(null);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
    pay_and_benefits_id: "",
    loan_amount: "",
    loan_date: "",
    interest_rate: "",
    repayment_start_date: "",
    repayment_end_date: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmpLoanSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pay_and_benefits_id) {
      toast.error("Pay and benefits record not found");
      return;
    }

    const payload = {
      pay_and_benefits_id: Number(formData.pay_and_benefits_id),
      loan_amount: Number(formData.loan_amount),
      loan_date: formData.loan_date,
      interest_rate: Number(formData.interest_rate),
      repayment_start_date: formData.repayment_start_date,
      repayment_end_date: formData.repayment_end_date
    };

    try {
      await axios.post("http://localhost:3000/personal_loan", payload);
      toast.success("Loan added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      navigate(`/dashboard/view_employee/${targetEmpNo}`);
    } catch (error) {
      console.error("Error adding loan:", error);
      toast.error("Failed to add loan");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const payRes = await axios.get("http://localhost:3000/pay_and_benefits");
        setPayBenefitsList(payRes.data);
        const empPay = payRes.data.find(
          (p) => p.emp_no === Number(urlEmpNo || passedEmpNo)
        );
        if (empPay) {
          setEmployeePayBenefits(empPay);
          setFormData(prev => ({
            ...prev,
            pay_and_benefits_id: empPay.pay_and_benefits_id
          }));
        }
      } catch (err) {
        console.error("Error loading dependencies:", err);
      }
    };
    loadData();
  }, [urlEmpNo, passedEmpNo]);
      
  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <form onSubmit={handleEmpLoanSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Pay & Benefits ID</label>
              <input type="text" className="form-control"
                value={formData.pay_and_benefits_id} disabled/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Loan Amount *</label>
              <input type="number" name="loan_amount"
                className="form-control" value={formData.loan_amount}
                onChange={handleChange} min="0" required/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Loan Date *</label>
              <input type="date" name="loan_date"
                className="form-control" value={formData.loan_date}
                onChange={handleChange} required/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Interest Rate (%) *</label>
              <input type="number" name="interest_rate"
                className="form-control" value={formData.interest_rate}
                onChange={handleChange} min="0" required/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Repayment Start Date *</label>
              <input type="date" name="repayment_start_date"
                className="form-control" value={formData.repayment_start_date}
                onChange={handleChange} required/>
            </div>
            <div className="col-md-6">
              <label className="form-label">Repayment End Date *</label>
              <input type="date" name="repayment_end_date"
                className="form-control" value={formData.repayment_end_date}
                onChange={handleChange} required/>
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

export default AddEmpLoan