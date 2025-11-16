import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'

const EditEmpStep4 = () => {
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
            if (!data.qualification_record) {
                console.warn("No qualification record found for employee");
                setLoading(false);
                return;
            }
            const q = data.qualification_record;
            setFormData({
                qualification_record_id: q.qualification_record_id,
                has_instructor_experience: q.has_instructor_experience || "",
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

    const handleInstructorEdit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            has_instructor_experience: formData.has_instructor_experience,
        };

        try {
            await axios.patch(
            `http://localhost:3000/qualification_record/${formData.qualification_record_id}`,
            payload
            )
            toast.success("Instructor experience information updated successfully!");
            navigate(`/dashboard/view_employee/${emp_no}`);
        } catch (err) {
            console.error("Failed to update:", err);
            toast.error("Failed to update instructor experience information!");
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
                    Edit Instructor Experience Information
                </h3>

                <form onSubmit={handleInstructorEdit}>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label">Does the employee have instructor experience? *</label>
                        <select name="has_instructor_experience" className="form-select"
                        value={formData.has_instructor_experience} onChange={handleChange}
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

export default EditEmpStep4