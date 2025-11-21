import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const Allowance = () => {
  const [allowances, setAllowances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3000/allowance")
      .then((res) => setAllowances(res.data))
      .catch((err) => console.error("Error fetching allowances", err));
  }, []);

  const filteredAllowances = allowances.filter((a) =>
    a.allowance_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.allowance_id.toString().includes(searchTerm)
  );

  const handleDelete = async (allowance_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete allowance ${allowance_id}?`,
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
      await axios.delete(`http://localhost:3000/allowance/${allowance_id}`);
      setAllowances((prev) =>
        prev.filter((a) => a.allowance_id !== allowance_id)
      );
      toast.success("Allowance deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting allowance:", err);
      toast.error("Failed to delete allowance.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_allowance" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Allowance
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
              <th scope="col">Allowance ID</th>
              <th scope="col">Allowance Type</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAllowances.length > 0 ? (
              filteredAllowances.map((a) => (
                <tr key={a.allowance_id}>
                  <td>{a.allowance_id}</td>
                  <td>{a.allowance_type}</td>
                  <td>
                    <Link to={`/dashboard/edit_allowance/${a.allowance_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(a.allowance_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No allowances found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default Allowance