import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const user_id = localStorage.getItem("user_id");

  const handleChangePassword = () => {
    navigate(`/dashboard/change_password/${user_id}`);
  };

  useEffect(() => {
    if (!user_id) {
      console.error("No user ID found in localStorage");
      setLoading(false);
      return;
    }

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

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!user) return <p className="text-center mt-5 text-danger">User not found</p>;

  const { username, email, user_role } = user;

  return (
    <div className="add-employee-page px-5 mt-4">

      <div className="table-responsive p-4 mb-4">
        <h3 className="employee-detail-heading fs-5 text-start fw-semibold mb-3">
          User Account Information
        </h3>

        <div className="p-3 rounded-3 shadow-sm">
          <div className="row g-3">
            <div className="col-md-12">
              <p><strong>Username:</strong> {username}</p>
            </div>
            <div className="col-md-12">
              <p><strong>Email:</strong> {email}</p>
            </div>
            <div className="col-md-12">
              <p><strong>User Role:</strong> {user_role}</p>
            </div>
          </div>
        </div>

        <div className="text-end mt-3">
          <button
            className="edit-btn btn btn-outline-warning px-4 py-2"
            onClick={handleChangePassword}
          >
            <i className="bi bi-lock-fill me-2"></i>Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile