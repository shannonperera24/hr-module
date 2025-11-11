import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useEffect, useState } from "react";
import routeTitles from "../config/routeTitles";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [user, setUser] = useState({
    username: '',
    user_role: ''
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserRole = localStorage.getItem('user_role');

    if (storedUsername && storedUserRole) {
      setUser({ username: storedUsername, user_role: storedUserRole });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_role");
    navigate('/');
  }

  const location = useLocation();
  const currentTitle = routeTitles[location.pathname] || 'Pay & Record System';

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <div className="sidebar-header">
          <h5 className="sidebar-title">Sri Lanka Army</h5>
        </div>
        <div className="sidebar-user">
          <i className="bi-person-circle sidebar-user-icon"></i>
          <div className="sidebar-user-info">
            <p className="username">{ user.username }</p>
            <small className="user-role">{ user.user_role }</small>
          </div>
        </div>

        <ul className="nav flex-column">
          <li>
            <Link to="/dashboard" className="nav-link">
              <i className="bi-speedometer2 me-2"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/employee" className="nav-link">
              <i className="bi-people me-2"></i> Employee Management
            </Link>
          </li>
          <li>
            <Link to="/dashboard/posting" className="nav-link">
              <i className="bi-briefcase me-2"></i> Posting Management
            </Link>
          </li>
          <li>
            <Link to="/dashboard/pay" className="nav-link">
              <i className="bi-cash-stack me-2"></i> Pay & Allowance
            </Link>
          </li>
          <li>
            <Link to="/dashboard/qualification" className="nav-link">
              <i className="bi-award me-2"></i> Qualification & Training
            </Link>
          </li>
          <li>
            <Link to="/dashboard/medical" className="nav-link">
              <i className="bi-heart-pulse me-2"></i> Medical Records
            </Link>
          </li>
          <li>
            <Link to="/dashboard/security" className="nav-link">
              <i className="bi-shield-lock me-2"></i> Security Clearance
            </Link>
          </li>
          <li>
            <Link to="/dashboard/awards" className="nav-link">
              <i className="bi-trophy me-2"></i> Awards & Achievements
            </Link>
          </li>

          <div className="nav-separator"></div>

          <li>
            <Link to="/dashboard/profile" className="nav-link">
              <i className="bi-person me-2"></i> Profile
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Link className="nav-link logout-link">
              <i className="bi-power me-2"></i> Logout
            </Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="dashboard-header shadow-sm">
          <h4>{currentTitle}</h4>
        </div>
        <div className="dashboard-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard