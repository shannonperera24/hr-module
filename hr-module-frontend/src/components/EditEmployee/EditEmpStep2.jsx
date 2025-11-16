import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'

const EditEmpStep2 = () => {
    const { emp_no } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        axios
        .get(`http://localhost:3000/employee/${emp_no}`)
        .then((res) => {
            const data = res.data;
            if (!data.service_history) {
                console.warn("No service history found for employee");
                setLoading(false);
                return;
            }
            const s = data.service_history;
            setFormData({
                service_history_id: s.service_history_id,
                category: s.category || "",
                type_of_service: s.type_of_service || "",
                enlistment_date: s.enlistment_date?.split("T")[0] || "",
                current_status: s.current_status || "",
                retirement_date: s.retirement_date
                    ? s.retirement_date.split("T")[0]
                    : "",
                service_number_stamp: s.service_number_stamp || "",
            });
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error fetching employee:", err);
            setLoading(false);
        });
    }, [emp_no]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleServiceEdit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            category: formData.category,
            type_of_service: formData.type_of_service,
            enlistment_date: formData.enlistment_date,
            current_status: formData.current_status,
            retirement_date: formData.retirement_date || null,
            service_number_stamp: formData.service_number_stamp,
        };

        try {
            await axios.patch(
            `http://localhost:3000/service_history/${formData.service_history_id}`,
            payload
            )
            toast.success("Service information updated successfully!");
            navigate(`/dashboard/view_employee/${emp_no}`);
        } catch (err) {
            console.error("Failed to update:", err);
            toast.error("Failed to update service information!");
        } finally {
            setSaving(false);
        }
    };

    if (loading || !formData) { return <p>Loading...</p>; }

    return (
    <>
        <div className="add-employee-page px-5 mt-4">
            <div className="table-responsive p-4">
                <h3 className="fs-5 text-start fw-semibold mb-3">
                    Edit Service Information
                </h3>

                <form onSubmit={handleServiceEdit}>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label">Category *</label>
                            <input type="text" name="category" className="form-control"
                            value={formData.category} onChange={handleChange}
                            required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Type of Service *</label>
                            <input type="text" name="type_of_service" className="form-control"
                            value={formData.type_of_service} onChange={handleChange}
                            required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Current Status *</label>
                            <input type="text" name="current_status" className="form-control"
                            value={formData.current_status} onChange={handleChange}
                            required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Enlistment Date *</label>
                            <input type="date" name="enlistment_date" className="form-control"
                            value={formData.enlistment_date} onChange={handleChange}
                            required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Retirement Date (Optional)</label>
                            <input type="date" name="retirement_date" className="form-control"
                            value={formData.retirement_date} onChange={handleChange}/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Service Number Stamp *</label>
                            <select name="service_number_stamp" className="form-select"
                            value={formData.service_number_stamp} onChange={handleChange}
                            required>
                            <option value="">-Select-</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                    <button type="submit" className="btn btn-success px-4">
                        Save Changes
                    </button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default EditEmpStep2