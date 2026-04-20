import { useState } from "react";
import "./AccountSetting.css";

const features = [
  {
    label: "Multi User and Staff Access",
    bg: "#eeedfe",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#534ab7" />
      </svg>
    ),
  },
  {
    label: "Multiple Businesses",
    bg: "#eeedfe",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8V8h8v11zm-2-8h-4v2h4v-2zm0 4h-4v2h4v-2z" fill="#534ab7" />
      </svg>
    ),
  },
  {
    label: "EWay Bill Generation",
    bg: "#e1f5ee",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="#0f6e56" />
      </svg>
    ),
  },
  {
    label: "Desktop App",
    bg: "#e6f1fb",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" fill="#185fa5" />
      </svg>
    ),
  },
  {
    label: "SMS Marketing",
    bg: "#faeeda",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" fill="#854f0b" />
      </svg>
    ),
  },
  {
    label: "Scan & Print Barcode",
    bg: "#f1efe8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
        <path d="M2 6h2v12H2zm3 0h1v12H5zm2 0h2v12H7zm3 0h2v12h-2zm3 0h1v12h-1zm2 0h1v12h-1zm2 0h3v12h-3z" fill="#444441" />
      </svg>
    ),
  },
];

export default function AccountSettings() {
  const [name, setName] = useState("");
  const [mobile] = useState("7003025622");
  const [email, setEmail] = useState("");
  const [referral, setReferral] = useState("");

  return (
    <div className="as-page">
      {/* ❌ Sidebar REMOVED */}

      <div className="as-main">

        <div className="as-topbar">
          <div className="as-topbar-left">
            <h2>Account Settings</h2>
            <p>Manage Your Account And Subscription</p>
          </div>
          <div className="as-topbar-right">
            <div className="as-kb-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="10" rx="2" stroke="#888" strokeWidth="1.2" />
                <rect x="3" y="6" width="2" height="1.5" rx="0.5" fill="#888" />
                <rect x="7" y="6" width="2" height="1.5" rx="0.5" fill="#888" />
                <rect x="11" y="6" width="2" height="1.5" rx="0.5" fill="#888" />
                <rect x="5" y="9" width="6" height="1.5" rx="0.5" fill="#888" />
              </svg>
            </div>
            <button className="as-btn-chat">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 2h12v10H9l-3 2v-2H2V2z" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
              Chat Support
            </button>
            <button className="as-btn-cancel">Cancel</button>
            <button className="as-btn-save">Save Changes</button>
          </div>
        </div>

        <div className="as-suggest-bar">
          <span>Help us make myBillBook better</span>
          <button className="as-btn-suggest">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.2" />
              <path d="M6 8l1.5 1.5L10 6" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Share Suggestion
          </button>
        </div>

        <div className="as-section-title">General Information</div>
        <div className="as-form-section">
          <div className="as-form-row">
            <div className="as-form-group">
              <label>NAME *</label>
              <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="as-form-group">
              <label>MOBILE NUMBER</label>
              <input type="text" value={mobile} readOnly />
            </div>
            <div className="as-form-group">
              <label>EMAIL</label>
              <input type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="as-section-title">Referral code for subscription discount</div>
        <div className="as-referral-row">
          <input
            type="text"
            placeholder="Referral Code"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            className="as-referral-input"
          />
          <button className="as-btn-apply">Apply</button>
        </div>

        <div className="as-section-title">Subscription Plan</div>
        <div className="as-plan-section">
          <div className="as-plan-left">
            <p className="as-plan-label">CURRENT PLAN</p>
            <h2 className="as-plan-name">Free Trial Expired</h2>
            <button className="as-btn-buy">Buy Subscription Plan</button>
            <div className="as-social-proof">
              <div className="as-avatars">
                {["A", "B", "C", "D"].map((l, i) => (
                  <div key={i} className={`as-avatar as-avatar-${i}`}>{l}</div>
                ))}
              </div>
              <p className="as-social-text">
                10,00,000+ Vyaparis running their<br />
                business on myBillBook premium
              </p>
            </div>
          </div>

          <div className="as-plan-right">
            <p className="as-upgrade-title">
              Upgrade your plan today and get access to premium features:
            </p>
            <div className="as-features-grid">
              {features.map((f, i) => (
                <div className="as-feature-item" key={i}>
                  <div className="as-feat-icon" style={{ background: f.bg }}>
                    {f.icon}
                  </div>
                  <span className="as-feat-label">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}