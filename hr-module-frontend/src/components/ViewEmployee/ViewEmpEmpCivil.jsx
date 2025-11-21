import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewEmpEmpCivil = ({ emp_no }) => {
  const [qualificationRecord, setQualificationRecord] = useState(null);
  const [civilRecords, setCivilRecords] = useState([]); 
  const [civilMaster, setCivilMaster] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recordRes, civilHasRes, civilMasterRes] = await Promise.all([
          axios.get("http://localhost:3000/qualification_record"),
          axios.get("http://localhost:3000/qualification_has_civil"),
          axios.get("http://localhost:3000/civil_qualification"),
        ]);
        const empRecord = recordRes.data.find(
          (r) => r.emp_no === Number(emp_no)
        );
        setQualificationRecord(empRecord);
        if (empRecord) {
          const filteredCivil = civilHasRes.data.filter(
            (c) => c.qualification_record_id === empRecord.qualification_record_id
          );
          setCivilRecords(filteredCivil);
        } else {
          setCivilRecords([]);
        }
        setCivilMaster(civilMasterRes.data);
      } catch (err) {
        console.error("Error loading civil qualification data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const getCivilName = (id) =>
    civilMaster.find((c) => c.civil_qualification_id === id)?.civil_qualification_name || "N/A";

  const handleDelete = async (qualification_has_civil_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete civil qualification ${qualification_has_civil_id}?`,
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
      await axios.delete(`http://localhost:3000/qualification_has_civil/${qualification_has_civil_id}`);
      setCivilRecords(prev => prev.filter(c => c.qualification_has_civil_id !== qualification_has_civil_id));
      toast.success("Civil qualification deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting civil qualification:", err);
      toast.error("Failed to delete civil qualification.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Civil Qualifications
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_emp_civil" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Civil Qualification
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope="col">Qualification</th>
              <th scope="col">Institution</th>
              <th scope="col">Completed Date</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {civilRecords.length > 0 ? (
              civilRecords.map((q) => (
                <tr key={q.qualification_has_civil_id}>
                  <td>{getCivilName(q.civil_qualification_id)}</td>
                  <td>{q.civil_qualification_institution}</td>
                  <td>{q.civil_qualification_date_completed
                      ? new Date(q.civil_qualification_date_completed)
                      .toLocaleDateString() : "N/A"}
                  </td>
                  <td>
                    <Link to={`/dashboard/edit_emp_civil/${q.qualification_has_civil_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(q.qualification_has_civil_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' className='text-center text-muted'>
                  No civil qualifications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpEmpCivil