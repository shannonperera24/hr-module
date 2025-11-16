import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewEmpEmpClr = () => {
  const { emp_no } = useParams();
  const [clearances, setClearances] = useState([]);
  const [securityClearances, setSecurityClearances] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [clrRes, secRes] = await Promise.all([
          axios.get("http://localhost:3000/employee_clearance"),
          axios.get("http://localhost:3000/security_clearance")
        ]);
        const filtered = clrRes.data.filter(
          (c) => c.emp_no === Number(emp_no)
        );
        setClearances(filtered);
        setSecurityClearances(secRes.data);
      } catch (err) {
        console.error("Error loading clearance data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const getSecurityClearanceName = (id) =>
    securityClearances.find((s) => s.security_clearance_id === id)
    ?.security_clearance_level || "N/A";

  const handleDelete = async (employee_clearance_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete clearance ${employee_clearance_id}?`,
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
      await axios.delete(`http://localhost:3000/employee_clearance/${employee_clearance_id}`);
      setClearances(prev => prev.filter(c => c.employee_clearance_id !== employee_clearance_id));
      toast.success("Clearance deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting clearance:", err);
      toast.error("Failed to delete clearance.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Employee Clearance Information
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_emp_clearance" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Clearance
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope='col'>Security Clearance</th>
              <th scope='col'>Expiry</th>
              <th scope='col'>Status</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clearances.length > 0 ? (
              clearances.map((c) => (
                <tr key={c.employee_clearance_id}>
                  <td>{getSecurityClearanceName(c.security_clearance_id)}</td>
                  <td>{c.clearance_expiry ? new Date(c.clearance_expiry)
                    .toLocaleDateString() : "N/A"}</td>
                  <td>{c.clearance_status}</td>
                  <td>
                    <Link to={`/dashboard/edit_emp_clearance/${c.employee_clearance_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(c.employee_clearance_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='9' className='text-center text-muted'>
                  No clearances found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpEmpClr