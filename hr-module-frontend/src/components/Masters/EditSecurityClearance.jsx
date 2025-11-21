import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditSecurityClearance = () => {
  const { security_clearance_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    security_clearance_level: "",
    weapon_handling_clearance: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSecurityClearanceEdit = async (e) => {
    e.preventDefault();

    const payload = {
      security_clearance_level: formData.security_clearance_level,
      weapon_handling_clearance: formData.weapon_handling_clearance,
    };

    try {
      await axios.patch(
        `http://localhost:3000/security_clearance/${security_clearance_id}`,
        payload
      );
      toast.success("Security clearance updated successfully!");
      navigate("/dashboard/security_clearance");
    } catch (error) {
      console.error("Error updating security clearance:", error);
      toast.error("Failed to update security clearance");
    }
  };

  useEffect(() => {
    const loadSecurityClearance = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/security_clearance/${security_clearance_id}`
        );
        const d = res.data;

        setFormData({
          security_clearance_level: d.security_clearance_level || "",
          weapon_handling_clearance: d.weapon_handling_clearance || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading security clearance:", err);
        toast.error("Failed to load security clearance");
        setLoading(false);
      }
    };

    loadSecurityClearance();
  }, [security_clearance_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleSecurityClearanceEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Security Clearance Level *</label>
                <input type="text" name="security_clearance_level"
                  className="form-control" placeholder="Enter clearance level"
                  value={formData.security_clearance_level} onChange={handleChange}
                  required/>
              </div>
              <div className="col-md-6">
                <label className="form-label">Weapon Handling Clearance *</label>
                <select name="weapon_handling_clearance" className="form-control"
                  value={formData.weapon_handling_clearance} onChange={handleChange}
                  required>
                    <option value="" disabled>-Select-</option>
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
        </>
      </div>
    </div>
  );
}

export default EditSecurityClearance