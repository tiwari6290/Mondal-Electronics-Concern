import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateDebitNote.css";
import Sidebar from "../components/Sidebar/Sidebar";
import QuickDebitNoteSettings from "./QuickDebitnotesetting";

// ─── Icons ────────────────────────────────────────────────────────────────────
const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const GearIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const BarcodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5v14"/><path d="M7 5v14"/><path d="M11 5v14"/><path d="M15 5v14"/>
    <path d="M19 5v14"/><path d="M3 5h2"/><path d="M3 19h2"/>
    <path d="M19 5h2"/><path d="M19 19h2"/>
  </svg>
);
const KeyboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2"/>
    <line x1="6" y1="10" x2="6" y2="10"/><line x1="10" y1="10" x2="10" y2="10"/>
    <line x1="14" y1="10" x2="14" y2="10"/><line x1="18" y1="10" x2="18" y2="10"/>
    <line x1="6" y1="14" x2="18" y2="14"/>
  </svg>
);

export default function CreateDebitNote() {
  const navigate = useNavigate();

  const [smsBannerVisible, setSmsBannerVisible] = useState(true);
  const [autoRound, setAutoRound]               = useState(false);
  const [markPaid, setMarkPaid]                 = useState(false);
  const [showSettings, setShowSettings]         = useState(false);

  return (
    <div className="dn-shell">
      <Sidebar />
      <div className="dn-main dn-form-page">

        {/* Header */}
        <div className="dn-form-header">
          <button className="dn-back-btn" onClick={() => navigate("/debit-note")}>
            <ArrowLeftIcon />
          </button>
          <h2 className="dn-page-title">Create Debit Note</h2>
          <div className="dn-form-header-actions">
            <button className="dn-icon-btn-sq"><KeyboardIcon /></button>
            <button className="dn-btn-settings" onClick={() => setShowSettings(true)}>
              <GearIcon /> Settings
            </button>
            <button className="dn-btn-save-trio" disabled>Save &amp; New</button>
            <button className="dn-btn-save-main" disabled>Save</button>
          </div>
        </div>

        {/* SMS Banner */}
        {smsBannerVisible && (
          <div className="dn-sms-banner">
            <ShareIcon />
            <div className="dn-sms-banner-text">
              <strong>Invoice Auto-SMS to Party is turned on</strong>
              <span>An SMS with the invoice details and link is sent to the party after the invoice has been created</span>
            </div>
            <button className="dn-btn-change-settings">Change Settings</button>
            <button className="dn-sms-close" onClick={() => setSmsBannerVisible(false)}><XIcon /></button>
          </div>
        )}

        {/* Two-column layout */}
        <div className="dn-form-body">

          {/* LEFT COLUMN */}
          <div className="dn-left-col">
            <div className="dn-section-label">Bill From</div>
            <div className="dn-add-party-box">+ Add Party</div>

            {/* Items Table */}
            <div className="dn-items-table">
              <div className="dn-items-header">
                <span className="dn-col dn-col-no">NO</span>
                <span className="dn-col dn-col-items">ITEMS / SERVICES</span>
                <span className="dn-col dn-col-hsn">HSN/ SAC</span>
                <span className="dn-col dn-col-qty">QTY</span>
                <span className="dn-col dn-col-price">PRICE/ITEM (₹)</span>
                <span className="dn-col dn-col-disc">DISCOUNT</span>
                <span className="dn-col dn-col-tax">TAX</span>
                <span className="dn-col dn-col-amt">AMOUNT (₹)</span>
                <button className="dn-col-add-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#4154f1" stroke="#fff" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" fill="#4154f1"/>
                    <line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                  </svg>
                </button>
              </div>
              <div className="dn-add-item-row">
                <span className="dn-add-item-text">+ Add Item</span>
                <div className="dn-scan-barcode-btn">
                  <BarcodeIcon />
                  <span>Scan Barcode</span>
                </div>
              </div>
            </div>

            {/* Subtotal */}
            <div className="dn-subtotal-row">
              <span className="dn-subtotal-label">SUBTOTAL</span>
              <span className="dn-subtotal-val">₹ 0</span>
              <span className="dn-subtotal-val">₹ 0</span>
              <span className="dn-subtotal-val">₹ 0</span>
            </div>

            {/* Bottom links */}
            <div className="dn-bottom-left">
              <button className="dn-link-btn">+ Add Notes</button>
              <div className="dn-terms-box">
                <div className="dn-terms-header">
                  <span>Terms and Conditions</span>
                  <button className="dn-terms-close"><XIcon /></button>
                </div>
                <ol className="dn-terms-list">
                  <li>Goods once sold will not be taken back or exchanged</li>
                  <li>All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction only</li>
                </ol>
              </div>
              <button className="dn-link-btn">+ Add New Account</button>
              <button className="dn-link-btn">+ Add Payment QR</button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="dn-right-col">
            <div className="dn-right-row">
              <div className="dn-field-group">
                <label className="dn-field-label">Debit Note No:</label>
                <input className="dn-input" defaultValue="1" />
              </div>
              <div className="dn-field-group">
                <label className="dn-field-label">Debit Note Date:</label>
                <div className="dn-input-icon">
                  <CalendarIcon />
                  <input className="dn-input dn-has-icon" defaultValue="07 Apr 2026" />
                  <ChevronDownIcon />
                </div>
              </div>
            </div>

            <div className="dn-link-purchase-row">
              <span className="dn-field-label">Link to Purchase Invoice:</span>
              <span className="dn-new-badge">New</span>
            </div>

            <div className="dn-search-invoice">
              <SearchIcon />
              <input className="dn-search-input" placeholder="Search purchase invoices" />
            </div>

            <div className="dn-summary">
              <div className="dn-summary-row">
                <button className="dn-link-btn">+ Add Additional Charges</button>
                <span className="dn-summary-amt">₹ 0</span>
              </div>
              <div className="dn-summary-row">
                <span className="dn-summary-label">Taxable Amount</span>
                <span className="dn-summary-amt">₹ 0</span>
              </div>
              <div className="dn-summary-row">
                <button className="dn-link-btn">+ Add Discount</button>
                <span className="dn-summary-amt">- ₹ 0</span>
              </div>

              <div className="dn-auto-round-row">
                <input type="checkbox" id="dnAutoRound" checked={autoRound} onChange={e => setAutoRound(e.target.checked)} />
                <label htmlFor="dnAutoRound">Auto Round Off</label>
                <div className="dn-add-select">
                  <span>+ Add</span> <ChevronDownIcon />
                </div>
                <span className="dn-rupee-sym">₹</span>
                <span className="dn-round-val">0</span>
              </div>

              <div className="dn-total-row">
                <span className="dn-total-label">Total Amount</span>
                <input className="dn-payment-input" placeholder="Enter Payment amount" />
              </div>

              <div className="dn-mark-paid-row">
                <label className="dn-mark-paid">
                  <input type="checkbox" checked={markPaid} onChange={e => setMarkPaid(e.target.checked)} />
                  Mark as fully paid
                </label>
              </div>

              <div className="dn-received-row">
                <span className="dn-field-label">Amount Received</span>
                <div className="dn-received-right">
                  <span className="dn-rupee">₹</span>
                  <input className="dn-received-input" defaultValue="0" />
                  <div className="dn-cash-select">
                    Cash <ChevronDownIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSettings && (
        <QuickDebitNoteSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}