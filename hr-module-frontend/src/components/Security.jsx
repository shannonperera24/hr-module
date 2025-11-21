import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const Security = () => {
  const [clearances, setClearances] = useState([]);
  const [securityClearances, setSecurityClearances] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [clrRes, secRes] = await Promise.all([
          axios.get("http://localhost:3000/employee_clearance"),
          axios.get("http://localhost:3000/security_clearance"),
        ]);
        setClearances(clrRes.data);
        setSecurityClearances(secRes.data);
      } catch (err) {
        console.error("Error loading clearance data:", err);
      }
    };
    loadData();
  }, []);

  const getSecurityClearanceName = (id) =>
    securityClearances.find((s) => s.security_clearance_id === id)
    ?.security_clearance_level || "N/A";

  const filteredClearances = clearances.filter((c) =>
    c.emp_no?.toString().includes(searchTerm) ||
    c.employee_clearance_id?.toString().includes(searchTerm)
  );

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
    <div className='employee-page px-5 mt-4'>

      <div className="table-responsive p-4 mb-4">
        <div className="row g-2">
          <div className="col-md-4 col-lg-3">
            <Link to="/dashboard/security_clearance" className="master-btn btn btn-outline-secondary w-100">
              Security Clearances Master
            </Link>
          </div>
        </div>
      </div>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_emp_clearance" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Employee Clearance
        </Link>
      </div>

      <div className='search-bar mb-3'>
        <i className='bi bi-search'></i>
        <input type='text' className='form-control' placeholder='Search...'
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope='col'>Emp No</th>
              <th>Security Level</th>
              <th>Expiry</th>
              <th>Status</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClearances.length > 0 ? (
              filteredClearances.map((c) => (
                <tr key={c.employee_clearance_id}>
                  <td>{c.emp_no}</td>
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
                <td colSpan='5' className='text-center text-muted'>
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

export default Security