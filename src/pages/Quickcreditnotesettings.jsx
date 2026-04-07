import { useState } from "react";
import "./QuickCreditNoteSettings.css";
import { FiX } from "react-icons/fi";

/* ── Toggle ── */
const Toggle = ({ checked, onChange }) => (
  <label className="qcns-toggle">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="qcns-slider" />
  </label>
);

const QuickCreditNoteSettings = ({ onClose }) => {
  const [prefixOn,    setPrefixOn]    = useState(true);
  const [showImgOn,   setShowImgOn]   = useState(true);
  const [prefix,      setPrefix]      = useState("");
  const [seqNumber,   setSeqNumber]   = useState("6");

  return (
    <div className="qcns-overlay">
      <div className="qcns-modal">

        {/* Header */}
        <div className="qcns-header">
          <h2 className="qcns-title">Quick Credit Note Settings</h2>
          <button className="qcns-close" onClick={onClose}><FiX size={18} /></button>
        </div>

        {/* Body */}
        <div className="qcns-body">

          {/* Card 1 — Credit Note Prefix & Sequence Number */}
          <div className="qcns-card">
            <div className="qcns-card-top">
              <div className="qcns-card-info">
                <p className="qcns-card-title">Credit Note Prefix &amp; Sequence Number</p>
                <p className="qcns-card-desc">Add your custom prefix &amp; sequence for Credit Note Numbering</p>
              </div>
              <Toggle checked={prefixOn} onChange={(e) => setPrefixOn(e.target.checked)} />
            </div>

            {/* Expanded fields when on */}
            {prefixOn && (
              <div className="qcns-prefix-fields">
                <div className="qcns-fg">
                  <label className="qcns-lbl">Prefix</label>
                  <input
                    className="qcns-input"
                    placeholder="Prefix"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                  />
                </div>
                <div className="qcns-fg">
                  <label className="qcns-lbl">Sequence Number</label>
                  <input
                    className="qcns-input"
                    value={seqNumber}
                    onChange={(e) => setSeqNumber(e.target.value)}
                  />
                </div>
                <p className="qcns-cn-number">
                  Credit Note Number: {seqNumber || "6"}
                </p>
              </div>
            )}
          </div>

          {/* Card 2 — Show Item Image on Invoice */}
          <div className="qcns-card">
            <div className="qcns-card-top">
              <div className="qcns-card-info">
                <p className="qcns-card-title">Show Item Image on Invoice</p>
                <p className="qcns-card-desc">
                  This will apply to all vouchers except for Payment In and Payment Out
                </p>
              </div>
              <Toggle checked={showImgOn} onChange={(e) => setShowImgOn(e.target.checked)} />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="qcns-footer">
          <button className="qcns-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="qcns-save-btn" onClick={onClose}>Save</button>
        </div>

      </div>
    </div>
  );
};

export default QuickCreditNoteSettings;
