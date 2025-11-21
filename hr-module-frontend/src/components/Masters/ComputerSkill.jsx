import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const ComputerSkill = () => {
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/computer_skill')
      .then(res => setSkills(res.data))
      .catch(err => console.error('Error fetching computer skill list', err));
  }, []);

  const filteredSkills = skills.filter(skill =>
    skill.computer_skill_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.computer_skill_id.toString().includes(searchTerm)
  );

  const handleDelete = async (computer_skill_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete computer skill ${computer_skill_id}?`,
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
      await axios.delete(`http://localhost:3000/computer_skill/${computer_skill_id}`);
      setSkills(prev =>
        prev.filter(skill => skill.computer_skill_id !== computer_skill_id)
      );
      toast.success("Computer skill deleted successfully!");
    }
    catch (err) {
      console.error("Error deleting computer skill:", err);
      toast.error("Failed to delete skill.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_computer_skill" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Computer Skill
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
              <th>Skill ID</th>
              <th>Skill Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSkills.length > 0 ? (
              filteredSkills.map((s) => (
                <tr key={s.computer_skill_id}>
                  <td>{s.computer_skill_id}</td>
                  <td>{s.computer_skill_name}</td>
                  <td>
                    <Link to={`/dashboard/edit_computer_skill/${s.computer_skill_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(s.computer_skill_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
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

export default ComputerSkill