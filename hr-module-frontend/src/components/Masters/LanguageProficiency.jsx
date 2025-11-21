import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const LanguageProficiency = () => {
  const [languages, setLanguages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/language_proficiency')
      .then(res => setLanguages(res.data))
      .catch(err => console.error('Error fetching language proficiency list', err));
  }, []);

  const filteredLanguages = languages.filter(lang =>
    lang.language_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.language_id.toString().includes(searchTerm)
  );

  const handleDelete = async (language_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete language ${language_id}?`,
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
      await axios.delete(`http://localhost:3000/language_proficiency/${language_id}`);
      setLanguages(prev =>
        prev.filter(lang => lang.language_id !== language_id)
      );
      toast.success("Language deleted successfully!");
    }
    catch (err) {
      console.error("Error deleting language:", err);
      toast.error("Failed to delete language.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_language" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Language
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
              <th scope='col'>Language ID</th>
              <th scope='col'>Language Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((l) => (
                <tr key={l.language_id}>
                  <td>{l.language_id}</td>
                  <td>{l.language_name}</td>
                  <td>
                    <Link to={`/dashboard/edit_language/${l.language_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(l.language_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center text-muted'>
                  No languages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default LanguageProficiency