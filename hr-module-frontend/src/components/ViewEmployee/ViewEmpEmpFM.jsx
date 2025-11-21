import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewEmpEmpFM = () => {
  const { emp_no } = useParams();
  const [empFM, setEmpFM] = useState([]);
  const [fmMaster, setFmMaster] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fmRes, fmMasRes] = await Promise.all([
          axios.get("http://localhost:3000/employee_foreign_mission"),
          axios.get("http://localhost:3000/foreign_mission")
        ]);
        const filtered = fmRes.data.filter(
          (f) => f.emp_no === Number(emp_no)
        );
        setEmpFM(filtered);
        setFmMaster(fmMasRes.data);
      } catch (err) {
        console.error("Error loading foreign mission data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const getFMName = (id) => fmMaster.find((m) => 
    m.foreign_mission_id === id)?.foreign_mission_country || "N/A";

  const handleDelete = async (employee_foreign_mission_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete foreign mission ${employee_foreign_mission_id}?`,
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
      await axios.delete(`http://localhost:3000/employee_foreign_mission/${employee_foreign_mission_id}`);
      setEmpFM(prev => prev.filter(f => f.employee_foreign_mission_id !== employee_foreign_mission_id));
      toast.success("Foreign mission deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting foreign mission:", err);
      toast.error("Failed to delete foreign mission.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Foreign Missions
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_emp_fm" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Foreign Mission
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope="col">Country</th>
              <th scope="col">Description</th>
              <th scope="col">Mission Date</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {empFM.length > 0 ? (
              empFM.map((m) => (
                <tr key={m.employee_foreign_mission_id}>
                  <td>{getFMName(m.foreign_mission_id)}</td>
                  <td>{fmMaster.find( f => 
                    f.foreign_mission_id === m.foreign_mission_id
                    )?.foreign_mission_description || "N/A"}
                  </td>
                  <td>
                    {m.foreign_mission_date ? 
                    new Date(m.foreign_mission_date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <Link to={`/dashboard/edit_emp_fm/${m.employee_foreign_mission_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(m.employee_foreign_mission_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' className='text-center text-muted'>
                  No foreign missions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpEmpFM