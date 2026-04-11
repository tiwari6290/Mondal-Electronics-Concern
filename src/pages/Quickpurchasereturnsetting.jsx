import React, { useState } from "react";
import "./Quickpurchasereturnsetting.css";

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const QuickPurchaseReturnSettings = ({ onClose }) => {
  const [prefixEnabled, setPrefixEnabled]       = useState(true);
  const [itemImageEnabled, setItemImageEnabled] = useState(true);
  const [prefix, setPrefix]                     = useState("Prefix");
  const [sequenceNumber, setSequenceNumber]     = useState("1");

  return (
    <div className="qprs-overlay" onClick={onClose}>
      <div className="qprs-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="qprs-header">
          <h2 className="qprs-title">Quick Purchase Return Settings</h2>
          <button className="qprs-close-btn" onClick={onClose}><XIcon /></button>
        </div>

        {/* Section 1 – Prefix & Sequence */}
        <div className="qprs-section">
          <div className="qprs-section-top">
            <div>
              <div className="qprs-section-title">Purchase Return Prefix &amp; Sequence Number</div>
              <div className="qprs-section-desc">Add your custom prefix &amp; sequence for Purchase Return Numbering</div>
            </div>
            <button
              className={`qprs-toggle ${prefixEnabled ? "qprs-toggle--on" : ""}`}
              onClick={() => setPrefixEnabled(v => !v)}
            >
              <span className="qprs-toggle-thumb" />
            </button>
          </div>

          {prefixEnabled && (
            <div className="qprs-prefix-row">
              <div className="qprs-field">
                <label className="qprs-label">Prefix</label>
                <input
                  className="qprs-input"
                  value={prefix}
                  onChange={e => setPrefix(e.target.value)}
                />
              </div>
              <div className="qprs-field">
                <label className="qprs-label">Sequence Number</label>
                <input
                  className="qprs-input"
                  value={sequenceNumber}
                  onChange={e => setSequenceNumber(e.target.value)}
                />
              </div>
              <div className="qprs-preview">
                Purchase Return Number: {sequenceNumber}
              </div>
            </div>
          )}
        </div>

        {/* Section 2 – Item Image */}
        <div className="qprs-section">
          <div className="qprs-section-top">
            <div>
              <div className="qprs-section-title">Show Item Image on Invoice</div>
              <div className="qprs-section-desc">This will apply to all vouchers except for Payment In and Payment Out</div>
            </div>
            <button
              className={`qprs-toggle ${itemImageEnabled ? "qprs-toggle--on" : ""}`}
              onClick={() => setItemImageEnabled(v => !v)}
            >
              <span className="qprs-toggle-thumb" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="qprs-footer">
          <button className="qprs-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="qprs-save-btn" onClick={onClose}>Save</button>
        </div>

      </div>
    </div>
  );
};

export default QuickPurchaseReturnSettings;