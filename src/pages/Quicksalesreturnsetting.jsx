import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./Quicksalesreturnsetting.css";

const QuickSalesReturnSettings = ({ onClose }) => {
  const [prefixEnabled, setPrefixEnabled] = useState(true);
  const [prefix, setPrefix]               = useState("Prefix");
  const [sequenceNumber, setSequenceNumber] = useState(1);
  const [showItemImage, setShowItemImage] = useState(true);

  const handleSave = () => {
    // persist settings as needed, then close
    onClose();
  };

  return (
    <div className="qsr-overlay" onClick={onClose}>
      <div className="qsr-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="qsr-header">
          <span className="qsr-title">Quick Sales Return Settings</span>
          <button className="qsr-close-btn" onClick={onClose}>
            <FaTimes size={14} />
          </button>
        </div>

        {/* Section 1 — Prefix & Sequence */}
        <div className="qsr-section">
          <div className="qsr-section-top">
            <div className="qsr-section-info">
              <span className="qsr-section-title">Sales Return Prefix &amp; Sequence Number</span>
              <span className="qsr-section-desc">Add your custom prefix &amp; sequence for Sales Return Numbering</span>
            </div>
            <label className="qsr-toggle">
              <input
                type="checkbox"
                checked={prefixEnabled}
                onChange={e => setPrefixEnabled(e.target.checked)}
              />
              <span className="qsr-toggle-slider" />
            </label>
          </div>

          {prefixEnabled && (
            <div className="qsr-fields">
              <div className="qsr-field-group">
                <label className="qsr-field-label">Prefix</label>
                <input
                  className="qsr-field-input"
                  value={prefix}
                  onChange={e => setPrefix(e.target.value)}
                />
              </div>
              <div className="qsr-field-group">
                <label className="qsr-field-label">Sequence Number</label>
                <input
                  className="qsr-field-input"
                  type="number"
                  value={sequenceNumber}
                  onChange={e => setSequenceNumber(e.target.value)}
                />
              </div>
              <p className="qsr-preview">
                Sales Return Number: {sequenceNumber}
              </p>
            </div>
          )}
        </div>

        {/* Section 2 — Show Item Image */}
        <div className="qsr-section">
          <div className="qsr-section-top">
            <div className="qsr-section-info">
              <span className="qsr-section-title">Show Item Image on Invoice</span>
              <span className="qsr-section-desc">This will apply to all vouchers except for Payment In and Payment Out</span>
            </div>
            <label className="qsr-toggle">
              <input
                type="checkbox"
                checked={showItemImage}
                onChange={e => setShowItemImage(e.target.checked)}
              />
              <span className="qsr-toggle-slider" />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="qsr-footer">
          <button className="qsr-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="qsr-save-btn" onClick={handleSave}>Save</button>
        </div>

      </div>
    </div>
  );
};

export default QuickSalesReturnSettings;