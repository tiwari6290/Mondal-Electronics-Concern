import React, { useState } from "react";
import "./Quickpurchaseordersetting.css";

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const QuickPurchaseOrderSettings = ({ onClose }) => {
  const [prefixEnabled, setPrefixEnabled]           = useState(true);
  const [itemImageEnabled, setItemImageEnabled]     = useState(true);
  const [priceHistoryEnabled, setPriceHistoryEnabled] = useState(true);
  const [prefix, setPrefix]                         = useState("Prefix");
  const [sequenceNumber, setSequenceNumber]         = useState("1");

  return (
    <div className="qpos2-overlay" onClick={onClose}>
      <div className="qpos2-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="qpos2-header">
          <h2 className="qpos2-title">Quick Purchase Order Settings</h2>
          <button className="qpos2-close-btn" onClick={onClose}><XIcon /></button>
        </div>

        {/* Section 1 – Prefix & Sequence */}
        <div className="qpos2-section">
          <div className="qpos2-section-top">
            <div>
              <div className="qpos2-section-title">Purchase Order Prefix &amp; Sequence Number</div>
              <div className="qpos2-section-desc">Add your custom prefix &amp; sequence for Purchase Order Numbering</div>
            </div>
            <button
              className={`qpos2-toggle ${prefixEnabled ? "qpos2-toggle--on" : ""}`}
              onClick={() => setPrefixEnabled(v => !v)}
            >
              <span className="qpos2-toggle-thumb" />
            </button>
          </div>

          {prefixEnabled && (
            <div className="qpos2-prefix-row">
              <div className="qpos2-field">
                <label className="qpos2-label">Prefix</label>
                <input
                  className="qpos2-input"
                  value={prefix}
                  onChange={e => setPrefix(e.target.value)}
                />
              </div>
              <div className="qpos2-field">
                <label className="qpos2-label">Sequence Number</label>
                <input
                  className="qpos2-input"
                  value={sequenceNumber}
                  onChange={e => setSequenceNumber(e.target.value)}
                />
              </div>
              <div className="qpos2-preview">
                Purchase Order Number: {sequenceNumber}
              </div>
            </div>
          )}
        </div>

        {/* Section 2 – Item Image */}
        <div className="qpos2-section">
          <div className="qpos2-section-top">
            <div>
              <div className="qpos2-section-title">Show Item Image on Invoice</div>
              <div className="qpos2-section-desc">This will apply to all vouchers except for Payment In and Payment Out</div>
            </div>
            <button
              className={`qpos2-toggle ${itemImageEnabled ? "qpos2-toggle--on" : ""}`}
              onClick={() => setItemImageEnabled(v => !v)}
            >
              <span className="qpos2-toggle-thumb" />
            </button>
          </div>
        </div>

        {/* Section 3 – Price History */}
        <div className="qpos2-section">
          <div className="qpos2-section-top">
            <div>
              <div className="qpos2-section-title">
                Price History
                <span className="qpos2-new-badge">New</span>
              </div>
              <div className="qpos2-section-desc">Show last 5 sales / purchase prices of the item for the selected party in invoice</div>
            </div>
            <button
              className={`qpos2-toggle ${priceHistoryEnabled ? "qpos2-toggle--on" : ""}`}
              onClick={() => setPriceHistoryEnabled(v => !v)}
            >
              <span className="qpos2-toggle-thumb" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="qpos2-footer">
          <button className="qpos2-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="qpos2-save-btn" onClick={onClose}>Save</button>
        </div>

      </div>
    </div>
  );
};

export default QuickPurchaseOrderSettings;