import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewEmpAllo = ({ emp_no }) => {
  const [allowances, setAllowances] = useState([]);
  const [allowanceTypes, setAllowanceTypes] = useState([]);
  const [payAndBenefits, setPayAndBenefits] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [alloRes, alloTypeRes, payRes] = await Promise.all([
          axios.get("http://localhost:3000/employee_allowance"),
          axios.get("http://localhost:3000/allowance"),
          axios.get("http://localhost:3000/pay_and_benefits"),
        ]);
        const empPay = payRes.data.find(
          (p) => p.emp_no === Number(emp_no)
        );
        setPayAndBenefits(empPay);
        if (empPay) {
          const employeeAllo = alloRes.data.filter(
            (a) => a.pay_and_benefits_id === empPay.pay_and_benefits_id
          );
          setAllowances(employeeAllo);
        } else {
          setAllowances([]);
        }
        setAllowanceTypes(alloTypeRes.data);
      } catch (err) {
        console.error("Error loading allowance data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const getAllowanceType = (id) =>
    allowanceTypes.find((a) => a.allowance_id === id)?.allowance_type || "N/A";

  const handleDelete = async (employee_allowance_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete allowance ${employee_allowance_id}?`,
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
      await axios.delete(`http://localhost:3000/employee_allowance/${employee_allowance_id}`);
      setAllowances(prev => prev.filter(a => a.employee_allowance_id !== employee_allowance_id));
      toast.success("Allowance deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting allowance:", err);
      toast.error("Failed to delete allowance.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Allowance Information
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_emp_allowance" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Allowance
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope="col">Allowance Type</th>
              <th scope="col">Amount</th>
              <th scope="col">Start Date</th>
              <th scope="col">Status</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allowances.length > 0 ? (
              allowances.map((a) => (
                <tr key={a.employee_allowance_id}>
                  <td>{getAllowanceType(a.allowance_id)}</td>
                  <td>{a.allowance_amount ? Number
                    (a.allowance_amount).toLocaleString() : "0.00"}
                  </td>
                  <td>{a.allowance_start_date ? new Date
                    (a.allowance_start_date).toLocaleDateString() : "N/A"}
                  </td>
                  <td>{a.allowance_status}</td>
                  <td>
                    <Link to={`/dashboard/edit_emp_allowance/${a.employee_allowance_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(a.employee_allowance_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5' className='text-center text-muted'>
                  No allowances found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpAllo