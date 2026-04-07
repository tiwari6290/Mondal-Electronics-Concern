import { useState } from "react";
import "./PurchaseReturn.css";
import Sidebar from "../components/Sidebar/Sidebar";

// ─── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const GearIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const MessageSquareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const BarcodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="4" height="16"/>
    <rect x="7" y="4" width="2" height="16"/>
    <rect x="11" y="4" width="4" height="16"/>
    <rect x="17" y="4" width="2" height="16"/>
    <rect x="21" y="4" width="2" height="16"/>
  </svg>
);
const ReceiptXIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#b0b8c5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20l3-3 3 3 3-3 3 3 3-3V2z"/>
    <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
  </svg>
);

// ─── Screen 1: Purchase Return List ──────────────────────────────────────────
function PurchaseReturnList({ onCreateClick }) {
  return (
    <div className="pr-main">
      <div className="pr-page-header">
        <h2 className="pr-page-title">Purchase Return</h2>
        <div className="pr-header-actions">
          <button className="pr-icon-btn"><GearIcon /></button>
          <button className="pr-icon-btn"><MessageSquareIcon /></button>
        </div>
      </div>

      <div className="pr-toolbar">
        <button className="pr-search-btn"><SearchIcon /></button>
        <div className="pr-date-filter">
          <CalendarIcon />
          <span>Last 365 Days</span>
          <ChevronDownIcon />
        </div>
        <div className="pr-spacer" />
        <button className="pr-btn-primary" onClick={onCreateClick}>
          Create Purchase Return
        </button>
      </div>

      <div className="pr-table-header">
        <div className="pr-th">Date <ChevronDownIcon /></div>
        <div className="pr-th">Purchase Return Number</div>
        <div className="pr-th">Party Name</div>
        <div className="pr-th">Purchase No</div>
        <div className="pr-th">Amount</div>
        <div className="pr-th">Status</div>
      </div>

      <div className="pr-empty-state">
        <ReceiptXIcon />
        <p className="pr-empty-text">No Transactions Matching the current filter</p>
      </div>
    </div>
  );
}

