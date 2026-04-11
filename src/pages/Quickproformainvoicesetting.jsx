import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./Quickproformainvoicesetting.css";

const QuickProformaSettings = ({ onClose }) => {
  const [prefixEnabled,      setPrefixEnabled]      = useState(true);
  const [prefix,             setPrefix]             = useState("Prefix");
  const [sequenceNumber,     setSequenceNumber]     = useState(1);
  const [showItemImage,      setShowItemImage]      = useState(true);
  const [priceHistory,       setPriceHistory]       = useState(true);

  const handleSave = () => {
    onClose();
  };

  return (
    <div className="qps-overlay" onClick={onClose}>
      <div className="qps-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="qps-header">
          <span className="qps-title">Quick Proforma Settings</span>
          <button className="qps-close-btn" onClick={onClose}>
            <FaTimes size={14} />
          </button>
        </div>

        {/* Section 1 — Prefix & Sequence */}
        <div className="qps-section">
          <div className="qps-section-top">
            <div className="qps-section-info">
              <span className="qps-section-title">Proforma Prefix &amp; Sequence Number</span>
              <span className="qps-section-desc">Add your custom prefix &amp; sequence for Proforma Numbering</span>
            </div>
            <label className="qps-toggle">
              <input
                type="checkbox"
                checked={prefixEnabled}
                onChange={e => setPrefixEnabled(e.target.checked)}
              />
              <span className="qps-toggle-slider" />
            </label>
          </div>

          {prefixEnabled && (
            <div className="qps-fields">
              <div className="qps-field-group">
                <label className="qps-field-label">Prefix</label>
                <input
                  className="qps-field-input"
                  value={prefix}
                  onChange={e => setPrefix(e.target.value)}
                />
              </div>
              <div className="qps-field-group">
                <label className="qps-field-label">Sequence Number</label>
                <input
                  className="qps-field-input"
                  type="number"
                  value={sequenceNumber}
                  onChange={e => setSequenceNumber(e.target.value)}
                />
              </div>
              <p className="qps-preview">Proforma Number: {sequenceNumber}</p>
            </div>
          )}
        </div>

        {/* Section 2 — Show Item Image */}
        <div className="qps-section">
          <div className="qps-section-top">
            <div className="qps-section-info">
              <span className="qps-section-title">Show Item Image on Invoice</span>
              <span className="qps-section-desc">This will apply to all vouchers except for Payment In and Payment Out</span>
            </div>
            <label className="qps-toggle">
              <input
                type="checkbox"
                checked={showItemImage}
                onChange={e => setShowItemImage(e.target.checked)}
              />
              <span className="qps-toggle-slider" />
            </label>
          </div>
        </div>

        {/* Section 3 — Price History */}
        <div className="qps-section">
          <div className="qps-section-top">
            <div className="qps-section-info">
              <div className="qps-title-row">
                <span className="qps-section-title">Price History</span>
                <span className="qps-new-badge">New</span>
              </div>
              <span className="qps-section-desc">Show last 5 sales / purchase prices of the item for the selected party in invoice</span>
            </div>
            <label className="qps-toggle">
              <input
                type="checkbox"
                checked={priceHistory}
                onChange={e => setPriceHistory(e.target.checked)}
              />
              <span className="qps-toggle-slider" />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="qps-footer">
          <button className="qps-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="qps-save-btn" onClick={handleSave}>Save</button>
        </div>

      </div>
    </div>
  );
};

export default QuickProformaSettings;