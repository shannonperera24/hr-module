import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewEmpEmpAw = () => {
  const { emp_no } = useParams();
  const [empAwards, setEmpAwards] = useState([]);
  const [awardMaster, setAwardMaster] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [awRes, awMasRes] = await Promise.all([
          axios.get("http://localhost:3000/employee_award"),
          axios.get("http://localhost:3000/award")
        ]);
        const filtered = awRes.data.filter(
          (a) => a.emp_no === Number(emp_no)
        );
        setEmpAwards(filtered);
        setAwardMaster(awMasRes.data);
      } catch (err) {
        console.error("Error loading award data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const getAwardName = (id) =>
    awardMaster.find((a) => a.award_id === id)?.award_name || "N/A";

  const handleDelete = async (employee_award_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete award ${employee_award_id}?`,
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
      await axios.delete(`http://localhost:3000/employee_award/${employee_award_id}`);
      setEmpAwards(prev => prev.filter(a => a.employee_award_id !== employee_award_id));
      toast.success("Award deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting award:", err);
      toast.error("Failed to delete award.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Employee Awards
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_emp_award" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Award
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope="col">Award</th>
              <th scope="col">Award Date</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {empAwards.length > 0 ? (
              empAwards.map((a) => (
                <tr key={a.employee_award_id}>
                  <td>{getAwardName(a.award_id)}</td>
                  <td>{a.award_date ? 
                    new Date(a.award_date).toLocaleDateString() : "N/A"}
                  </td>
                  <td>
                    <Link to={`/dashboard/edit_emp_award/${a.employee_award_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(a.employee_award_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No awards found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpEmpAw