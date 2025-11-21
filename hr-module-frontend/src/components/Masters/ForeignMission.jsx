import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const ForeignMission = () => {
  const [missions, setMissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/foreign_mission')
      .then(res => setMissions(res.data))
      .catch(err => console.error('Error fetching foreign missions', err));
  }, []);

  const filteredMissions = missions.filter(m =>
    m.foreign_mission_country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.foreign_mission_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.foreign_mission_id.toString().includes(searchTerm)
  );

  const handleDelete = async (foreign_mission_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete foreign mission ${foreign_mission_id}?`,
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
      await axios.delete(`http://localhost:3000/foreign_mission/${foreign_mission_id}`);
      setMissions(prev =>
        prev.filter(m => m.foreign_mission_id !== foreign_mission_id)
      );
      toast.success("Foreign mission deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting foreign mission:", err);
      toast.error("Failed to delete foreign mission.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_foreign_mission" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Foreign Mission
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
              <th scope='col'>Mission ID</th>
              <th scope='col'>Country</th>
              <th scope='col'>Description</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMissions.length > 0 ? (
              filteredMissions.map((m) => (
                <tr key={m.foreign_mission_id}>
                  <td>{m.foreign_mission_id}</td>
                  <td>{m.foreign_mission_country}</td>
                  <td>{m.foreign_mission_description}</td>
                  <td>
                    <Link to={`/dashboard/edit_foreign_mission/${m.foreign_mission_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(m.foreign_mission_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' className='text-center text-muted'>
                  No foreign missions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default ForeignMission