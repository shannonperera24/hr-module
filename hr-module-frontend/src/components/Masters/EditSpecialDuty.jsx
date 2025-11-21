import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditSpecialDuty = () => {
  const { special_duty_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    special_duty_type: "",
    special_duty_description: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSpecialDutyEdit = async (e) => {
    e.preventDefault();

    const payload = {
      special_duty_type: formData.special_duty_type,
      special_duty_description: formData.special_duty_description,
    };

    try {
      await axios.patch(`http://localhost:3000/special_duty/${special_duty_id}`,
        payload);
      toast.success("Special duty updated successfully!");
      navigate("/dashboard/special_duty");
    } catch (error) {
      console.error("Error updating special duty:", error);
      toast.error("Failed to update special duty");
    }
  };

  useEffect(() => {
    const loadSpecialDuty = async () => {
      try {
        const res = await 
          axios.get(`http://localhost:3000/special_duty/${special_duty_id}`);
        const d = res.data;

        setFormData({
          special_duty_type: d.special_duty_type || "",
          special_duty_description: d.special_duty_description || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading special duty:", err);
        toast.error("Failed to load special duty");
        setLoading(false);
      }
    };

    loadSpecialDuty();
  }, [special_duty_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleSpecialDutyEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Special Duty Type *</label>
                <input type="text" name="special_duty_type"
                  className="form-control" placeholder="Enter duty type"
                  value={formData.special_duty_type} onChange={handleChange}
                  required/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Special Duty Description *</label>
                <input type="text" name="special_duty_description"
                  className="form-control" placeholder="Enter duty description"
                  value={formData.special_duty_description}
                  onChange={handleChange} required/>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-success px-4">
                Save Changes
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
}

export default EditSpecialDuty