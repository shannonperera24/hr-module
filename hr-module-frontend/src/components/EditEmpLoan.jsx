import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpLoan = () => {
  const { loan_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [payBenefitsList, setPayBenefitsList] = useState([]);
  const [employeePayBenefits, setEmployeePayBenefits] = useState(null);

  const [formData, setFormData] = useState({
    pay_and_benefits_id: "",
    loan_amount: "",
    loan_date: "",
    interest_rate: "",
    repayment_start_date: "",
    repayment_end_date: "",
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
        const [ loanRes, payRes ] = await Promise.all([
          axios.get(`http://localhost:3000/personal_loan/${loan_id}`),
          axios.get("http://localhost:3000/pay_and_benefits"),
        ]);

        const loan = loanRes.data;
        setPayBenefitsList(payRes.data);
        const empPay = payRes.data.find(
          (p) => p.pay_and_benefits_id === loan.pay_and_benefits_id
        );
        setEmployeePayBenefits(empPay);
        
        setFormData({
          pay_and_benefits_id: loan.pay_and_benefits_id,
          loan_amount: loan.loan_amount,
          loan_date: loan.loan_date?.split("T")[0] || "",
          interest_rate: loan.interest_rate,
          repayment_start_date: loan.repayment_start_date?.split("T")[0] || "",
          repayment_end_date: loan.repayment_end_date?.split("T")[0] || "",
        });

      } catch (err) {
        console.error("Error loading loan:", err);
        toast.error("Failed to load loan");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [loan_id]);

  const handleEmpLoanEdit = async (e) => {
    e.preventDefault();

    const payload = {
      pay_and_benefits_id: Number(formData.pay_and_benefits_id),
      loan_amount: Number(formData.loan_amount),
      loan_date: formData.loan_date,
      interest_rate: Number(formData.interest_rate),
      repayment_start_date: formData.repayment_start_date,
      repayment_end_date: formData.repayment_end_date,
    };

    try {
      await axios.patch(`http://localhost:3000/personal_loan/${loan_id}`, payload);
      toast.success("Loan updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating loan:", error);
      toast.error("Failed to update loan");
    }
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpLoanEdit}>
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
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditEmpLoan