import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import { toast } from 'react-toastify'

const Pay = () => {
  const [payList, setPayList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/pay_and_benefits");
        setPayList(res.data);
      } catch (err) {
        console.error("Error loading pay and benefits data:", err);
      }
    };
    loadData();
  }, []);

  const filteredPay = payList.filter((p) =>
    p.emp_no?.toString().includes(searchTerm) ||
    p.pay_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (pay_and_benefits_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete pay and benefit record ${pay_and_benefits_id}?`,
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
      await axios.delete(`http://localhost:3000/pay_and_benefits/${pay_and_benefits_id}`);
      setPayList(prev => prev.filter(p => p.pay_and_benefits_id !== pay_and_benefits_id));
      toast.success("Record deleted successfully!");
    } catch (err) {
      console.error("Error deleting record:", err);
      toast.error("Failed to delete record");
    }
  };

  return (
    <div className='employee-page px-5 mt-4'>

      <div className="table-responsive p-4 mb-4">
        <div className="row g-2">
          <div className="col-md-4 col-lg-3">
            <Link to="/dashboard/allowance" className="master-btn btn btn-outline-secondary w-100">
              Allowances Master
            </Link>
          </div>
        </div>
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
              <th>Emp No</th>
              <th>Pay Code</th>
              <th>Basic Pay</th>
              <th>Bank Account</th>
              <th>Bank Name</th>
              <th>EPF No</th>
              <th>Insurance No</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPay.length > 0 ? (
              filteredPay.map((p) => (
                <tr key={p.pay_and_benefits_id}>
                  <td>{p.emp_no}</td> 
                  <td>{p.pay_code}</td>
                  <td>{Number(p.basic_pay).toLocaleString()}</td>
                  <td>{p.bank_account_no}</td>
                  <td>{p.bank_name}</td>
                  <td>{p.epf_no || "N/A"}</td>
                  <td>{p.insurance_no || "N/A"}</td>
                  <td>
                    <Link to={`/dashboard/edit_pay/${p.pay_and_benefits_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(p.pay_and_benefits_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='9' className='text-center text-muted'>
                  No pay and benefit records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Pay