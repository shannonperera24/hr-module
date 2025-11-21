import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditOverseasPosting = () => {
  const { overseas_posting_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    overseas_posting_type: "",
    overseas_posting_country: "",
    overseas_posting_description: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleOverseasPostingEdit = async (e) => {
    e.preventDefault();

    const payload = {
      overseas_posting_type: formData.overseas_posting_type,
      overseas_posting_country: formData.overseas_posting_country,
      overseas_posting_description: formData.overseas_posting_description,
    };

    try {
      await axios.patch(`http://localhost:3000/overseas_posting/${overseas_posting_id}`,
        payload);
      toast.success("Overseas posting updated successfully!");
      navigate("/dashboard/overseas_posting");
    } catch (error) {
      console.error("Error updating overseas posting:", error);
      toast.error("Failed to update overseas posting");
    }
  };

  useEffect(() => {
    const loadOverseasPosting = async () => {
      try {
        const res = await 
          axios.get(`http://localhost:3000/overseas_posting/${overseas_posting_id}`);
        const d = res.data;

        setFormData({
          overseas_posting_type: d.overseas_posting_type || "",
          overseas_posting_country: d.overseas_posting_country || "",
          overseas_posting_description: d.overseas_posting_description || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading overseas posting:", err);
        toast.error("Failed to load overseas posting");
        setLoading(false);
      }
    };

    loadOverseasPosting();
  }, [overseas_posting_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleOverseasPostingEdit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Posting Type *</label>
                <input type="text" name="overseas_posting_type"
                  className="form-control" placeholder="Enter posting type"
                  value={formData.overseas_posting_type} onChange={handleChange}
                  required/>
              </div>
              <div className="col-md-4">
                <label className="form-label">Country *</label>
                <input type="text" name="overseas_posting_country"
                  className="form-control" placeholder="Enter country"
                  value={formData.overseas_posting_country} onChange={handleChange}
                  required/>
              </div>
              <div className="col-md-4">
                <label className="form-label">Description *</label>
                <input type="text" name="overseas_posting_description"
                  className="form-control" placeholder="Enter description"
                  value={formData.overseas_posting_description} onChange={handleChange}
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

export default EditOverseasPosting