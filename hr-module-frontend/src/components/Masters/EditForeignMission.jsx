import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditForeignMission = () => {
  const { foreign_mission_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foreign_mission_country: "",
    foreign_mission_description: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleForeignMissionEdit = async (e) => {
    e.preventDefault();

    const payload = {
      foreign_mission_country: formData.foreign_mission_country,
      foreign_mission_description: formData.foreign_mission_description,
    };
    try {
      await axios.patch(
        `http://localhost:3000/foreign_mission/${foreign_mission_id}`,
        payload
      );
      toast.success("Foreign Mission updated successfully!");
      navigate("/dashboard/foreign_mission");
    } catch (error) {
      console.error("Error updating foreign mission:", error);
      toast.error("Failed to update foreign mission");
    }
  };

  useEffect(() => {
    const loadForeignMission = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/foreign_mission/${foreign_mission_id}`
        );

        const fm = res.data;

        setFormData({
          foreign_mission_country: fm.foreign_mission_country || "",
          foreign_mission_description: fm.foreign_mission_description || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading foreign mission:", err);
        toast.error("Failed to load foreign mission");
        setLoading(false);
      }
    };

    loadForeignMission();
  }, [foreign_mission_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleForeignMissionEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Country *</label>
                <input type="text" name="foreign_mission_country"
                    className="form-control" placeholder="Enter country name"
                    value={formData.foreign_mission_country} onChange={handleChange}
                    required/>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Description *</label>
                    <textarea name="foreign_mission_description"
                        className="form-control" placeholder="Enter mission description"
                        rows="4" value={formData.foreign_mission_description}
                        onChange={handleChange} required></textarea>
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

export default EditForeignMission