import { useState } from "react";
import "./CA.css";

/* ── Icons ── */
const Icon = ({ d, size = 16, color = "currentColor", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const icons = {
  x:        "M18 6L6 18 M6 6l12 12",
  info:     "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  check:    "M20 6L9 17l-5-5",
  chevron:  "M6 9l6 6 6-6",
  user:     "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  phone:    "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.14 1.27 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6",
  mail:     "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  share:    "M8.59 13.51l6.83 3.98 M15.41 6.51l-6.82 3.98 M21 5a3 3 0 11-6 0 3 3 0 016 0z M9 12a3 3 0 11-6 0 3 3 0 016 0z M21 19a3 3 0 11-6 0 3 3 0 016 0z",
  calendar: "M3 9h18 M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z M16 3v4 M8 3v4",
  shield:   "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
};

/* ── Toggle ── */
function ToggleSwitch({ checked, onChange }) {
  return (
    <div className={`ca-toggle ${checked ? "on" : ""}`} onClick={() => onChange(!checked)}>
      <div className="ca-toggle-thumb" />
    </div>
  );
}

/* ── Checkbox ── */
function Checkbox({ checked }) {
  return (
    <div className={`ca-checkbox ${checked ? "checked" : ""}`}>
      {checked && <Icon d={icons.check} size={11} color="#fff" strokeWidth={2.5} />}
    </div>
  );
}

/* ── CA Details Modal (Step 1) ── */
function CADetailsModal({ onClose, onAddCA }) {
  const [caName, setCaName] = useState("");
  const [caPhone, setCaPhone] = useState("");
  const [caEmail, setCaEmail] = useState("");

  return (
    <div className="ca-modal-overlay" onClick={onClose}>
      <div className="ca-modal ca-details-modal" onClick={e => e.stopPropagation()}>
        {/* Illustration Header */}
        <div className="ca-modal-illustration">
          <button className="ca-modal-close" onClick={onClose}>
            <Icon d={icons.x} size={16} color="#555" />
          </button>
          <IllustrationSVG />
        </div>

        <div className="ca-modal-body">
          <h2 className="ca-modal-title">CA Details</h2>

          <div className="ca-field">
            <label>CA Name <span className="req">*</span></label>
            <input
              type="text"
              placeholder="Ex: Ankit Mishra"
              value={caName}
              onChange={e => setCaName(e.target.value)}
            />
          </div>

          <div className="ca-field">
            <label>CA WhatsApp Number <span className="req">*</span></label>
            <input
              type="tel"
              placeholder="Ex : 9876543210"
              value={caPhone}
              onChange={e => setCaPhone(e.target.value)}
            />
          </div>

          <div className="ca-field">
            <label>CA Email ID (optional)</label>
            <input
              type="email"
              placeholder="Ex: abc@gmail.com"
              value={caEmail}
              onChange={e => setCaEmail(e.target.value)}
            />
          </div>

          <div className="ca-note">
            <Icon d={icons.info} size={14} color="#92400e" />
            <span>Note: GSTR Reports will be automatically sent to CA on 1st of every month</span>
          </div>

          <div className="ca-modal-footer">
            <div className="ca-footer-brand">
              <div className="ca-footer-icon">CA</div>
              <span>Add Your CA and forget about the hassle of report sharing</span>
            </div>
            <button
              className="ca-btn-add"
              onClick={() => onAddCA({ caName, caPhone, caEmail })}
            >
              Add Your CA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Add User Modal (Step 2) ── */
function AddUserModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("CA");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [accessAll, setAccessAll] = useState(true);
  const [sendReports, setSendReports] = useState(true);

  return (
    <div className="ca-modal-overlay" onClick={onClose}>
      <div className="ca-modal ca-adduser-modal" onClick={e => e.stopPropagation()}>
        <div className="ca-adduser-header">
          <h2 className="ca-modal-title" style={{ marginBottom: 0 }}>Add User</h2>
          <button className="ca-modal-close static" onClick={onClose}>
            <Icon d={icons.x} size={16} color="#555" />
          </button>
        </div>

        <div className="ca-modal-body">
          <div className="ca-grid-2">
            <div className="ca-field">
              <label>Name</label>
              <input type="text" placeholder="Enter user's name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="ca-field">
              <label>Mobile Number</label>
              <input type="tel" placeholder="Enter user's mobile number" value={mobile} onChange={e => setMobile(e.target.value)} />
            </div>
          </div>

          <div className="ca-grid-2">
            <div className="ca-field">
              <label>User Role</label>
              <div className="ca-select-wrap">
                <select value={role} onChange={e => setRole(e.target.value)}>
                  <option>CA</option>
                  <option>Manager</option>
                  <option>Staff</option>
                  <option>Owner</option>
                </select>
                <span className="ca-caret"><Icon d={icons.chevron} size={14} color="#888" /></span>
              </div>
            </div>
            <div className="ca-field">
              <label>Email ID (Optional)</label>
              <input type="email" placeholder="Ex. name@gmail.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="ca-field" style={{ maxWidth: "50%", paddingRight: 6 }}>
            <label>Business</label>
            <div className="ca-select-wrap">
              <select value={business} onChange={e => setBusiness(e.target.value)}>
                <option value="">Business Name</option>
                <option>Mondal Electronics Concern</option>
              </select>
              <span className="ca-caret"><Icon d={icons.chevron} size={14} color="#888" /></span>
            </div>
          </div>

          <div className="ca-permission-list">
            <div className="ca-permission-row" onClick={() => setAccessAll(!accessAll)}>
              <span>Access to all features (except changing Settings)</span>
              <Checkbox checked={accessAll} />
            </div>
            <div className="ca-permission-row" onClick={() => setSendReports(!sendReports)}>
              <span>Send automatic reports to your CA's email and WhatsApp</span>
              <Checkbox checked={sendReports} />
            </div>
          </div>

          <div className="ca-adduser-actions">
            <button className="ca-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="ca-btn-save" onClick={() => { onSave(); onClose(); }}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Illustration SVG ── */
function IllustrationSVG() {
  return (
    <svg viewBox="0 0 480 180" xmlns="http://www.w3.org/2000/svg" className="ca-illustration">
      {/* Background */}
      <rect width="480" height="180" fill="#f0eeff" />

      {/* Folder */}
      <rect x="30" y="60" width="110" height="85" rx="6" fill="#7c6ff7" />
      <rect x="30" y="50" width="55" height="18" rx="4" fill="#9d94fa" />

      {/* myBillBook label on folder */}
      <rect x="38" y="105" width="94" height="28" rx="4" fill="white" opacity="0.9"/>
      <text x="85" y="124" textAnchor="middle" fontSize="9" fill="#5b4cf5" fontWeight="700">myBillBook</text>

      {/* GSTR docs */}
      <rect x="55" y="62" width="52" height="38" rx="3" fill="white" />
      <text x="81" y="77" textAnchor="middle" fontSize="8" fill="#333" fontWeight="600">GSTR 1</text>
      <line x1="63" y1="83" x2="99" y2="83" stroke="#ddd" strokeWidth="1" />
      <line x1="63" y1="89" x2="93" y2="89" stroke="#ddd" strokeWidth="1" />

      <rect x="75" y="72" width="52" height="38" rx="3" fill="white" />
      <text x="101" y="87" textAnchor="middle" fontSize="8" fill="#333" fontWeight="600">GSTR 2</text>
      <line x1="83" y1="93" x2="119" y2="93" stroke="#ddd" strokeWidth="1" />
      <line x1="83" y1="99" x2="113" y2="99" stroke="#ddd" strokeWidth="1" />

      {/* Dashed arrow */}
      <path d="M160 80 Q250 30 310 85" stroke="#7c6ff7" strokeWidth="2" strokeDasharray="6 4" fill="none" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L0,8 L8,4 z" fill="#7c6ff7" />
        </marker>
      </defs>

      {/* CA person */}
      {/* Monitor */}
      <rect x="350" y="75" width="90" height="65" rx="5" fill="#d1d5db" />
      <rect x="356" y="81" width="78" height="50" rx="3" fill="#e8e5ff" />
      <rect x="386" y="140" width="18" height="8" rx="2" fill="#9ca3af" />
      <rect x="376" y="148" width="38" height="4" rx="2" fill="#9ca3af" />

      {/* Person body */}
      <rect x="300" y="95" width="55" height="55" rx="4" fill="#f3d5b5" />
      <rect x="308" y="120" width="38" height="30" rx="3" fill="#c8a97e" />
      {/* Head */}
      <circle cx="328" cy="88" r="18" fill="#f3d5b5" />
      {/* Hair */}
      <ellipse cx="328" cy="73" rx="18" ry="8" fill="#2d2d2d" />
      {/* Glasses */}
      <rect x="317" y="86" width="10" height="7" rx="2" fill="none" stroke="#555" strokeWidth="1.2" />
      <rect x="330" y="86" width="10" height="7" rx="2" fill="none" stroke="#555" strokeWidth="1.2" />
      <line x1="327" y1="89" x2="330" y2="89" stroke="#555" strokeWidth="1" />
      {/* Tie */}
      <path d="M324 120 L328 145 L332 120 Z" fill="#5b4cf5" />
      {/* Files on desk */}
      <rect x="310" y="100" width="35" height="22" rx="2" fill="#bfdbfe" />
      <rect x="315" y="105" width="25" height="12" rx="1" fill="white" opacity="0.7" />
    </svg>
  );
}

/* ── Main Page ── */
export default function CAReportsSharing() {
  const [sharingEnabled, setSharingEnabled] = useState(false);
  const [showCAModal, setShowCAModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleToggle = (val) => {
    setSharingEnabled(val);
    if (val) setShowCAModal(true);
  };

  const handleAddCA = () => {
    setShowCAModal(false);
    setShowAddUserModal(true);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="ca-page">
      {/* Header */}
      <div className="ca-header">
        <div>
          <h1 className="ca-title">CA Reports Sharing</h1>
          <p className="ca-subtitle">Automatically share reports to your CA every month</p>
        </div>
        <div className="ca-header-actions">
          <button className="ca-btn-ghost">Cancel</button>
          <button className={`ca-btn-save-top ${saved ? "saved" : ""}`} onClick={handleSave}>
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Settings Section */}
      <div className="ca-settings-section">
        <h2 className="ca-section-title">Settings</h2>

        <div className="ca-enable-row">
          <div className="ca-enable-info">
            <div className="ca-enable-label">
              <Icon d={icons.share} size={15} color={sharingEnabled ? "#5b4cf5" : "#6b7280"} />
              Enable Sharing
            </div>
            <div className="ca-enable-desc">Control the business reports sharing with your CA</div>
          </div>
          <ToggleSwitch checked={sharingEnabled} onChange={handleToggle} />
        </div>

        {sharingEnabled && (
          <div className="ca-info-banner">
            <Icon d={icons.info} size={15} color="#92400e" />
            <span>Automatic report sending will be scheduled for the 1st of every month starting from May 1, 2026</span>
          </div>
        )}

        {!sharingEnabled && (
          <div className="ca-info-banner">
            <Icon d={icons.info} size={15} color="#92400e" />
            <span>Automatic report sending will be scheduled for the 1st of every month starting from May 1, 2026</span>
          </div>
        )}
      </div>

      <div className="ca-footer-note">
        Note: The use of this logo does not imply any endorsement, affiliation, or association with the ICAI. The logo is the intellectual property of ICAI, and all rights to the logo remain with them
      </div>

      {/* CA Details Modal */}
      {showCAModal && (
        <CADetailsModal
          onClose={() => { setShowCAModal(false); setSharingEnabled(false); }}
          onAddCA={handleAddCA}
        />
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <AddUserModal
          onClose={() => setShowAddUserModal(false)}
          onSave={() => {}}
        />
      )}
    </div>
  );
}