import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/appointment')
      .then(res => setAppointments(res.data))
      .catch(err => console.error('Error fetching appointments', err));
  }, [])

  const filteredAppointments = appointments.filter(a =>
    a.appointment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.appointment_id.toString().includes(searchTerm)
  );

  const handleDelete = async (appointment_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete appointment ${appointment_id}?`,
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
      await axios.delete(`http://localhost:3000/appointment/${appointment_id}`);
      setAppointments(prev => prev.filter(a => a.appointment_id !== appointment_id));
      toast.success("Appointment deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting appointment:", err);
      toast.error("Failed to delete appointment.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_appointment" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Appointment
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
              <th scope='col'>Appointment ID</th>
              <th scope='col'>Appointment Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((a) => (
                <tr key={a.appointment_id}>
                  <td>{a.appointment_id}</td>
                  <td>{a.appointment_name}</td>
                  <td>
                    <Link to={`/dashboard/edit_appointment/${a.appointment_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(a.appointment_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default Appointment