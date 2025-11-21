import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewEmpEmpLang = ({ emp_no }) => {
  const [qualificationRecord, setQualificationRecord] = useState(null);
  const [languageRecords, setLanguageRecords] = useState([]);
  const [languageMaster, setLanguageMaster] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [recordRes, langHasRes, langMasterRes] = await Promise.all([
          axios.get("http://localhost:3000/qualification_record"),
          axios.get("http://localhost:3000/qualification_language"),
          axios.get("http://localhost:3000/language_proficiency"),
        ]);
        const empRecord = recordRes.data.find(
          (r) => r.emp_no === Number(emp_no)
        );
        setQualificationRecord(empRecord);
        if (empRecord) {
          const filteredLang = langHasRes.data.filter(
            (l) => l.qualification_record_id === empRecord.qualification_record_id
          );
          setLanguageRecords(filteredLang);
        } else {
          setLanguageRecords([]);
        }
        setLanguageMaster(langMasterRes.data);
      } catch (err) {
        console.error("Error loading language qualification data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const getLanguageName = (id) =>
    languageMaster.find((l) => l.language_id === id)?.language_name || "N/A";

  const handleDelete = async (qualification_language_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete language qualification ${qualification_language_id}?`,
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
      await axios.delete(`http://localhost:3000/qualification_language/${qualification_language_id}`);
      setLanguageRecords(prev => prev.filter(l => l.qualification_language_id !== qualification_language_id));
      toast.success("Language proficiency deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting language proficiency:", err);
      toast.error("Failed to delete language proficiency.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Language Proficiency
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_emp_lang" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Language Proficiency
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope="col">Language</th>
              <th scope="col">Proficiency Level</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {languageRecords.length > 0 ? (
              languageRecords.map((l) => (
                <tr key={l.qualification_language_id}>
                  <td>{getLanguageName(l.language_id)}</td>
                  <td>{l.language_proficiency_level}</td>
                  <td>
                    <Link to={`/dashboard/edit_emp_lang/${l.qualification_language_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(l.qualification_language_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No language proficiency records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpEmpLang