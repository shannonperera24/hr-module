import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCompSkill = () => {
  const { computer_skill_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    computer_skill_name: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCompSkillEdit = async (e) => {
    e.preventDefault();

    const payload = {
      computer_skill_name: formData.computer_skill_name,
    };

    try {
      await axios.patch(
        `http://localhost:3000/computer_skill/${computer_skill_id}`,
        payload
      );
      toast.success("Computer skill updated successfully!");
      navigate("/dashboard/computer_skill");
    } catch (error) {
      console.error("Error updating computer skill:", error);
      toast.error("Failed to update computer skill");
    }
  };

  useEffect(() => {
    const loadCompSkill = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/computer_skill/${computer_skill_id}`
        );
        const c = res.data;
        setFormData({
          computer_skill_name: c.computer_skill_name || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("Error loading computer skill:", err);
        toast.error("Failed to load computer skill");
        setLoading(false);
      }
    };

    loadCompSkill();
  }, [computer_skill_id]);

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleCompSkillEdit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Computer Skill Name *</label>
                <input type="text" name="computer_skill_name"
                  className="form-control" placeholder="Enter computer skill"
                  value={formData.computer_skill_name} onChange={handleChange}
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

export default EditCompSkill