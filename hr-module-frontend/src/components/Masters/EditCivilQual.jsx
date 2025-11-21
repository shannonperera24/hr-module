import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCivilQual = () => {
  const { civil_qualification_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    civil_qualification_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCivilQualEdit = async (e) => {
    e.preventDefault();

    const payload = {
      civil_qualification_name: formData.civil_qualification_name,
    };

    try {
      await axios.patch(
        `http://localhost:3000/civil_qualification/${civil_qualification_id}`,
        payload
      );
      toast.success("Civil qualification updated successfully!");
      navigate("/dashboard/civil_qualification");
    } catch (error) {
      console.error("Error updating civil qualification:", error);
      toast.error("Failed to update qualification");
    }
  };

  useEffect(() => {
    const loadQualification = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/civil_qualification/${civil_qualification_id}`
        );
        const q = res.data;
        setFormData({
          civil_qualification_name: q.civil_qualification_name || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading qualification:", err);
        toast.error("Failed to load qualification");
        setLoading(false);
      }
    };

    loadQualification();
  }, [civil_qualification_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleCivilQualEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Qualification Name *</label>
                <input type="text" name="civil_qualification_name"
                  className="form-control" placeholder="Enter qualification"
                  value={formData.civil_qualification_name} onChange={handleChange}
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

export default EditCivilQual