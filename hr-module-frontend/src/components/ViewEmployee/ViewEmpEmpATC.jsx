import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewEmpEmpATC = ({ emp_no }) => {
  const [qualificationRecord, setQualificationRecord] = useState(null);
  const [atcRecords, setAtcRecords] = useState([]);
  const [courseMaster, setCourseMaster] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recordRes, atcRes, courseRes] = await Promise.all([
          axios.get("http://localhost:3000/qualification_record"),
          axios.get("http://localhost:3000/qualification_army_training_course"),
          axios.get("http://localhost:3000/army_training_course"),
        ]);
        const empRecord = recordRes.data.find(
          (r) => r.emp_no === Number(emp_no)
        );
        setQualificationRecord(empRecord);
        if (empRecord) {
          const filteredATC = atcRes.data.filter(
            (a) => a.qualification_record_id === empRecord.qualification_record_id
          );
          setAtcRecords(filteredATC);
        } else {
          setAtcRecords([]);
        }
        setCourseMaster(courseRes.data);
      } catch (err) {
        console.error("Error loading army training course data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const getCourseName = (id) =>
    courseMaster.find((c) => c.course_id === id)?.course_name || "N/A";

  const handleDelete = async (qualification_course_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete course ${qualification_course_id}?`,
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
      await axios.delete(`http://localhost:3000/qualification_army_training_course/${qualification_course_id}`);
      setAtcRecords(prev => prev.filter(a => a.qualification_course_id !== qualification_course_id));
      toast.success("Army training course deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting army training course:", err);
      toast.error("Failed to delete army training course.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Army Training Courses
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_emp_atc" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Army Training Course
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Institution</th>
              <th scope="col">Completed Date</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {atcRecords.length > 0 ? (
              atcRecords.map((r) => (
                <tr key={r.qualification_course_id}>
                  <td>{getCourseName(r.course_id)}</td>
                  <td>{r.course_institution}</td>
                  <td>{r.course_date_completed ? 
                    new Date(r.course_date_completed)
                    .toLocaleDateString() : "N/A"}
                  </td>
                  <td>
                    <Link to={`/dashboard/edit_emp_atc/${r.qualification_course_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(r.qualification_course_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' className='text-center text-muted'>
                  No army training courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpEmpATC