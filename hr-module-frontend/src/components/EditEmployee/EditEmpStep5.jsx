import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'

const EditEmpStep5 = () => {
  const { emp_no } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [fitCategories, setFitCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, fitRes] = await Promise.all([
          axios.get(`http://localhost:3000/employee/${emp_no}`),
          axios.get("http://localhost:3000/medical_fitness_category")
        ]);
        setFitCategories(fitRes.data);
        const data = empRes.data;
        if (!data.medical_and_health_record) {
            console.warn("No medical information found for employee");
            setLoading(false);
            return;
        }
        const m = data.medical_and_health_record;
        setFormData({
            medical_and_health_record_id: m.medical_and_health_record_id,
            blood_group: m.blood_group || "",
            height_cm: m.height_cm || "",
            weight_kg: m.weight_kg || "",
            bmi: m.bmi || "",
            medical_check_date: m.medical_check_date?.split("T")[0] || "",
            disability: m.disability || "",
            medical_fitness_category_id: m.medical_fitness_category_id || "",
        });
        setLoading(false);
      } catch(err) {
          console.error("Error fetching employee:", err);
          setLoading(false);
      }
    };
    fetchData();
  }, [emp_no]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedRecEdit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      blood_group: formData.blood_group,
      height_cm: formData.height_cm,
      weight_kg: formData.weight_kg,
      bmi: formData.bmi,
      medical_check_date: formData.medical_check_date,
      disability: formData.disability || null,
      medical_fitness_category_id: formData.medical_fitness_category_id,
    };

    try {
        await axios.patch(
        `http://localhost:3000/medical_and_health_record/${formData.medical_and_health_record_id}`,
        payload
        )
        toast.success("Medical information updated successfully!");
        navigate(`/dashboard/view_employee/${emp_no}`);
    } catch (err) {
        console.error("Failed to update:", err);
        toast.error("Failed to update medical information!");
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
          Edit Medical & Health Information
        </h3>

        <form onSubmit={handleMedRecEdit}>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Blood Group *</label>
              <select name="blood_group" className="form-select"
                value={formData.blood_group} onChange={handleChange}
                required>
                <option value="">-Select-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Height (cm) *</label>
              <input type="number" name="height_cm" step="0.01" className="form-control"
              value={formData.height_cm} onChange={handleChange}
              required/>
            </div>
            <div className="col-md-3">
              <label className="form-label">Weight (kg) *</label>
              <input type="number" name="weight_kg" step="0.01" className="form-control"
              value={formData.weight_kg} onChange={handleChange}
              required/>
            </div>
            <div className="col-md-3">
              <label className="form-label">BMI *</label>
              <input type="number" name="bmi" step="0.01" className="form-control"
              value={formData.bmi} onChange={handleChange}
              required/>
            </div>
            <div className="col-md-4">
              <label className="form-label">Medical Check Date *</label>
              <input type="date" name="medical_check_date" className="form-control"
              value={formData.medical_check_date} onChange={handleChange}
              required/>
            </div>
            <div className="col-md-4">
              <label className="form-label">Disability (If any)</label>
              <input type="text" name="disability" className="form-control"
              value={formData.disability} onChange={handleChange}/>
            </div>
            <div className="col-md-4">
              <label className="form-label">Fitness Category *</label>
              <select name="medical_fitness_category_id" className="form-select"
                value={formData.medical_fitness_category_id} onChange={handleChange} 
                required>
                <option value="">-Select-</option>
                  {fitCategories.map(medical_fitness_category => (
                <option key={medical_fitness_category.medical_fitness_category_id} value={medical_fitness_category.medical_fitness_category_id}>
                  {medical_fitness_category.fitness_category_name}
                  </option>
                  ))}
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

export default EditEmpStep5