import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditUnit = () => {
  const { unit_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    unit_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUnitEdit = async (e) => {
    e.preventDefault();

    const payload = {
      unit_name: formData.unit_name,
    };

    try {
      await axios.patch(`http://localhost:3000/unit/${unit_id}`, payload);
      toast.success("Unit updated successfully!");
      navigate("/dashboard/unit"); 
    } catch (error) {
      console.error("Error updating unit:", error);
      toast.error("Failed to update unit");
    }
  };

  useEffect(() => {
    const loadUnit = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/unit/${unit_id}`);
        const r = res.data;

        setFormData({
          unit_name: r.unit_name || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading unit:", err);
        toast.error("Failed to load unit");
        setLoading(false);
      }
    };

    loadUnit();
  }, [unit_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleUnitEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Unit Name *</label>
                <input type="text" name="unit_name"
                  className="form-control" placeholder="Enter unit name"
                  value={formData.unit_name} onChange={handleChange}
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

export default EditUnit