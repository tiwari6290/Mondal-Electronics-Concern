import { useState } from "react";
import "./QuickInvoiceSettings.css";
import { FiX, FiArrowRight } from "react-icons/fi";

/* ── Reusable Toggle ── */
const Toggle = ({ checked, onChange }) => (
  <label className="qis-toggle">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="qis-slider" />
  </label>
);

/* ── Setting Row Card ── */
const SettingCard = ({ title, desc, checked, onChange, badge }) => (
  <div className="qis-card">
    <div className="qis-card-info">
      <div className="qis-card-title-row">
        <span className="qis-card-title">{title}</span>
        {badge && <span className="qis-badge">{badge}</span>}
      </div>
      <p className="qis-card-desc">{desc}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

/* ── Main Modal ── */
const QuickInvoiceSettings = ({ onClose }) => {
  const [invoicePrefix,   setInvoicePrefix]   = useState(false);
  const [showPurchase,    setShowPurchase]     = useState(true);
  const [showItemImage,   setShowItemImage]    = useState(true);
  const [priceHistory,    setPriceHistory]     = useState(true);
  const [invoiceTheme,    setInvoiceTheme]     = useState("Advanced GST");

  return (
    <div className="qis-overlay">
      <div className="qis-modal">

        {/* ── Header ── */}
        <div className="qis-header">
          <h2 className="qis-title">Quick Invoice Settings</h2>
          <button className="qis-close" onClick={onClose}>
            <FiX size={18} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="qis-body">

          {/* Setting Cards */}
          <SettingCard
            title="Invoice Prefix & Sequence Number"
            desc="Add your custom prefix & sequence for Invoice Numbering"
            checked={invoicePrefix}
            onChange={(e) => setInvoicePrefix(e.target.checked)}
          />

          <SettingCard
            title="Show Purchase Price while adding Items"
            desc="Add purchase price while adding items"
            checked={showPurchase}
            onChange={(e) => setShowPurchase(e.target.checked)}
          />

          <SettingCard
            title="Show Item Image on Invoice"
            desc="This will apply to all vouchers except for Payment In and Payment Out"
            checked={showItemImage}
            onChange={(e) => setShowItemImage(e.target.checked)}
          />

          <SettingCard
            title="Price History"
            desc="Show last 5 sales / purchase prices of the item for the selected party in invoice"
            checked={priceHistory}
            onChange={(e) => setPriceHistory(e.target.checked)}
            badge="New"
          />

          {/* Choose Invoice Theme */}
          <div className="qis-theme-row">
            <span className="qis-theme-label">Choose Invoice Theme</span>
            <select
              className="qis-theme-select"
              value={invoiceTheme}
              onChange={(e) => setInvoiceTheme(e.target.value)}
            >
              <option>Advanced GST</option>
              <option>Simple</option>
              <option>Professional</option>
              <option>Classic</option>
              <option>Modern</option>
            </select>
          </div>

          {/* Customise Invoice Banner */}
          <div className="qis-banner">
            <div className="qis-banner-text">
              <p className="qis-banner-heading">
                Now <strong>customise Invoice</strong><br />with ease
              </p>
              <button className="qis-full-btn">
                Full Invoice Settings <FiArrowRight size={14} />
              </button>
            </div>
            <div className="qis-banner-preview">
              <div className="qis-preview-card">
                <div className="qis-preview-header">
                  <div className="qis-preview-bar qis-bar-purple" />
                </div>
                <div className="qis-preview-body">
                  <p className="qis-preview-invoice-text">INVOICE</p>
                  <div className="qis-preview-img-box" />
                  <div className="qis-preview-lines">
                    <div className="qis-preview-line qis-line-long" />
                    <div className="qis-preview-line qis-line-med" />
                    <div className="qis-preview-dot-row">
                      <span className="qis-dot qis-dot-blue" />
                      <span className="qis-dot qis-dot-purple" />
                    </div>
                  </div>
                  <div className="qis-preview-colors">
                    {["#f87171","#fb923c","#facc15","#4ade80","#60a5fa","#a78bfa"].map((c) => (
                      <span key={c} className="qis-color-dot" style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div className="qis-footer">
          <button className="qis-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="qis-save-btn">Save</button>
        </div>

      </div>
    </div>
  );
};

export default QuickInvoiceSettings;
