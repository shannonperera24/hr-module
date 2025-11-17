import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewEmpPromo = ({ emp_no }) => {
  const [promotions, setPromotions] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [serviceHistory, setServiceHistory] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [promoRes, rankRes, historyRes] = await Promise.all([
          axios.get("http://localhost:3000/promotion"),
          axios.get("http://localhost:3000/army_rank"),
          axios.get("http://localhost:3000/service_history"),
        ]);
        const empHistory = historyRes.data.find(
          (h) => h.emp_no === Number(emp_no)
        );
        setServiceHistory(empHistory);
        if (empHistory) {
          const filteredPromos = promoRes.data.filter(
            (p) => p.service_history_id === empHistory.service_history_id
          );
          setPromotions(filteredPromos);
        } else {
          setPromotions([]);
        }
        setRanks(rankRes.data);
      } catch (err) {
        console.error("Error loading promotion data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const getRankName = (id) =>
    ranks.find((r) => r.rank_id === id)?.rank_name || "N/A";

  const handleDelete = async (promotion_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete promotion ${promotion_id}?`,
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
      await axios.delete(`http://localhost:3000/promotion/${promotion_id}`);
      setPromotions(prev => prev.filter(p => p.promotion_id !== promotion_id));
      toast.success("Promotion deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting promotion:", err);
      toast.error("Failed to delete promotion.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Promotion Information
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_promotion" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Promotion
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope="col">Old Rank</th>
              <th scope="col">New Rank</th>
              <th scope="col">Promotion Date</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.length > 0 ? (
              promotions.map((p) => (
                <tr key={p.promotion_id}>
                  <td>{getRankName(p.old_rank_id)}</td>
                  <td>{getRankName(p.new_rank_id)}</td>
                  <td>{p.promotion_date ? new Date(p.promotion_date)
                    .toLocaleDateString() : "N/A"}
                  </td>
                  <td>
                    <Link to={`/dashboard/edit_promotion/${p.promotion_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(p.promotion_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' className='text-center text-muted'>
                  No promotions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpPromo