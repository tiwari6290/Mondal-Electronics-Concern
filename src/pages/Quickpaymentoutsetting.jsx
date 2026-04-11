import React, { useState } from "react";
import "./Quickpaymentoutsetting.css";

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const QuickPaymentOutSettings = ({ onClose }) => {
  const [prefixEnabled, setPrefixEnabled] = useState(true);
  const [prefix, setPrefix]               = useState("Prefix");
  const [sequenceNumber, setSequenceNumber] = useState("1");

  return (
    <div className="qpos-overlay" onClick={onClose}>
      <div className="qpos-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="qpos-header">
          <h2 className="qpos-title">Quick Payment Out Settings</h2>
          <button className="qpos-close-btn" onClick={onClose}><XIcon /></button>
        </div>

        {/* Section – Prefix & Sequence */}
        <div className="qpos-section">
          <div className="qpos-section-top">
            <div>
              <div className="qpos-section-title">Payment Out Prefix &amp; Sequence Number</div>
              <div className="qpos-section-desc">Add your custom prefix &amp; sequence for Payment Out Numbering</div>
            </div>
            <button
              className={`qpos-toggle ${prefixEnabled ? "qpos-toggle--on" : ""}`}
              onClick={() => setPrefixEnabled(v => !v)}
            >
              <span className="qpos-toggle-thumb" />
            </button>
          </div>

          {prefixEnabled && (
            <div className="qpos-prefix-row">
              <div className="qpos-field">
                <label className="qpos-label">Prefix</label>
                <input
                  className="qpos-input"
                  value={prefix}
                  onChange={e => setPrefix(e.target.value)}
                />
              </div>
              <div className="qpos-field">
                <label className="qpos-label">Sequence Number</label>
                <input
                  className="qpos-input"
                  value={sequenceNumber}
                  onChange={e => setSequenceNumber(e.target.value)}
                />
              </div>
              <div className="qpos-preview">
                Payment Out Number: {sequenceNumber}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="qpos-footer">
          <button className="qpos-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="qpos-save-btn" onClick={onClose}>Save</button>
        </div>

      </div>
    </div>
  );
};

export default QuickPaymentOutSettings;