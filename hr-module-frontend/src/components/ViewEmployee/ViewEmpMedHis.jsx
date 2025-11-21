import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewEmpMedHis = ({ emp_no }) => {
  const [medHistory, setMedHistory] = useState([]);
  const [medRecord, setMedRecord] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const recordRes = await axios.get("http://localhost:3000/medical_and_health_record");
        const record = recordRes.data.find(
          (r) => r.emp_no === Number(emp_no)
        );
        setMedRecord(record);
        if (!record) {
          setMedHistory([]);
          return;
        }
        const historyRes = await axios.get("http://localhost:3000/medical_history");
        const filtered = historyRes.data.filter(
          (m) => m.medical_and_health_record_id === record.medical_and_health_record_id
        );
        setMedHistory(filtered);
      } catch (err) {
        console.error("Error loading medical history data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const formatDate = (d) => d ? new Date(d).toLocaleDateString() : "N/A";

  const handleDelete = async (medical_history_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete medical history record ${medical_history_id}?`,
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
      await axios.delete(`http://localhost:3000/medical_history/${medical_history_id}`);
      setMedHistory((prev) => prev.filter((m) => m.medical_history_id !== medical_history_id));
      toast.success("Medical history record deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting medical history:", err);
      toast.error("Failed to delete medical history record.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Medical History
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_medical_history" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Medical History
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medHistory.length > 0 ? (
              medHistory.map((m) => (
                <tr key={m.medical_history_id}>
                  <td>{formatDate(m.medical_history_date)}</td>
                  <td>{m.medical_history_description}</td>
                  <td>
                    <Link to={`/dashboard/edit_medical_history/${m.medical_history_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(m.medical_history_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No medical history found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpMedHis