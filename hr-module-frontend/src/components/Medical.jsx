import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const Medical = () => {
  const [medicalList, setMedicalList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/medical_and_health_record");
        setMedicalList(res.data);
      } catch (err) {
        console.error("Error loading medical records:", err);
      }
    };
    loadData();
  }, []);

  const filteredMedical = medicalList.filter((m) =>
    m.emp_no?.toString().includes(searchTerm) ||
    m.blood_group?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (medical_and_health_record_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete medical and health record ${medical_and_health_record_id}?`,
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
      await axios.delete(`http://localhost:3000/medical_and_health_record/${medical_and_health_record_id}`);
      setMedicalList(prev =>
        prev.filter(m => m.medical_and_health_record_id !== medical_and_health_record_id)
      );
      toast.success("Record deleted successfully!");
    } catch (err) {
      console.error("Error deleting medical record:", err);
      toast.error("Failed to delete record");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>

      <div className="table-responsive p-4 mb-4">
        <div className="row g-2">
          <div className="col-md-4 col-lg-3">
            <Link to="/dashboard/medical_fitness_category" className="master-btn btn btn-outline-secondary w-100">
              Medical Fitness Category Master
            </Link>
          </div>
        </div>
      </div>

      <div className='search-bar mb-3'>
        <i className='bi bi-search'></i>
        <input type='text' className='form-control' placeholder='Search...'
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th>Emp No</th>
              <th>Blood Group</th>
              <th>Height (cm)</th>
              <th>Weight (kg)</th>
              <th>BMI</th>
              <th>Medical Check Date</th>
              <th>Disability</th>
              <th>Fitness Category</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedical.length > 0 ? (
              filteredMedical.map((m) => (
                <tr key={m.medical_and_health_record_id}>
                  <td>{m.emp_no}</td>
                  <td>{m.blood_group}</td>
                  <td>{m.height_cm}</td>
                  <td>{m.weight_kg}</td>
                  <td>{m.bmi}</td>
                  <td>{new Date(m.medical_check_date).toLocaleDateString()}</td>
                  <td>{m.disability || "None"}</td>
                  <td>{m.medical_fitness_category_id}</td>
                  <td>
                    <Link to={`/dashboard/edit_medical/${m.medical_and_health_record_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(m.medical_and_health_record_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='9' className='text-center text-muted'>
                  No medical and health records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Medical