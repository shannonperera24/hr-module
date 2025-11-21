import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const Commendation = () => {
  const [commendations, setCommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3000/commendation")
      .then((res) => setCommendations(res.data))
      .catch((err) => console.error("Error fetching commendations", err));
  }, []);

  const filteredCommendations = commendations.filter((c) =>
    c.commendation_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.commendation_id.toString().includes(searchTerm)
  );

  const handleDelete = async (commendation_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete commendation ${commendation_id}?`,
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
      await axios.delete(`http://localhost:3000/commendation/${commendation_id}`);
      setCommendations((prev) =>
        prev.filter((c) => c.commendation_id !== commendation_id)
      );
      toast.success("Commendation deleted successfully!");
    } catch (err) {
      console.error("Error deleting commendation:", err);
      toast.error("Failed to delete commendation.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_commendation" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Commendation
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
              <th scope="col">Commendation ID</th>
              <th scope="col">Commendation Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCommendations.length > 0 ? (
              filteredCommendations.map((c) => (
                <tr key={c.commendation_id}>
                  <td>{c.commendation_id}</td>
                  <td>{c.commendation_name}</td>
                  <td>
                    <Link to={`/dashboard/edit_commendation/${c.commendation_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(c.commendation_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No commendations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default Commendation