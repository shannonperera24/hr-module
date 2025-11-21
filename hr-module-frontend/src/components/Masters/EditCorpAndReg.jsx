import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCorpAndReg = () => {
  const { corp_and_regiment_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    corp_and_regiment_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCorpAndRegEdit = async (e) => {
    e.preventDefault();

    const payload = {
      corp_and_regiment_name: formData.corp_and_regiment_name,
    };

    try {
      await axios.patch(`http://localhost:3000/corp_and_regiment/${corp_and_regiment_id}`, payload);
      toast.success("Corp and regiment updated successfully!");
      navigate("/dashboard/corp_and_regiment"); 
    } catch (error) {
      console.error("Error updating corp and regiment:", error);
      toast.error("Failed to update corp and regiment");
    }
  };

  useEffect(() => {
    const loadCorpAndReg = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/corp_and_regiment/${corp_and_regiment_id}`);
        const r = res.data;

        setFormData({
          corp_and_regiment_name: r.corp_and_regiment_name || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading corp and regiment:", err);
        toast.error("Failed to load corp and regiment");
        setLoading(false);
      }
    };

    loadCorpAndReg();
  }, [corp_and_regiment_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleCorpAndRegEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Corp & Regiment Name *</label>
                <input type="text" name="corp_and_regiment_name"
                  className="form-control" placeholder="Enter corps & regiment name"
                  value={formData.corp_and_regiment_name} onChange={handleChange}
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

export default EditCorpAndReg