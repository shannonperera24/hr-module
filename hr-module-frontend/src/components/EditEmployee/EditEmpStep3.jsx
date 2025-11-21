import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'

const EditEmpStep3 = () => {
    const { emp_no, pay_and_benefits_id } = useParams();
    const isStandalone = !!pay_and_benefits_id;
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                let res;
                if (isStandalone) {
                    res = await axios.get(`http://localhost:3000/pay_and_benefits/${pay_and_benefits_id}`);
                    setFormData(res.data);
                } else {
                    res = await axios.get(`http://localhost:3000/employee/${emp_no}`);
                    const p = res.data.pay_and_benefits;
                    if (!p) {
                        console.warn("No pay information found for employee");
                        setLoading(false);
                        return;
                    }
                    setFormData({
                        pay_and_benefits_id: p.pay_and_benefits_id,
                        pay_code: p.pay_code || "",
                        basic_pay: p.basic_pay || "",
                        bank_account_no: p.bank_account_no || "",
                        bank_name: p.bank_name || "",
                        epf_no: p.epf_no || "",
                        insurance_no: p.insurance_no || "",
                    });
                }
            } catch(err) {
                console.error("Error loading pay info:", err);
                toast.error("Failed to load pay info");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [emp_no, pay_and_benefits_id, isStandalone]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePayEdit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            pay_code: formData.pay_code,
            basic_pay: formData.basic_pay,
            bank_account_no: formData.bank_account_no,
            bank_name: formData.bank_name,
            epf_no: formData.epf_no || null,
            insurance_no: formData.insurance_no || null,
        };

        try {
            await axios.patch(
            `http://localhost:3000/pay_and_benefits/${formData.pay_and_benefits_id}`,
            payload
            )
            toast.success("Pay information updated successfully!");
            if (isStandalone) {
                navigate("/dashboard/pay");
            } else {
                navigate(`/dashboard/view_employee/${emp_no}`);
            }
        } catch (err) {
            console.error("Failed to update:", err);
            toast.error("Failed to update pay information!");
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
                    Edit Pay Information
                </h3>

                <form onSubmit={handlePayEdit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Pay Code *</label>
                            <input type="text" name="pay_code" className="form-control"
                            value={formData.pay_code} onChange={handleChange}
                            required/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Basic Pay *</label>
                            <input type="number" name="basic_pay" min="0" step="0.01" className="form-control"
                            value={formData.basic_pay} onChange={handleChange}
                            required/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Bank Account No *</label>
                            <input type="text" name="bank_account_no" className="form-control"
                            value={formData.bank_account_no} onChange={handleChange}
                            required/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Bank Name *</label>
                            <input type="text" name="bank_name" className="form-control"
                            value={formData.bank_name} onChange={handleChange}
                            required/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">EPF No (Optional)</label>
                            <input type="text" name="epf_no" className="form-control"
                            value={formData.epf_no} onChange={handleChange}/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Insurance No (Optional)</label>
                            <input type="text" name="insurance_no" className="form-control"
                            value={formData.insurance_no} onChange={handleChange}/>
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

export default EditEmpStep3