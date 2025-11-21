import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const AwardsMaster = () => {
  const [awards, setAwards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/award')
      .then(res => setAwards(res.data))
      .catch(err => console.error('Error fetching awards', err));
  }, []);

  const filteredAwards = awards.filter(a =>
    a.award_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.award_id.toString().includes(searchTerm)
  );

  const handleDelete = async (award_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete award ${award_id}?`,
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
      await axios.delete(`http://localhost:3000/award/${award_id}`);
      setAwards(prev => prev.filter(a => a.award_id !== award_id));
      toast.success("Award deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting award:", err);
      toast.error("Failed to delete award.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_award" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Award
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
              <th scope='col'>Award ID</th>
              <th scope='col'>Award Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAwards.length > 0 ? (
              filteredAwards.map((a) => (
                <tr key={a.award_id}>
                  <td>{a.award_id}</td>
                  <td>{a.award_name}</td>
                  <td>
                    <Link to={`/dashboard/edit_award/${a.award_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(a.award_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No awards found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default AwardsMaster