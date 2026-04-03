import { useState } from "react";
import "./PartySettings.css";
import { FiX, FiMessageSquare, FiSliders } from "react-icons/fi";
import { BsToggleOn, BsLayoutTextSidebarReverse } from "react-icons/bs";

/* ── Toggle Switch ── */
const Toggle = ({ checked, onChange }) => (
  <label className="ps-toggle">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="ps-toggle-slider" />
  </label>
);

/* ── Send Smart Greetings Tab ── */
const SmartGreetingsTab = () => {
  const [invoiceOn,  setInvoiceOn]  = useState(true);
  const [birthdayOn, setBirthdayOn] = useState(true);

  return (
    <div className="ps-tab-content">
      <h3 className="ps-tab-title">
        Select Templates to Share Automated Smart Greetings with Parties on WhatsApp
      </h3>

      {/* Invoice Milestones */}
      <div className="ps-card">
        <div className="ps-card-header">
          <div>
            <p className="ps-card-name">Invoice Milestones</p>
            <p className="ps-card-desc">
              Make every 10th, 25th, 50th or 100th invoice feel special.
            </p>
          </div>
          <Toggle checked={invoiceOn} onChange={() => setInvoiceOn(!invoiceOn)} />
        </div>

        <div className="ps-template-box">
          <span className="ps-template-text">
            Hey , {`{{MilestoneMessage}}`} with {`{{YourBusinessName}}`} — thank you,{" "}
            {`{{PartyName}}`}! 🎉 {`{ViewI...`}
          </span>
          <span className="ps-chevron">&#8964;</span>
        </div>

        <p className="ps-preview">
          Hey , Half-century! 50 invoices with Aashika Traders — thank you, Shubhi Trading! 🎉{" "}
          &lt;View Invoice&gt;
        </p>
      </div>

      {/* Birthday Wishes */}
      <div className="ps-card">
        <div className="ps-card-header">
          <div>
            <p className="ps-card-name">Birthday Wishes</p>
            <p className="ps-card-desc">
              Send a warm greeting on your party's birthday automatically.
            </p>
          </div>
          <Toggle checked={birthdayOn} onChange={() => setBirthdayOn(!birthdayOn)} />
        </div>

        <div className="ps-template-box">
          <span className="ps-template-text">
            Happy Birthday, {`{{Party Name}}`}! 🎂 Wishing you success &amp; smiles.
          </span>
          <span className="ps-chevron">&#8964;</span>
        </div>

        <p className="ps-preview">
          Happy Birthday, Shubhi Traders! 🎂 Wishing you success &amp; smiles.
        </p>
      </div>
    </div>
  );
};

/* ── Custom Fields Tab ── */
const CustomFieldsTab = () => (
  <div className="ps-tab-content ps-custom-empty">
    {/* Decorative illustration */}
    <div className="ps-illustration">
      <div className="ps-pill ps-pill-top">
        <span className="ps-pill-icon ps-green">
          <FiSliders size={14} color="#fff" />
        </span>
        <span className="ps-pill-label">License Number</span>
      </div>
      <div className="ps-pill-row">
        <div className="ps-pill">
          <span className="ps-pill-icon ps-yellow">🎂</span>
          <span className="ps-pill-label">Birthday</span>
        </div>
        <div className="ps-pill">
          <span className="ps-pill-label">Website Link</span>
          <span className="ps-pill-icon ps-orange">🔗</span>
        </div>
      </div>
      {/* blurred bg lines */}
      <div className="ps-blur-line ps-blur-1" />
      <div className="ps-blur-line ps-blur-2" />
      <div className="ps-blur-line ps-blur-3" />
    </div>

    <p className="ps-empty-text">You don't have any custom fields created yet</p>
    <button className="ps-create-btn">+ Create custom field</button>
  </div>
);

/* ── Main Modal ── */
const PartySettings = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("greetings");

  return (
    <div className="ps-overlay">
      <div className="ps-modal">

        {/* Header */}
        <div className="ps-header">
          <h2 className="ps-title">Party Settings</h2>
          <button className="ps-close" onClick={onClose}>
            <FiX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="ps-body">

          {/* Left Sidebar Tabs */}
          <div className="ps-sidebar">
            <button
              className={`ps-tab-btn ${activeTab === "greetings" ? "ps-tab-active" : ""}`}
              onClick={() => setActiveTab("greetings")}
            >
              <FiMessageSquare size={15} />
              <span>Send Smart Greetings</span>
            </button>

            <button
              className={`ps-tab-btn ${activeTab === "custom" ? "ps-tab-active" : ""}`}
              onClick={() => setActiveTab("custom")}
            >
              <BsLayoutTextSidebarReverse size={15} />
              <span>Custom Fields</span>
            </button>
          </div>

          {/* Right Content */}
          <div className="ps-content">
            {activeTab === "greetings" ? <SmartGreetingsTab /> : <CustomFieldsTab />}
          </div>

        </div>

        {/* Footer */}
        <div className="ps-footer">
          <button className="ps-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="ps-save-btn">Save</button>
        </div>

      </div>
    </div>
  );
};

export default PartySettings;
