import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${user_id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
        toast.error("New password and Confirm password do not match!");
        return;
    }

    setSaving(true);

    try {
        await axios.patch(`http://localhost:3000/users/${user_id}`, {
        password_hash: formData.new_password,   
        });

        toast.success("Password changed successfully!");
        navigate(`/dashboard/profile`);
    } catch (err) {
        console.error("Failed to update password:", err);
        const msg =
        err.response?.data?.message ||
        "Failed to change password. Please try again.";
        toast.error(msg);
    } finally {
        setSaving(false);
    }
  };


  if (loading) return <p className="mt-5 text-center">Loading...</p>;
  if (!user)
    return (
      <p className="mt-5 text-center text-danger">User not found</p>
    );

  return (
    <div className="add-employee-page px-5 mt-4">
      <div className="table-responsive p-4">
        <h3 className="fs-5 text-start fw-semibold mb-3">
          Change Password 
        </h3>

        <form onSubmit={handlePasswordUpdate}>
          <div className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Current Password *</label>
              <input type="password" name="current_password"
                className="form-control" value={formData.current_password}
                onChange={handleChange} required/>
            </div>

            <div className="col-md-12">
              <label className="form-label">New Password *</label>
              <input type="password" name="new_password"
                className="form-control" value={formData.new_password}
                onChange={handleChange} required/>
            </div>

            <div className="col-md-12">
              <label className="form-label">Confirm New Password *</label>
              <input type="password" name="confirm_password"
                className="form-control" value={formData.confirm_password}
                onChange={handleChange} required/>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-success px-4"
              disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;