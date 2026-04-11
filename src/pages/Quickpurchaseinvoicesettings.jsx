import React, { useState } from "react";
import { X } from "lucide-react";
import "./QuickPurchaseInvoiceSettings.css";

const QuickPurchaseInvoiceSettings = ({ onClose }) => {
  const [prefixEnabled, setPrefixEnabled]       = useState(true);
  const [itemImageEnabled, setItemImageEnabled] = useState(true);
  const [priceHistoryEnabled, setPriceHistoryEnabled] = useState(true);

  const [prefix, setPrefix]                 = useState("Prefix");
  const [sequenceNumber, setSequenceNumber] = useState("1");

  return (
    <div className="qpis-overlay" onClick={onClose}>
      <div className="qpis-modal" onClick={e => e.stopPropagation()}>

        {/* Title Bar */}
        <div className="qpis-header">
          <h2 className="qpis-title">Quick Purchase Invoice Settings</h2>
          <button className="qpis-close-btn" onClick={onClose}><X size={16} /></button>
        </div>

        {/* Section 1 – Prefix & Sequence */}
        <div className="qpis-section">
          <div className="qpis-section-top">
            <div>
              <div className="qpis-section-title">Purchase Invoice Prefix &amp; Sequence Number</div>
              <div className="qpis-section-desc">Add your custom prefix &amp; sequence for Purchase Invoice Numbering</div>
            </div>
            <button
              className={`qpis-toggle ${prefixEnabled ? "qpis-toggle--on" : ""}`}
              onClick={() => setPrefixEnabled(v => !v)}
            >
              <span className="qpis-toggle-thumb" />
            </button>
          </div>
          {prefixEnabled && (
            <div className="qpis-prefix-row">
              <div className="qpis-field">
                <label className="qpis-label">Prefix</label>
                <input
                  className="qpis-input"
                  value={prefix}
                  onChange={e => setPrefix(e.target.value)}
                />
              </div>
              <div className="qpis-field">
                <label className="qpis-label">Sequence Number</label>
                <input
                  className="qpis-input"
                  value={sequenceNumber}
                  onChange={e => setSequenceNumber(e.target.value)}
                />
              </div>
              <div className="qpis-preview">
                Purchase Invoice Number: {sequenceNumber}
              </div>
            </div>
          )}
        </div>

        {/* Section 2 – Item Image */}
        <div className="qpis-section">
          <div className="qpis-section-top">
            <div>
              <div className="qpis-section-title">Show Item Image on Invoice</div>
              <div className="qpis-section-desc">This will apply to all vouchers except for Payment In and Payment Out</div>
            </div>
            <button
              className={`qpis-toggle ${itemImageEnabled ? "qpis-toggle--on" : ""}`}
              onClick={() => setItemImageEnabled(v => !v)}
            >
              <span className="qpis-toggle-thumb" />
            </button>
          </div>
        </div>

        {/* Section 3 – Price History */}
        <div className="qpis-section">
          <div className="qpis-section-top">
            <div>
              <div className="qpis-section-title">
                Price History
                <span className="qpis-new-badge">New</span>
              </div>
              <div className="qpis-section-desc">Show last 5 sales / purchase prices of the item for the selected party in invoice</div>
            </div>
            <button
              className={`qpis-toggle ${priceHistoryEnabled ? "qpis-toggle--on" : ""}`}
              onClick={() => setPriceHistoryEnabled(v => !v)}
            >
              <span className="qpis-toggle-thumb" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="qpis-footer">
          <button className="qpis-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="qpis-save-btn" onClick={onClose}>Save</button>
        </div>

      </div>
    </div>
  );
};

export default QuickPurchaseInvoiceSettings;