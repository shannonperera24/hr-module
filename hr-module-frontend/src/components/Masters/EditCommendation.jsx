import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCommendation = () => {
  const { commendation_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    commendation_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCommendationEdit = async (e) => {
    e.preventDefault();

    const payload = {
      commendation_name: formData.commendation_name,
    };

    try {
      await axios.patch(
        `http://localhost:3000/commendation/${commendation_id}`,
        payload
      );
      toast.success("Commendation updated successfully!");
      navigate("/dashboard/commendation");
    } catch (error) {
      console.error("Error updating commendation:", error);
      toast.error("Failed to update commendation");
    }
  };

  useEffect(() => {
    const loadCommendation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/commendation/${commendation_id}`
        );
        const c = res.data;
        setFormData({
          commendation_name: c.commendation_name || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading commendation:", err);
        toast.error("Failed to load commendation");
        setLoading(false);
      }
    };

    loadCommendation();
  }, [commendation_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleCommendationEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Commendation Name *</label>
                <input type="text" name="commendation_name"
                  className="form-control" placeholder="Enter commendation name"
                  value={formData.commendation_name} onChange={handleChange}
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

export default EditCommendation