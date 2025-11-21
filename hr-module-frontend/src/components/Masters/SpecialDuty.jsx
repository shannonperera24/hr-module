import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const SpecialDuty = () => {
  const [duties, setDuties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/special_duty')
      .then(res => setDuties(res.data))
      .catch(err => console.error('Error fetching special duties', err));
  }, [])

  const filteredDuties = duties.filter(d =>
    d.special_duty_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.special_duty_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.special_duty_id.toString().includes(searchTerm)
  );

  const handleDelete = async (special_duty_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete special duty ${special_duty_id}?`,
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
      await axios.delete(`http://localhost:3000/special_duty/${special_duty_id}`);
      setDuties(prev => prev.filter(d => d.special_duty_id !== special_duty_id));
      toast.success("Special duty deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting special duty:", err);
      toast.error("Failed to delete special duty.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_special_duty" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Special Duty
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
              <th scope='col'>Special Duty ID</th>
              <th scope='col'>Type</th>
              <th scope='col'>Description</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDuties.length > 0 ? (
              filteredDuties.map((d) => (
                <tr key={d.special_duty_id}>
                  <td>{d.special_duty_id}</td>
                  <td>{d.special_duty_type}</td>
                  <td>{d.special_duty_description}</td>
                  <td>
                    <Link to={`/dashboard/edit_special_duty/${d.special_duty_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(d.special_duty_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' className='text-center text-muted'>
                  No special duties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default SpecialDuty