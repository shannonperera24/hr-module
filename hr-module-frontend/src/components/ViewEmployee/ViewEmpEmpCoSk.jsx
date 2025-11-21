import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewEmpEmpCoSk = ({ emp_no }) => {
  const [qualificationRecord, setQualificationRecord] = useState(null);
  const [computerSkillRecords, setComputerSkillRecords] = useState([]);
  const [computerSkillMaster, setComputerSkillMaster] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recordRes, compHasRes, compMasterRes] = await Promise.all([
          axios.get("http://localhost:3000/qualification_record"),
          axios.get("http://localhost:3000/qualification_computer_skill"),
          axios.get("http://localhost:3000/computer_skill"),
        ]);
        const empRecord = recordRes.data.find(
          (r) => r.emp_no === Number(emp_no)
        );
        setQualificationRecord(empRecord);
        if (empRecord) {
          const filtered = compHasRes.data.filter(
            (c) => c.qualification_record_id === empRecord.qualification_record_id
          );
          setComputerSkillRecords(filtered);
        } else {
          setComputerSkillRecords([]);
        }
        setComputerSkillMaster(compMasterRes.data);
      } catch (err) {
        console.error("Error loading computer skill data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const getComputerSkillName = (id) =>
    computerSkillMaster.find((cs) => cs.computer_skill_id === id)?.computer_skill_name || "N/A";

  const handleDelete = async (qualification_computer_skill_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete computer skill ${qualification_computer_skill_id}?`,
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
      await axios.delete(`http://localhost:3000/qualification_computer_skill/${qualification_computer_skill_id}`);
      setComputerSkillRecords(prev => 
        prev.filter(c => c.qualification_computer_skill_id !== qualification_computer_skill_id ));
      toast.success("Computer skill deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting computer skill:", err);
      toast.error("Failed to delete computer skill.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Computer Skills
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_emp_comp_skill" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Computer Skill
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope="col">Computer Skill</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {computerSkillRecords.length > 0 ? (
              computerSkillRecords.map((item) => (
                <tr key={item.qualification_computer_skill_id}>
                  <td>{getComputerSkillName(item.computer_skill_id)}</td>
                  <td>
                    <Link to={`/dashboard/edit_emp_comp_skill/${item.qualification_computer_skill_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(item.qualification_computer_skill_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='2' className='text-center text-muted'>
                  No computer skills found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpEmpCoSk