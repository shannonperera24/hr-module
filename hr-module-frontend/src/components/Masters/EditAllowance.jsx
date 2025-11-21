import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditAllowance = () => {
  const { allowance_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    allowance_type: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAllowanceEdit = async (e) => {
    e.preventDefault();

    const payload = {
      allowance_type: formData.allowance_type,
    };

    try {
      await axios.patch(`http://localhost:3000/allowance/${allowance_id}`, payload);
      toast.success("Allowance updated successfully!");
      navigate("/dashboard/allowance"); 
    } catch (error) {
      console.error("Error updating allowance:", error);
      toast.error("Failed to update allowance");
    }
  };

  useEffect(() => {
    const loadAllowance = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/allowance/${allowance_id}`);
        const a = res.data;

        setFormData({
          allowance_type: a.allowance_type || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading allowance:", err);
        toast.error("Failed to load allowance");
        setLoading(false);
      }
    };

    loadAllowance();
  }, [allowance_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleAllowanceEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Allowance Type *</label>
                <input type="text" name="allowance_type"
                  className="form-control" placeholder="Enter allowance type"
                  value={formData.allowance_type} onChange={handleChange}
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

export default EditAllowance