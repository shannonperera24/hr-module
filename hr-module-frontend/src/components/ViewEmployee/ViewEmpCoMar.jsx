import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewEmpCoMar = () => {
  const { emp_no } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/court_martial_record");
        const filtered = res.data.filter(
          (r) => r.emp_no === Number(emp_no)
        );
        setRecords(filtered);
      } catch (err) {
        console.error("Error loading court martial data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const handleDelete = async (court_martial_record_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete court martial record ${court_martial_record_id}?`,
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
      await axios.delete(`http://localhost:3000/court_martial_record/${court_martial_record_id}`);
      setRecords(prev => prev.filter(r => r.court_martial_record_id !== court_martial_record_id));
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
        Court Martial Information
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_court_martial" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Court Martial Record
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th>Date of Trial</th>
              <th>Charges</th>
              <th>Verdict</th>
              <th>Sentence</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((r) => (
                <tr key={r.court_martial_record_id}>
                  <td>{r.date_of_trial ? new Date(r.date_of_trial)
                    .toLocaleDateString() : "N/A"}
                  </td>
                  <td>{r.charges}</td>
                  <td>{r.verdict}</td>
                  <td>{r.sentence}</td>
                  <td>
                    <Link to={`/dashboard/edit_court_martial/${r.court_martial_record_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(r.court_martial_record_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5' className='text-center text-muted'>
                  No court martial records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpCoMar