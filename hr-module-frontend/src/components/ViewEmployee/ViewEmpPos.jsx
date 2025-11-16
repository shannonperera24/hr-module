import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewEmpPos = () => {
  const { emp_no } = useParams();
  const [postings, setPostings] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [corps, setCorps] = useState([]);
  const [units, setUnits] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [specialDuties, setSpecialDuties] = useState([]);
  const [overseasPostings, setOverseasPostings] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postingRes, rankRes, corpRes, unitRes, appRes, sdRes, 
          opRes] = await Promise.all([
          axios.get("http://localhost:3000/posting"),
          axios.get("http://localhost:3000/army_rank"),
          axios.get("http://localhost:3000/corp_and_regiment"),
          axios.get("http://localhost:3000/unit"),
          axios.get("http://localhost:3000/appointment"),
          axios.get("http://localhost:3000/special_duty"),
          axios.get("http://localhost:3000/overseas_posting"),
        ]);
        const filtered = postingRes.data.filter(
          (p) => p.emp_no === Number(emp_no)
        );
        setPostings(filtered);
        setRanks(rankRes.data);
        setCorps(corpRes.data);
        setUnits(unitRes.data);
        setAppointments(appRes.data);
        setSpecialDuties(sdRes.data);
        setOverseasPostings(opRes.data);
      } catch (err) {
        console.error("Error loading posting data:", err);
      }
    };
    loadData();
  }, [emp_no]);

  const getRankName = (id) =>
    ranks.find((r) => r.rank_id === id)?.rank_name || "N/A";

  const getCorpName = (id) =>
    corps.find((c) => c.corp_and_regiment_id === id)?.corp_and_regiment_name ||
    "N/A";

  const getUnitName = (id) =>
    units.find((u) => u.unit_id === id)?.unit_name || "N/A";

  const getAppointmentName = (id) =>
    appointments.find((a) => a.appointment_id === id)?.appointment_name ||
    "N/A";

  const getSpecialDutyName = (id) =>
    specialDuties.find((s) => s.special_duty_id === id)?.special_duty_type ||
    "None";

  const getOverseasPostingName = (id) =>
    overseasPostings.find((o) => o.overseas_posting_id === id)
      ?.overseas_posting_type || "None";

  const handleDelete = async (posting_id) => {
    const result = await Swal.fire({
      title: `Are you sure you want to delete posting ${posting_id}?`,
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
      await axios.delete(`http://localhost:3000/posting/${posting_id}`);
      setPostings(prev => prev.filter(p => p.posting_id !== posting_id));
      toast.success("Posting deleted successfully!");
    } 
    catch (err) {
      console.error("Error deleting posting:", err);
      toast.error("Failed to delete posting.");
    }
  };

  return (
    <div className="table-responsive p-4 mb-4">
      <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
        Posting Information
      </h3>

      <div className='add-button mb-3'>
        <Link to="/dashboard/add_posting" className="btn btn-success"
          state={{ emp_no: Number(emp_no) }}>
          <i className='bi bi-person-plus me-2'></i>Add Posting
        </Link>
      </div>
      <div className='table-responsive'>
        <table className='details-table table table-hover align-middle'>
          <thead>
            <tr>
              <th scope='col'>Rank</th>
              <th scope='col'>Corp</th>
              <th scope='col'>Unit</th>
              <th scope='col'>Appointment</th>
              <th scope='col'>Special Duty</th>
              <th scope='col'>Overseas Posting</th>
              <th scope='col'>From</th>
              <th scope='col'>To</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {postings.length > 0 ? (
              postings.map((p) => (
                <tr key={p.posting_id}>
                  <td>{getRankName(p.rank_id)}</td>
                  <td>{getCorpName(p.corp_and_regiment_id)}</td>
                  <td>{getUnitName(p.unit_id)}</td>
                  <td>{getAppointmentName(p.appointment_id)}</td>
                  <td>{getSpecialDutyName(p.special_duty_id)}</td>
                  <td>{getOverseasPostingName(p.overseas_posting_id)}</td>
                  <td>{p.from_date ? new Date(p.from_date).toLocaleDateString() : "N/A"}</td>
                  <td>{p.to_date ? new Date(p.to_date).toLocaleDateString() : "N/A"}</td>
                  <td>
                    <Link to={`/dashboard/edit_posting/${p.posting_id}`} 
                      className="btn btn-outline-primary btn-sm me-2">
                      <i className="bi bi-pencil-square"></i> Edit
                    </Link>
                    <button className='btn btn-outline-danger btn-sm me-2'
                      onClick={() => handleDelete(p.posting_id)}>
                      <i className='bi bi-trash'></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='9' className='text-center text-muted'>
                  No postings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmpPos