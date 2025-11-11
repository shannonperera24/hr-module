import { useEffect, useState } from "react";
import axios from "axios";

const AddEmpStep3 = ({ formData, handleChange, handlePostingSubmit }) => {
    const [ranks, setRanks] = useState([]);
    const [corps, setCorps] = useState([]);
    const [units, setUnits] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [specialDuties, setSpecialDuties] = useState([]);
    const [overseasPostings, setOverseasPostings] = useState([]);
    
    useEffect(() => {
        const fetchPostingDropDowns = async () => {
            try {
                const [rankRes, corpRes, unitRes, appRes, sdRes, opRes] = await Promise.all([
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
            } catch (err) {
                console.error("Error fetching dropdown data:", err);
            }
        };
        fetchPostingDropDowns();
    }, []);

    return (
        <>
            <h3 className="fs-5 text-start fw-semibold mb-3">
                3. Posting Information
            </h3>

            <form onSubmit={handlePostingSubmit}>
                <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Rank *</label>
                    <select name="rank_id" className="form-select"
                    value={formData.rank_id} onChange={handleChange}
                    required>
                    <option value="">-Select-</option>
                    {ranks.map(rank => (
                        <option key={rank.rank_id} value={rank.rank_id}>
                        {rank.rank_name}
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
                    {corps.map(corp => (
                        <option key={corp.corp_and_regiment_id} value={corp.corp_and_regiment_id}>
                        {corp.corp_and_regiment_name}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Unit *</label>
                    <select name="unit_id" className="form-select"
                    value={formData.unit_id} onChange={handleChange} required>
                    <option value="">-Select-</option>
                    {units.map(unit => (
                        <option key={unit.unit_id} value={unit.unit_id}>
                        {unit.unit_name}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Appointment *</label>
                    <select name="appointment_id" className="form-select"
                    value={formData.appointment_id} onChange={handleChange} required>
                    <option value="">-Select-</option>
                    {appointments.map(app => (
                        <option key={app.appointment_id} value={app.appointment_id}>
                        {app.appointment_name}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Special Duty (Optional)</label>
                    <select name="special_duty_id" className="form-select"
                    value={formData.special_duty_id} onChange={handleChange}>
                    <option value="">-Select-</option>
                    {specialDuties.map(sd => (
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
                    {overseasPostings.map(op => (
                        <option key={op.overseas_posting_id} value={op.overseas_posting_id}>
                        {op.overseas_posting_type}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <label className="form-label">From Date *</label>
                    <input type="date" name="from_date" className="form-control"
                    value={formData.from_date} onChange={handleChange}
                    required/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">To Date *</label>
                    <input type="date" name="to_date" className="form-control"
                    value={formData.to_date} onChange={handleChange}
                    required/>
                </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                <button type="submit" className="btn btn-success px-4">
                    Next
                </button>
                </div>
            </form>
        </>
    )
}

export default AddEmpStep3