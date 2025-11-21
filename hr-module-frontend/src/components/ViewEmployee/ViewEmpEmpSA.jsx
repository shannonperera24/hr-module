import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewEmpEmpSA = () => {
  const { emp_no } = useParams();
  const [empSA, setEmpSA] = useState([]);
  const [saMaster, setSAMaster] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [saRes, saMasRes] = await Promise.all([
          axios.get("http://localhost:3000/employee_sporting_achievement"),
          axios.get("http://localhost:3000/sporting_achievement")
        ]);
        const filtered = saRes.data.filter(
          (s) => s.emp_no === Number(emp_no)
        );
        setEmpSA(filtered);
        setSAMaster(saMasRes.data);
      } catch (err) {
        console.error("Error loading sporting achievement data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const getSAName = (id) => {
    const sa = saMaster.find((s) => s.sporting_achievement_id === id);
    return sa ? `${sa.sport} - ${sa.achievement}` : "N/A";
  };

  const handleDelete = async (employee_sporting_achievement_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete sporting achievement ${employee_sporting_achievement_id}?`,
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
      await axios.delete(`http://localhost:3000/employee_sporting_achievement/${employee_sporting_achievement_id}`);
      setEmpSA(prev => prev.filter(s => s.employee_sporting_achievement_id !== employee_sporting_achievement_id));
      toast.success("Sporting achievement deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting sporting achievement:", err);
      toast.error("Failed to delete sporting achievement.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Sporting Achievements
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_emp_sa" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Sporting Achievement
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope="col">Sport / Achievement</th>
              <th scope="col">Achievement Date</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {empSA.length > 0 ? (
              empSA.map((s) => (
                <tr key={s.employee_sporting_achievement_id}>
                  <td>{getSAName(s.sporting_achievement_id)}</td>
                  <td>{s.achievement_date ? 
                    new Date(s.achievement_date).toLocaleDateString() : "N/A"}
                  </td>
                  <td>
                    <Link to={`/dashboard/edit_emp_sa/${s.employee_sporting_achievement_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(s.employee_sporting_achievement_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No sporting achievements found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpEmpSA