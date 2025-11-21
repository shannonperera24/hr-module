import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const ArmyTrainingCourse = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/army_training_course')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Error fetching army training courses', err));
  }, []);

  const filteredCourses = courses.filter(c =>
    c.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.course_id.toString().includes(searchTerm)
  );

  const handleDelete = async (course_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete army training course ${course_id}?`,
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
      await axios.delete(`http://localhost:3000/army_training_course/${course_id}`);
      setCourses(prev =>
        prev.filter(c => c.course_id !== course_id)
      );
      toast.success("Training course deleted successfully!");
    } catch (err) {
      console.error("Error deleting training course:", err);
      toast.error("Failed to delete training course.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_course" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Army Training Course
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
              <th scope='col'>Course ID</th>
              <th scope='col'>Course Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((c) => (
                <tr key={c.course_id}>
                  <td>{c.course_id}</td>
                  <td>{c.course_name}</td>
                  <td>
                    <Link to={`/dashboard/edit_course/${c.course_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(c.course_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No army training courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default ArmyTrainingCourse