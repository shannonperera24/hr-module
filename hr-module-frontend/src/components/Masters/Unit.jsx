import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const Unit = () => {
  const [units, setUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/unit')
      .then(res => setUnits(res.data))
      .catch(err => console.error('Error fetching units', err));
  }, [])

  const filteredUnits = units.filter(u =>
    u.unit_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.unit_id.toString().includes(searchTerm)
  );

  const handleDelete = async (unit_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete unit ${unit_id}?`,
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
      await axios.delete(`http://localhost:3000/unit/${unit_id}`);
      setUnits(prev => prev.filter(u => u.unit_id !== unit_id));
      toast.success("Unit deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting unit:", err);
      toast.error("Failed to delete unit.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_unit" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Unit
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
              <th scope='col'>Unit ID</th>
              <th scope='col'>Unit Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUnits.length > 0 ? (
              filteredUnits.map((u) => (
                <tr key={u.unit_id}>
                  <td>{u.unit_id}</td>
                  <td>{u.unit_name}</td>
                  <td>
                    <Link to={`/dashboard/edit_unit/${u.unit_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(u.unit_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No units found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default Unit