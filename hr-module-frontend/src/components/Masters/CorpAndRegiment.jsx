import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const CorpAndRegiment = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/corp_and_regiment')
      .then(res => setItems(res.data))
      .catch(err => console.error('Error fetching corp/regiment list', err))
  }, [])

  const filteredItems = items.filter(c =>
    c.corp_and_regiment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.corp_and_regiment_id.toString().includes(searchTerm)
  );

  const handleDelete = async (corp_and_regiment_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete corp and regiment ${corp_and_regiment_id}?`,
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
      await axios.delete(`http://localhost:3000/corp_and_regiment/${corp_and_regiment_id}`);
      setItems(prev => prev.filter(i => i.corp_and_regiment_id !== corp_and_regiment_id));
      toast.success("Corp and regiment deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting corp and regiment:", err);
      toast.error("Failed to delete corp and regiment.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_corp_and_reg" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Corp and Regiment
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
              <th scope='col'>Corp and Regiment ID</th>
              <th scope='col'>Corp and Regiment Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((c) => (
                <tr key={c.corp_and_regiment_id}>
                  <td>{c.corp_and_regiment_id}</td>
                  <td>{c.corp_and_regiment_name}</td>
                  <td>
                    <Link to={`/dashboard/edit_corp_and_reg/${c.corp_and_regiment_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(c.corp_and_regiment_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No corps and regiments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default CorpAndRegiment