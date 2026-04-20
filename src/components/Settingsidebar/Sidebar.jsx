import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function SettingsSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const Item = ({ label, path }) => (
    <div
      className={`settings-item ${
        location.pathname === path ? "active" : ""
      }`}
      onClick={() => navigate(path)}
    >
      {label}
    </div>
  );

  return (
    <div className="settings-sidebar">

      {/* Top */}
      <div className="settings-header">
        <div className="avatar">M</div>
        <div>
          <div className="name">Mondal Electronics Concern</div>
          <div className="phone">9555780835</div>
        </div>
      </div>

      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      {/* Menu */}
      <div className="settings-menu">

        <div className="section">Account</div>
        <Item label="Manage Business" path="/settings" />
        <Item label="Invoice Settings" path="/settings/invoice" />
        <Item label="Print Settings" path="/settings/print" />
        <Item label="Manage Users" path="/settings/users" />

        <div className="section">Others</div>
        <Item label="Reminders" path="/settings/reminders" />
        <Item label="CA Reports Sharing" path="/settings/reports" />
        <Item label="Pricing" path="/settings/pricing" />
        <Item label="Refer & Earn" path="/settings/refer" />
        <Item label="Help & Support" path="/settings/help" />

        <div className="logout">Logout</div>

      </div>
    </div>
  );
}