import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const SportingAchievement = () => {
  const [achievements, setAchievements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/sporting_achievement')
      .then(res => setAchievements(res.data))
      .catch(err => console.error('Error fetching sporting achievements', err));
  }, []);

  const filteredAchievements = achievements.filter(a =>
    a.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.achievement.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.sporting_achievement_id.toString().includes(searchTerm)
  );

  const handleDelete = async (sporting_achievement_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete sporting achievement ${sporting_achievement_id}?`,
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
      await axios.delete(`http://localhost:3000/sporting_achievement/${sporting_achievement_id}`);
      setAchievements(prev =>
        prev.filter(a => a.sporting_achievement_id !== sporting_achievement_id)
      );
      toast.success("Sporting achievement deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting sporting achievement:", err);
      toast.error("Failed to delete sporting achievement.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_sporting_achievement" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Sporting Achievement
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
              <th scope='col'>Achievement ID</th>
              <th scope='col'>Sport</th>
              <th scope='col'>Achievement</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAchievements.length > 0 ? (
              filteredAchievements.map((a) => (
                <tr key={a.sporting_achievement_id}>
                  <td>{a.sporting_achievement_id}</td>
                  <td>{a.sport}</td>
                  <td>{a.achievement}</td>
                  <td>
                    <Link to={`/dashboard/edit_sporting_achievement/${a.sporting_achievement_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(a.sporting_achievement_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' className='text-center text-muted'>
                  No sporting achievements found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default SportingAchievement