// ─── Screen 2: Create Purchase Return Form ────────────────────────────────────
function CreatePurchaseReturn({ onBack }) {
  const [smsBannerVisible, setSmsBannerVisible] = useState(true);
  const [partyAdded, setPartyAdded] = useState(false);

  return (
    <div className="pr-main pr-form-page">

      {/* Header */}
      <div className="pr-form-header">
        <button className="pr-back-btn" onClick={onBack}><ArrowLeftIcon /></button>
        <h2 className="pr-page-title">Create Purchase Return</h2>
        <div className="pr-form-header-actions">
          <button className="pr-icon-btn-sq"><MessageSquareIcon /></button>
          <button className="pr-btn-settings"><GearIcon /> Settings</button>
          <button className="pr-btn-save-trio" disabled>Save &amp; New</button>
          <button className="pr-btn-save-main" disabled>Save</button>
        </div>
      </div>

      {/* SMS Banner */}
      {smsBannerVisible && (
        <div className="pr-sms-banner">
          <ShareIcon />
          <div className="pr-sms-banner-text">
            <strong>Invoice Auto-SMS to Party is turned on</strong>
            <span>An SMS with the invoice details and link is sent to the party after the invoice has been created</span>
          </div>
          <button className="pr-btn-change-settings">Change Settings</button>
          <button className="pr-sms-close" onClick={() => setSmsBannerVisible(false)}><XIcon /></button>
        </div>
      )}

      {/* Two-column layout */}
      <div className="pr-form-body">

        {/* LEFT COLUMN */}
        <div className="pr-left-col">

          {/* Bill From */}
          <div className="pr-section-label">Bill From</div>
          {!partyAdded ? (
            <div className="pr-add-party-box" onClick={() => setPartyAdded(true)}>
              + Add Party
            </div>
          ) : (
            <div className="pr-party-filled">
              <span>Party Name</span>
            </div>
          )}

          {/* Items Table */}
          <div className="pr-items-table">
            <div className="pr-items-header">
              <span className="pr-col-no">NO</span>
              <span className="pr-col-items">ITEMS / SERVICES</span>
              <span className="pr-col-hsn">HSN/ SAC</span>
              <span className="pr-col-qty">QTY</span>
              <span className="pr-col-price">PRICE/ITEM (₹)</span>
              <span className="pr-col-disc">DISCOUNT</span>
              <span className="pr-col-tax">TAX</span>
              <span className="pr-col-amt">AMOUNT (₹)</span>
              <button className="pr-col-add-btn"><PlusIcon /></button>
            </div>
            <div className="pr-add-item-row">
              + Add Item
            </div>
          </div>

          {/* Subtotal row */}
          <div className="pr-subtotal-row">
            <span className="pr-subtotal-label">SUBTOTAL</span>
            <span className="pr-subtotal-val">₹ 0</span>
            <span className="pr-subtotal-val">₹ 0</span>
            <span className="pr-subtotal-val">₹ 0</span>
          </div>

          {/* Notes & Terms */}
          <div className="pr-bottom-left">
            <button className="pr-link-btn">+ Add Notes</button>

            <div className="pr-terms-box">
              <div className="pr-terms-header">
                <span>Terms and Conditions</span>
                <button className="pr-terms-close"><XIcon /></button>
              </div>
              <ol className="pr-terms-list">
                <li>Goods once sold will not be taken back or exchanged</li>
                <li>All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction only</li>
              </ol>
            </div>

            <button className="pr-link-btn">+ Add New Account</button>
            <button className="pr-link-btn">+ Add Payment QR</button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="pr-right-col">
          <div className="pr-right-top">
            <div className="pr-field-group">
              <label className="pr-field-label">Purchase Return No.</label>
              <input className="pr-input" defaultValue="1" />
            </div>
            <div className="pr-field-group">
              <label className="pr-field-label">Purchase Return Date</label>
              <div className="pr-input-icon">
                <CalendarIcon />
                <input className="pr-input pr-has-icon" defaultValue="06 Apr 2026" />
                <ChevronDownIcon />
              </div>
            </div>
          </div>

          <div className="pr-link-purchase-row">
            <span className="pr-field-label">Link to Purchase Invoice:</span>
            <span className="pr-new-badge">New</span>
          </div>

         <div className="pr-search-invoice">
  <SearchIcon />
  <input
    className="pr-search-input"
    placeholder="Search purchase invoices"
  />
</div>

<button className="pr-scan-btn-right">
  <BarcodeIcon />
  Scan Barcode
</button>

          {/* Summary */}
          <div className="pr-summary">
            <button className="pr-link-btn">+ Add Additional Charges</button>
            <div className="pr-summary-row">
              <span>Taxable Amount</span>
              <span>₹ 0</span>
            </div>
            <button className="pr-link-btn">+ Add Discount</button>
            <div className="pr-summary-row pr-discount-row">
              <span></span>
              <span>- ₹ 0</span>
            </div>

            <div className="pr-auto-round-row">
              <input type="checkbox" id="autoRound" />
              <label htmlFor="autoRound">Auto Round Off</label>
              <div className="pr-add-select">
                <span>+ Add</span> <ChevronDownIcon />
              </div>
              <span className="pr-round-val">₹ 0</span>
            </div>

            <div className="pr-total-row">
              <span className="pr-total-label">Total Amount</span>
              <input className="pr-payment-input" placeholder="Enter Payment amount" />
            </div>

            <div className="pr-mark-paid-row">
              <span></span>
              <label className="pr-mark-paid">
                <input type="checkbox" />
                Mark as fully paid
              </label>
            </div>

            <div className="pr-received-row">
              <span className="pr-field-label">Amount Received</span>
              <div className="pr-received-right">
                <span className="pr-rupee">₹</span>
                <input className="pr-received-input" defaultValue="0" />
                <div className="pr-cash-select">
                  Cash <ChevronDownIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page Root ────────────────────────────────────────────────────────────────
export default function PurchaseReturnPage() {
  const [view, setView] = useState("list");

  return (
    <div className="pr-shell">
      <Sidebar />
      {view === "list"
        ? <PurchaseReturnList onCreateClick={() => setView("form")} />
        : <CreatePurchaseReturn onBack={() => setView("list")} />
      }
    </div>
  );
}