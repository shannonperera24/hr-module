import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const OverseasPosting = () => {
  const [postings, setPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3000/overseas_posting")
      .then(res => setPostings(res.data))
      .catch(err => console.error("Error fetching overseas postings", err));
  }, [])

  const filteredPostings = postings.filter(p =>
    p.overseas_posting_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.overseas_posting_country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.overseas_posting_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.overseas_posting_id.toString().includes(searchTerm)
  );

  const handleDelete = async (overseas_posting_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete overseas posting ${overseas_posting_id}?`,
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
      await axios.delete(`http://localhost:3000/overseas_posting/${overseas_posting_id}`);
      setPostings(prev =>
        prev.filter(p => p.overseas_posting_id !== overseas_posting_id)
      );
      toast.success("Overseas posting deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting overseas posting:", err);
      toast.error("Failed to delete posting.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_overseas_posting" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Overseas Posting
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
              <th scope="col">Overseas Posting ID</th>
              <th scope="col">Type</th>
              <th scope="col">Country</th>
              <th scope="col">Description</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPostings.length > 0 ? (
              filteredPostings.map((p) => (
                <tr key={p.overseas_posting_id}>
                  <td>{p.overseas_posting_id}</td>
                  <td>{p.overseas_posting_type}</td>
                  <td>{p.overseas_posting_country}</td>
                  <td>{p.overseas_posting_description}</td>
                  <td>
                    <Link to={`/dashboard/edit_overseas_posting/${p.overseas_posting_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(p.overseas_posting_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5' className='text-center text-muted'>
                  No overseas postings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default OverseasPosting