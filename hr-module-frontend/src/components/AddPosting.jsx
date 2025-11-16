import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddPosting = () => {
  const { emp_no: urlEmpNo } = useParams();
  const location = useLocation();
  const passedEmpNo = location.state?.emp_no || "";
  const navigate = useNavigate();
  const [ranks, setRanks] = useState([]);
  const [corps, setCorps] = useState([]);
  const [units, setUnits] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [specialDuties, setSpecialDuties] = useState([]);
  const [overseasPostings, setOverseasPostings] = useState([]);

  const [formData, setFormData] = useState({
    emp_no: urlEmpNo || passedEmpNo || "",
    rank_id: "",
    corp_and_regiment_id: "",
    unit_id: "",
    appointment_id: "",
    special_duty_id: "",
    overseas_posting_id: "",
    from_date: "",
    to_date: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePostingSubmit = async (e) => {
    e.preventDefault();

    if (!formData.emp_no) {
      toast.error("Please enter an Emp No");
      return;
    }

    const payload = {
      emp_no: Number(formData.emp_no),
      rank_id: Number(formData.rank_id),
      corp_and_regiment_id: Number(formData.corp_and_regiment_id),
      unit_id: Number(formData.unit_id),
      appointment_id: Number(formData.appointment_id),
      special_duty_id:
        formData.special_duty_id === "" ? null : Number(formData.special_duty_id),
      overseas_posting_id:
        formData.overseas_posting_id === "" ? null : Number(formData.overseas_posting_id),
      from_date: formData.from_date,
      to_date: formData.to_date
    };

    try {
      await axios.post("http://localhost:3000/posting", payload);
      toast.success("Posting added successfully!");

      const targetEmpNo = urlEmpNo || passedEmpNo;
      if (targetEmpNo) {
        navigate(`/dashboard/view_employee/${targetEmpNo}`);
      } else {
        navigate("/dashboard/posting"); 
      }
    } catch (error) {
      console.error("Error adding posting:", error);
      toast.error("Failed to add posting");
    }
  };

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [ rankRes, corpRes, unitRes, appRes, sdRes, opRes] = 
          await Promise.all([
            axios.get("http://localhost:3000/army_rank"),
            axios.get("http://localhost:3000/corp_and_regiment"),
            axios.get("http://localhost:3000/unit"),
            axios.get("http://localhost:3000/appointment"),
            axios.get("http://localhost:3000/special_duty"),
            axios.get("http://localhost:3000/overseas_posting"),
          ]);
          setRanks(rankRes.data);
          setCorps(corpRes.data);
          setUnits(unitRes.data);
          setAppointments(appRes.data);
          setSpecialDuties(sdRes.data);
          setOverseasPostings(opRes.data);
      } catch (error) {
        console.error("Error loading dropdown data:", error);
      }
    };
    fetchDropdowns();
  }, []);

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handlePostingSubmit}>
            <div className="row g-3">
              {!urlEmpNo && (
                <div className="col-md-6">
                  <label className="form-label">Emp No *</label>
                  <input type="number" name="emp_no" className="form-control"
                    value={formData.emp_no} onChange={handleChange}
                    required/>
                </div>
              )}
              <div className="col-md-6">
                <label className="form-label">Rank *</label>
                <select name="rank_id" className="form-select"
                value={formData.rank_id} onChange={handleChange}
                required>
                  <option value="">-Select-</option>
                  {ranks.map((r) => (
                  <option key={r.rank_id} value={r.rank_id}>
                    {r.rank_name}
                  </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Corp & Regiment *</label>
                <select name="corp_and_regiment_id" className="form-select"
                  value={formData.corp_and_regiment_id} onChange={handleChange}
                  required>
                  <option value="">-Select-</option>
                  {corps.map((c) => (
                  <option key={c.corp_and_regiment_id} value={c.corp_and_regiment_id}>
                    {c.corp_and_regiment_name}
                  </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Unit *</label>
                <select name="unit_id" className="form-select"
                  value={formData.unit_id} onChange={handleChange}
                  required>
                  <option value="">-Select-</option>
                  {units.map((u) => (
                  <option key={u.unit_id} value={u.unit_id}>
                    {u.unit_name}
                  </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Appointment *</label>
                <select name="appointment_id" className="form-select"
                  value={formData.appointment_id} onChange={handleChange}
                  required>
                  <option value="">-Select-</option>
                  {appointments.map((a) => (
                  <option key={a.appointment_id} value={a.appointment_id}>
                    {a.appointment_name}
                  </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Special Duty (Optional)</label>
                <select name="special_duty_id" className="form-select"
                  value={formData.special_duty_id} onChange={handleChange}>
                  <option value="">-Select-</option>
                  {specialDuties.map((sd) => (
                  <option key={sd.special_duty_id} value={sd.special_duty_id}>
                    {sd.special_duty_type}
                  </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Overseas Posting (Optional)</label>
                <select name="overseas_posting_id" className="form-select"
                  value={formData.overseas_posting_id} onChange={handleChange}>
                  <option value="">-Select-</option>
                  {overseasPostings.map((op) => (
                  <option key={op.overseas_posting_id} value={op.overseas_posting_id}>
                    {op.overseas_posting_type}
                  </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">From Date *</label>
                <input type="date" className="form-control" name="from_date" 
                  value={formData.from_date} onChange={handleChange}
                  required/>
              </div>

              <div className="col-md-4">
                <label className="form-label">To Date *</label>
                <input type="date" className="form-control" name="to_date"
                  value={formData.to_date} onChange={handleChange}
                  required/>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-success px-4">
                Save
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default AddPosting