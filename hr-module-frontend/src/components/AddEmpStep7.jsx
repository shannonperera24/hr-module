import { useEffect, useState } from "react";
import axios from "axios";

const AddEmpStep7 = ({ formData, handleChange, handleEmpSecSubmit }) => {
    const [secClearances, setSecClearances] = useState([]);
    
    useEffect(() => {
        const fetchSecClearances = async () => {
            try {
                const res = await axios.get("http://localhost:3000/security_clearance");
                setSecClearances(res.data);
            } catch (err) {
                console.error("Error fetching dropdown data:", err);
            }
        };
        fetchSecClearances();
    }, []);

    return (
        <>
            <h3 className="fs-5 text-start fw-semibold mb-3">
                7. Security Clearance Information
            </h3>

            <form onSubmit={handleEmpSecSubmit}>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label">Security Clearance Level *</label>
                        <select name="security_clearance_id" className="form-select"
                        value={formData.security_clearance_id} onChange={handleChange} 
                        required>
                            <option value="">-Select-</option>
                            {secClearances.map(security_clearance => (
                                <option key={security_clearance.security_clearance_id} value={security_clearance.security_clearance_id}>
                                {security_clearance.security_clearance_level}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Clearance Expiry Date *</label>
                        <input type="date" name="clearance_expiry" className="form-control"
                        value={formData.clearance_expiry} onChange={handleChange}
                        required/>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Clearance Status *</label>
                        <select name="clearance_status" className="form-select"
                        value={formData.clearance_status} onChange={handleChange}
                        required>
                            <option value="">-Select-</option>
                            <option value="Active">Active</option>
                            <option value="Expired">Expired</option>
                            <option value="Revoked">Revoked</option>
                            <option value="Suspended">Suspended</option>
                        </select>
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

export default AddEmpStep7