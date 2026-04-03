import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./QuickQuotationSettings.css";

const Toggle = ({ enabled, onChange }) => (
  <div
    className={`qqs-toggle ${enabled ? "qqs-toggle-on" : ""}`}
    onClick={() => onChange(!enabled)}
  >
    <div className="qqs-toggle-knob" />
  </div>
);

const QuickQuotationSettings = ({ onClose }) => {
  const [prefixEnabled,    setPrefixEnabled]    = useState(false);
  const [itemImageEnabled, setItemImageEnabled] = useState(true);
  const [priceHistEnabled, setPriceHistEnabled] = useState(true);

  return (
    <div className="qqs-overlay">
      <div className="qqs-modal">

        <div className="qqs-header">
          <h3>Quick Quotation Settings</h3>
          <button className="qqs-close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        <div className="qqs-body">

          <div className="qqs-row">
            <div className="qqs-row-text">
              <div className="qqs-row-title">Quotation Prefix &amp; Sequence Number</div>
              <div className="qqs-row-desc">Add your custom prefix &amp; sequence for Quotation Numbering</div>
            </div>
            <Toggle enabled={prefixEnabled} onChange={setPrefixEnabled} />
          </div>

          <div className="qqs-row">
            <div className="qqs-row-text">
              <div className="qqs-row-title">Show Item Image on Invoice</div>
              <div className="qqs-row-desc">This will apply to all vouchers except for Payment In and Payment Out</div>
            </div>
            <Toggle enabled={itemImageEnabled} onChange={setItemImageEnabled} />
          </div>

          <div className="qqs-row">
            <div className="qqs-row-text">
              <div className="qqs-row-title">
                Price History
                <span className="qqs-new-badge">New</span>
              </div>
              <div className="qqs-row-desc">Show last 5 sales / purchase prices of the item for the selected party in invoice</div>
            </div>
            <Toggle enabled={priceHistEnabled} onChange={setPriceHistEnabled} />
          </div>

        </div>

        <div className="qqs-footer">
          <button className="qqs-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="qqs-save-btn">Save</button>
        </div>

      </div>
    </div>
  );
};

export default QuickQuotationSettings;