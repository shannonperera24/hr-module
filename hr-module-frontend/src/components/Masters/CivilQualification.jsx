import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const CivilQualification = () => {
  const [qualifications, setQualifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/civil_qualification')
      .then(res => setQualifications(res.data))
      .catch(err => console.error('Error fetching civil qualifications', err));
  }, []);

  const filteredQualifications = qualifications.filter(q =>
    q.civil_qualification_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.civil_qualification_id.toString().includes(searchTerm)
  );

  const handleDelete = async (civil_qualification_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete civil qualification ${civil_qualification_id}?`,
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
      await axios.delete(`http://localhost:3000/civil_qualification/${civil_qualification_id}`);
      setQualifications(prev =>
        prev.filter(q => q.civil_qualification_id !== civil_qualification_id)
      );
      toast.success("Civil qualification deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting civil qualification:", err);
      toast.error("Failed to delete civil qualification.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_civil_qual" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Civil Qualification
        </Link>
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
              <th scope='col'>Qualification ID</th>
              <th scope='col'>Qualification Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQualifications.length > 0 ? (
              filteredQualifications.map((q) => (
                <tr key={q.civil_qualification_id}>
                  <td>{q.civil_qualification_id}</td>
                  <td>{q.civil_qualification_name}</td>
                  <td>
                    <Link to={`/dashboard/edit_civil_qual/${q.civil_qualification_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(q.civil_qualification_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
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

export default CivilQualification