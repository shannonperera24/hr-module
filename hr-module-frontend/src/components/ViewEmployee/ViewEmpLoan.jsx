import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewEmpLoan = ({ emp_no }) => {
  const [loans, setLoans] = useState([]);
  const [payBenefitsList, setPayBenefitsList] = useState([]);
  const [employeePayBenefits, setEmployeePayBenefits] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [loanRes, payRes] = await Promise.all([
          axios.get("http://localhost:3000/personal_loan"),
          axios.get("http://localhost:3000/pay_and_benefits"),
        ]);
        setPayBenefitsList(payRes.data);
        const empPay = payRes.data.find(
          (p) => p.emp_no === Number(emp_no)
        );
        setEmployeePayBenefits(empPay);
        if (empPay) {
          const filteredLoans = loanRes.data.filter(
            (l) => l.pay_and_benefits_id === empPay.pay_and_benefits_id
          );
          setLoans(filteredLoans);
        } else {
          setLoans([]);
        }
      } catch (err) {
        console.error("Error loading personal loan data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const formatDate = (d) => d ? new Date(d).toLocaleDateString() : "N/A";

  const handleDelete = async (loan_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete loan ${loan_id}?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      buttonsStyling: false,
      customClass: {
        title: "swal-title",
        confirmButton: "confirm-btn",
        cancelButton: "cancel-btn"
      },
    });
    if (!result.isConfirmed) return;
    try {
      await axios.delete(`http://localhost:3000/personal_loan/${loan_id}`);
      setLoans(prev => prev.filter(l => l.loan_id !== loan_id));
      toast.success("Loan deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting loan:", err);
      toast.error("Failed to delete loan.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Personal Loan Information
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_loan" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Loan
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope="col">Loan Amount</th>
              <th scope="col">Loan Date</th>
              <th scope="col">Interest Rate</th>
              <th scope="col">Repayment Start</th>
              <th scope="col">Repayment End</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.length > 0 ? (
              loans.map((l) => (
                <tr key={l.loan_id}>
                  <td>Rs. {Number(l.loan_amount).toLocaleString()}</td>
                  <td>{formatDate(l.loan_date)}</td>
                  <td>{l.interest_rate}%</td>
                  <td>{formatDate(l.repayment_start_date)}</td>
                  <td>{formatDate(l.repayment_end_date)}</td>
                  <td>
                    <Link to={`/dashboard/edit_loan/${l.loan_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(l.loan_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='text-center text-muted'>
                  No loans found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpLoan