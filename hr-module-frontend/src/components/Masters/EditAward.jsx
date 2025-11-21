import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditAward = () => {
  const { award_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    award_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAwardEdit = async (e) => {
    e.preventDefault();

    const payload = {
      award_name: formData.award_name,
    };

    try {
      await axios.patch(
        `http://localhost:3000/award/${award_id}`,
        payload
      );
      toast.success("Award updated successfully!");
      navigate("/dashboard/award_master");
    } catch (error) {
      console.error("Error updating award:", error);
      toast.error("Failed to update award");
    }
  };

  useEffect(() => {
    const loadAward = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/award/${award_id}`
        );
        const a = res.data;
        setFormData({
          award_name: a.award_name || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading award:", err);
        toast.error("Failed to load award");
        setLoading(false);
      }
    };

    loadAward();
  }, [award_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleAwardEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Award Name *</label>
                <input type="text" name="award_name"
                  className="form-control" placeholder="Enter award name"
                  value={formData.award_name} onChange={handleChange}
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

export default EditAward