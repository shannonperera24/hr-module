import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditAppointment = () => {
  const { appointment_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    appointment_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAppointmentEdit = async (e) => {
    e.preventDefault();

    const payload = {
      appointment_name: formData.appointment_name,
    };

    try {
      await axios.patch(`http://localhost:3000/appointment/${appointment_id}`, payload);
      toast.success("Appointment updated successfully!");
      navigate("/dashboard/appointment");  
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment");
    }
  };

  useEffect(() => {
    const loadAppointment = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/appointment/${appointment_id}`);
        const a = res.data;

        setFormData({
          appointment_name: a.appointment_name || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading appointment:", err);
        toast.error("Failed to load appointment");
        setLoading(false);
      }
    };

    loadAppointment();
  }, [appointment_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleAppointmentEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Appointment Name *</label>
                <input type="text" name="appointment_name"
                  className="form-control" placeholder="Enter appointment name"
                  value={formData.appointment_name} onChange={handleChange}
                  required/>
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

export default EditAppointment