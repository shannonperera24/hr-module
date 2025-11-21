import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const MedFitCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3000/medical_fitness_category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const filteredCategories = categories.filter((c) =>
    c.fitness_category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.medical_fitness_category_id.toString().includes(searchTerm)
  );

  const handleDelete = async (medical_fitness_category_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete medical fitness category ${medical_fitness_category_id}?`,
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
      await axios.delete(
        `http://localhost:3000/medical_fitness_category/${medical_fitness_category_id}`
      );
      setCategories((prev) =>
        prev.filter((c) => c.medical_fitness_category_id !== medical_fitness_category_id)
      );
      toast.success("Category deleted successfully!");
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>
      <div className='add-button mb-3'>
        <Link to="/dashboard/add_med_fit_category" className="btn btn-success">
          <i className='bi bi-person-plus me-2'></i>Add Medical Fitness Category
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
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Description</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((c) => (
                <tr key={c.medical_fitness_category_id}>
                  <td>{c.medical_fitness_category_id}</td>
                  <td>{c.fitness_category_name}</td>
                  <td>{c.fitness_category_description}</td>
                  <td>
                    <Link to={`/dashboard/edit_med_fit_category/${c.medical_fitness_category_id}`}
                    className='btn btn-outline-primary btn-sm me-2'>
                      <i className='bi bi-pencil-square'></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(c.medical_fitness_category_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' className='text-center text-muted'>
                  No medical fitness categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  )
}

export default MedFitCategory