import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'

const EditEmpStep1 = () => {
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
            if (data.photo_id) {
                data.photo_id = data.photo_id.replace(/\\/g, "/");
            }
            const {
                service_history,
                postings,
                pay_and_benefits,
                qualification_record,
                medical_and_health_record,
                employee_clearances,
                ...cleaned
            } = data;
            setFormData(cleaned);
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

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFormData((prev) => ({ ...prev, photo_id: file }));
    };

    const handleEmployeeEdit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const dataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key === "photo_id") {
                if (value instanceof File) {
                    dataToSend.append("photo_id", value);
                }
            } 
            else if (key === "date_of_birth") {
                dataToSend.append("date_of_birth", value.split("T")[0]);
            }
            else {
                dataToSend.append(key, value);
            }
        });

        try {
            await axios.patch(
            `http://localhost:3000/employee/${emp_no}`,
            dataToSend,
            { headers: { "Content-Type": "multipart/form-data" } }
            );

            toast.success("Employee updated successfully!");
            navigate(`/dashboard/view_employee/${emp_no}`);
        } catch (err) {
            console.error("Failed to update:", err);
            toast.error("Failed to update employee!");
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
                    Edit Personal Identification & Bio Data
                </h3>

                <form onSubmit={handleEmployeeEdit}>
                    <div className="row g-3">
                    <div className="col-12">
                        <label className="form-label">Full Name *</label>
                        <input type="text" name="full_name" className="form-control"
                        value={formData.full_name} onChange={handleChange}
                        required/>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Name in Sinhala (Optional)</label>
                        <input type="text" name="name_in_sinhala" className="form-control"
                        value={formData.name_in_sinhala} onChange={handleChange}/>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Name in Tamil (Optional)</label>
                        <input type="text" name="name_in_tamil" className="form-control"
                        value={formData.name_in_tamil} onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">NIC No *</label>
                        <input type="text" name="nic_no" className="form-control"
                        value={formData.nic_no}onChange={handleChange} 
                        required/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Passport No (Optional)</label>
                        <input type="text" name="passport_no" className="form-control"
                        value={formData.passport_no} onChange={handleChange}/>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Date of Birth *</label>
                        <input type="date" name="date_of_birth" className="form-control"
                        value={formData.date_of_birth} onChange={handleChange}
                        required/>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Gender *</label>
                        <select name="gender" className="form-select"
                        value={formData.gender} onChange={handleChange}
                        required>
                        <option value="">-Select-</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Religion *</label>
                        <input type="text" name="religion" className="form-control"
                        value={formData.religion} onChange={handleChange}
                        required/>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Nationality *</label>
                        <input type="text" name="nationality" className="form-control"
                        value={formData.nationality} onChange={handleChange}
                        required/>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Marital Status *</label>
                        <select name="marital_status" className="form-select"
                        value={formData.marital_status} onChange={handleChange}
                        required>
                        <option value="">-Select-</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Spouse Name (Optional)</label>
                        <input type="text" name="spouse_name" className="form-control"
                        value={formData.spouse_name} onChange={handleChange}/>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Number of Children</label>
                        <input type="number" name="number_of_children" min="0" className="form-control"
                        value={formData.number_of_children} onChange={handleChange}/>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Photo ID (Optional)</label>
                        <input type="file" name="photo_id" accept="image/*"
                        className="form-control" 
                        onChange={handleFileChange}/>
                    </div>
                    {formData.photo_id && (
                        <div className="mt-3">
                        <img
                            src={
                                formData.photo_id instanceof File
                                    ? URL.createObjectURL(formData.photo_id)
                                    : `http://localhost:3000/${formData.photo_id}`
                            }
                            alt="Preview"
                            width="120"
                            className="rounded shadow-sm"
                        />
                        </div>
                    )}
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

export default EditEmpStep1