import React, { useState } from "react";
import "./QuickDebitnotesetting.css";

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const QuickDebitNoteSettings = ({ onClose }) => {
  const [prefixEnabled, setPrefixEnabled]       = useState(true);
  const [itemImageEnabled, setItemImageEnabled] = useState(true);
  const [prefix, setPrefix]                     = useState("Prefix");
  const [sequenceNumber, setSequenceNumber]     = useState("1");

  return (
    <div className="qdns-overlay" onClick={onClose}>
      <div className="qdns-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="qdns-header">
          <h2 className="qdns-title">Quick Debit Note Settings</h2>
          <button className="qdns-close-btn" onClick={onClose}><XIcon /></button>
        </div>

        {/* Section 1 – Prefix & Sequence */}
        <div className="qdns-section">
          <div className="qdns-section-top">
            <div>
              <div className="qdns-section-title">Debit Note Prefix &amp; Sequence Number</div>
              <div className="qdns-section-desc">Add your custom prefix &amp; sequence for Debit Note Numbering</div>
            </div>
            <button
              className={`qdns-toggle ${prefixEnabled ? "qdns-toggle--on" : ""}`}
              onClick={() => setPrefixEnabled(v => !v)}
            >
              <span className="qdns-toggle-thumb" />
            </button>
          </div>

          {prefixEnabled && (
            <div className="qdns-prefix-row">
              <div className="qdns-field">
                <label className="qdns-label">Prefix</label>
                <input
                  className="qdns-input"
                  value={prefix}
                  onChange={e => setPrefix(e.target.value)}
                />
              </div>
              <div className="qdns-field">
                <label className="qdns-label">Sequence Number</label>
                <input
                  className="qdns-input"
                  value={sequenceNumber}
                  onChange={e => setSequenceNumber(e.target.value)}
                />
              </div>
              <div className="qdns-preview">
                Debit Note Number: {sequenceNumber}
              </div>
            </div>
          )}
        </div>

        {/* Section 2 – Item Image */}
        <div className="qdns-section">
          <div className="qdns-section-top">
            <div>
              <div className="qdns-section-title">Show Item Image on Invoice</div>
              <div className="qdns-section-desc">This will apply to all vouchers except for Payment In and Payment Out</div>
            </div>
            <button
              className={`qdns-toggle ${itemImageEnabled ? "qdns-toggle--on" : ""}`}
              onClick={() => setItemImageEnabled(v => !v)}
            >
              <span className="qdns-toggle-thumb" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="qdns-footer">
          <button className="qdns-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="qdns-save-btn" onClick={onClose}>Save</button>
        </div>

      </div>
    </div>
  );
};

export default QuickDebitNoteSettings;