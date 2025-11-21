import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const SecurityClearance = () => {
  const [clearances, setClearances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/security_clearance')
      .then(res => setClearances(res.data))
      .catch(err => console.error('Error fetching security clearance records', err));
  }, [])

  const filteredClearances = clearances.filter(c =>
    c.security_clearance_level.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.weapon_handling_clearance.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.security_clearance_id.toString().includes(searchTerm)
  );

  const handleDelete = async (security_clearance_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete security clearance ${security_clearance_id}?`,
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
      await axios.delete(`http://localhost:3000/security_clearance/${security_clearance_id}`);
      setClearances(prev =>
        prev.filter(c => c.security_clearance_id !== security_clearance_id)
      );
      toast.success("Security clearance deleted successfully!");
    } catch (err) {
      console.error("Error deleting security clearance:", err);
      toast.error("Failed to delete security clearance.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_security_clearance" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Security Clearance
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
              <th scope='col'>Security Clearance ID</th>
              <th scope='col'>Clearance Level</th>
              <th scope='col'>Weapon Handling</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClearances.length > 0 ? (
              filteredClearances.map((c) => (
                <tr key={c.security_clearance_id}>
                  <td>{c.security_clearance_id}</td>
                  <td>{c.security_clearance_level}</td>
                  <td>{c.weapon_handling_clearance}</td>
                  <td>
                    <Link to={`/dashboard/edit_security_clearance/${c.security_clearance_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(c.security_clearance_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' className='text-center text-muted'>
                  No security clearance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default SecurityClearance