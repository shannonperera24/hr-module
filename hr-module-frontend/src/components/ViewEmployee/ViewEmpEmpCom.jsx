import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewEmpEmpCom = () => {
  const { emp_no } = useParams();
  const [empCommendations, setEmpCommendations] = useState([]);
  const [commendationMaster, setCommendationMaster] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [comRes, comMasRes] = await Promise.all([
          axios.get("http://localhost:3000/employee_commendation"),
          axios.get("http://localhost:3000/commendation")
        ]);
        const filtered = comRes.data.filter(
          (c) => c.emp_no === Number(emp_no)
        );
        setEmpCommendations(filtered);
        setCommendationMaster(comMasRes.data);
      } catch (err) {
        console.error("Error loading commendation data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const getCommendationName = (id) =>
    commendationMaster.find((c) => c.commendation_id === id)?.commendation_name || "N/A";

  const handleDelete = async (employee_commendation_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete commendation ${employee_commendation_id}?`,
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
      await axios.delete(`http://localhost:3000/employee_commendation/${employee_commendation_id}`);
      setEmpCommendations(prev => prev.filter(c => c.employee_commendation_id !== employee_commendation_id));
      toast.success("Commendation deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting commendation:", err);
      toast.error("Failed to delete commendation.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Employee Commendations
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_emp_commendation" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Commendation
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope="col">Commendation</th>
              <th scope="col">Commendation Date</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {empCommendations.length > 0 ? (
              empCommendations.map((c) => (
                <tr key={c.employee_commendation_id}>
                  <td>{getCommendationName(c.commendation_id)}</td>
                  <td>{c.commendation_date ? 
                    new Date(c.commendation_date).toLocaleDateString() : "N/A"}
                  </td>
                  <td>
                    <Link to={`/dashboard/edit_emp_commendation/${c.employee_commendation_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(c.employee_commendation_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No commendations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpEmpCom