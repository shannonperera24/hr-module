import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const Employee = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/employee')
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Error fetching employees', err))
  }, [])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredEmployees = employees.filter(emp =>
    emp.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.emp_no.toString().includes(searchTerm)
  )

  const handleDelete = async (emp_no) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete employee ${emp_no}?`,
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
      await axios.delete(`http://localhost:3000/employee/${emp_no}`);
      setEmployees(prev => prev.filter(e => e.emp_no !== emp_no));
      toast.success("Employee deleted successfully!");
    } 
    catch (err) {
      console.error("Error soft-deleting employee:", err);
      toast.error("Failed to delete employee.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_employee" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Employee
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
              <th scope='col'>Emp No</th>
              <th scope='col'>Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr key={emp.emp_no}>
                  <td>{emp.emp_no}</td>
                  <td>{emp.full_name}</td>
                  <td>
                    <Link to={`/dashboard/view_employee/${emp.emp_no}`}
                    className='btn btn-outline-info btn-sm me-2'>
                      <i className='bi bi-eye'></i> View
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(emp.emp_no)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default Employee