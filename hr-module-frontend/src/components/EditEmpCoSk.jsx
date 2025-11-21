import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmpCoSk = () => {
  const { qualification_computer_skill_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [computerSkillMaster, setComputerSkillMaster] = useState([]);

  const [formData, setFormData] = useState({
    qualification_record_id: "",
    computer_skill_id: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ compItemRes, compMasterRes ] = await Promise.all([
          axios.get(`http://localhost:3000/qualification_computer_skill/${qualification_computer_skill_id}`),
          axios.get("http://localhost:3000/computer_skill"),
        ]);

        const compItem = compItemRes.data;
        setComputerSkillMaster(compMasterRes.data);
        
        setFormData({
          qualification_record_id: compItem.qualification_record_id,
          computer_skill_id: compItem.computer_skill_id
        });
      } catch (err) {
        console.error("Error loading computer skill:", err);
        toast.error("Failed to load computer skill");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [qualification_computer_skill_id]);

  const handleEmpCoSkEdit = async (e) => {
    e.preventDefault();

    const payload = {
      qualification_record_id: Number(formData.qualification_record_id),
      computer_skill_id: Number(formData.computer_skill_id)
    };

    try {
      await axios.patch(`http://localhost:3000/qualification_computer_skill/${qualification_computer_skill_id}`, payload);
      toast.success("Computer skill updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating computer skill:", error);
      toast.error("Failed to update computer skill");
    }
  };

  if (loading) return <div>Loading...</div>

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4 mb-4">
        <>
          <form onSubmit={handleEmpCoSkEdit}>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Qualification Record ID</label>
                    <input type="text" className="form-control"
                        value={formData.qualification_record_id} disabled/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Computer Skill *</label>
                    <select name="computer_skill_id" className="form-select"
                        value={formData.computer_skill_id} onChange={handleChange}
                        required>
                        <option value="">-Select-</option>
                        {computerSkillMaster.map(skill => (
                        <option key={skill.computer_skill_id} value={skill.computer_skill_id}>
                            {skill.computer_skill_name}
                        </option>
                        ))}
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

export default EditEmpCoSk