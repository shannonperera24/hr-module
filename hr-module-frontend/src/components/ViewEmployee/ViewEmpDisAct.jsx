import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewEmpDisAct = () => {
  const { emp_no } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/disciplinary_action");
        const filtered = res.data.filter(
          (r) => r.emp_no === Number(emp_no)
        );
        setRecords(filtered);
      } catch (err) {
        console.error("Error loading disciplinary actions:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const handleDelete = async (action_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete disciplinary action ${action_id}?`,
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
      await axios.delete(`http://localhost:3000/disciplinary_action/${action_id}`);
      setRecords(prev => prev.filter(r => r.action_id !== action_id));      
      toast.success("Record deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting record:", err);
      toast.error("Failed to delete record.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Disciplinary Actions
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_disciplinary_action" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Disciplinary Action
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th>Date of Action</th>
              <th>Action Type</th>
              <th>Outcome</th>
              <th>Reason</th>
              <th>Confidential Remarks</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((r) => (
                <tr key={r.action_id}>
                  <td>{r.date_of_action ? new Date(r.date_of_action)
                    .toLocaleDateString() : "N/A"}
                  </td>
                  <td>{r.action_type}</td>
                  <td>{r.outcome}</td>
                  <td>{r.reason_for_action}</td>
                  <td>{r.confidential_remarks || "—"}</td>
                  <td>
                    <Link to={`/dashboard/edit_disciplinary_action/${r.action_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(r.action_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='text-center text-muted'>
                  No disciplinary actions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpDisAct