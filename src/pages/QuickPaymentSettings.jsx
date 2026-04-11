import { useState } from "react";
import "./QuickPaymentSettings.css";

const Icon = ({ name, size = 16 }) => {
  const icons = {
    x: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    ),
  };
  return <span className="icon">{icons[name] || null}</span>;
};

export default function QuickPaymentSettings({ onClose }) {
  const [prefixEnabled, setPrefixEnabled] = useState(true);
  const [prefix, setPrefix] = useState("");
  const [sequenceNumber, setSequenceNumber] = useState(1);

  const preview = prefix ? `${prefix}${sequenceNumber}` : `${sequenceNumber}`;

  const handleSave = () => {
    // handle save logic here
    onClose();
  };

  return (
    <div className="qps-overlay">
      <div className="qps-modal">

        <div className="qps-header">
          <span className="qps-title">Quick Payment In Settings</span>
          <button className="qps-close" onClick={onClose}>
            <Icon name="x" size={16} />
          </button>
        </div>

        <div className="qps-body">
          <div className="qps-section-box">
            <div className="qps-section-top">
              <div>
                <div className="qps-section-label">Payment In Prefix &amp; Sequence Number</div>
                <div className="qps-section-sub">
                  Add your custom prefix &amp; sequence for Payment In Numbering
                </div>
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
              <>
                <div className="qps-fields-row">
                  <div className="qps-field-group">
                    <label className="qps-field-label">Prefix</label>
                    <input
                      className="qps-input"
                      placeholder="Prefix"
                      value={prefix}
                      onChange={e => setPrefix(e.target.value)}
                    />
                  </div>
                  <div className="qps-field-group">
                    <label className="qps-field-label">Sequence Number</label>
                    <input
                      className="qps-input"
                      type="number"
                      min={1}
                      value={sequenceNumber}
                      onChange={e => setSequenceNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="qps-preview">
                  Payment In Number: <strong>{preview}</strong>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="qps-footer">
          <button className="qps-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="qps-btn-save" onClick={handleSave}>Save</button>
        </div>

      </div>
    </div>
  );
}