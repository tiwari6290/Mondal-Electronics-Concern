import { useState } from "react";
import "./PurchaseOrder.css";
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
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
const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const BarcodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5v14"/><path d="M7 5v14"/><path d="M11 5v14"/><path d="M15 5v14"/>
    <path d="M19 5v14"/><path d="M3 5h2"/><path d="M3 19h2"/>
    <path d="M19 5h2"/><path d="M19 19h2"/>
  </svg>
);
const ReceiptXIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#b0b8c5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20l3-3 3 3 3-3 3 3 3-3V2z"/>
    <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
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

// ─── Screen 1: Purchase Orders List ──────────────────────────────────────────
function PurchaseOrdersList({ onCreateClick }) {
  return (
    <div className="po-main">
      <div className="po-page-header">
        <h2 className="po-page-title">Purchase Orders</h2>
        <div className="po-header-actions">
          <button className="po-icon-btn po-settings-dot-btn"><GearIcon /><span className="po-red-dot" /></button>
          <button className="po-icon-btn"><MessageSquareIcon /></button>
        </div>
      </div>

      <div className="po-toolbar">
        <button className="po-search-btn"><SearchIcon /></button>
        <div className="po-date-filter">
          <CalendarIcon />
          <span>Last 365 Days</span>
          <ChevronDownIcon />
        </div>
        <div className="po-status-filter">
          <span>Show Open Orders</span>
          <ChevronDownIcon />
        </div>
        <div className="po-spacer" />
        <button className="po-btn-primary" onClick={onCreateClick}>Create Purchase Order</button>
      </div>

      <div className="po-table-header">
        <div className="po-th">Date <ChevronDownIcon /></div>
        <div className="po-th">Purchase Order Number</div>
        <div className="po-th">Party Name</div>
        <div className="po-th">Valid Till</div>
        <div className="po-th">Amount</div>
        <div className="po-th">Status</div>
      </div>

      <div className="po-empty-state">
        <ReceiptXIcon />
        <p className="po-empty-text">No Transactions Matching the current filter</p>
      </div>
    </div>
  );
}

// ─── Screen 2: Create Purchase Order Form ────────────────────────────────────
function CreatePurchaseOrder({ onBack }) {
  const [smsBannerVisible, setSmsBannerVisible] = useState(true);
  const [autoRound, setAutoRound]               = useState(false);
  const [markPaid, setMarkPaid]                 = useState(false);

  return (
    <div className="po-main po-form-page">

      {/* Header */}
      <div className="po-form-header">
        <button className="po-back-btn" onClick={onBack}><ArrowLeftIcon /></button>
        <h2 className="po-page-title">Create Purchase Order</h2>
        <div className="po-form-header-actions">
          <button className="po-icon-btn-sq"><KeyboardIcon /></button>
          <button className="po-btn-settings"><GearIcon /> Settings</button>
          <button className="po-btn-save-trio" disabled>Save &amp; New</button>
          <button className="po-btn-save-main" disabled>Save</button>
        </div>
      </div>

      {/* SMS Banner */}
      {smsBannerVisible && (
        <div className="po-sms-banner">
          <ShareIcon />
          <div className="po-sms-banner-text">
            <strong>Invoice Auto-SMS to Party is turned on</strong>
            <span>An SMS with the invoice details and link is sent to the party after the invoice has been created</span>
          </div>
          <button className="po-btn-change-settings">Change Settings</button>
          <button className="po-sms-close" onClick={() => setSmsBannerVisible(false)}><XIcon /></button>
        </div>
      )}

      {/* Two-column layout */}
      <div className="po-form-body">

        {/* LEFT COLUMN */}
        <div className="po-left-col">

          <div className="po-section-label">Bill From</div>

          <div className="po-add-party-box">+ Add Party</div>

          {/* Items Table */}
          <div className="po-items-table">
            <div className="po-items-header">
              <span className="po-col po-col-no">NO</span>
              <span className="po-col po-col-items">ITEMS / SERVICES</span>
              <span className="po-col po-col-hsn">HSN/ SAC</span>
              <span className="po-col po-col-qty">QTY</span>
              <span className="po-col po-col-price">PRICE/ITEM (₹)</span>
              <span className="po-col po-col-disc">DISCOUNT</span>
              <span className="po-col po-col-tax">TAX</span>
              <span className="po-col po-col-amt">AMOUNT (₹)</span>
              <button className="po-col-add-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#4154f1" stroke="#fff" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" fill="#4154f1"/>
                  <line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              </button>
            </div>

            <div className="po-add-item-row">
              <span className="po-add-item-text">+ Add Item</span>
              <div className="po-scan-barcode-btn">
                <BarcodeIcon />
                <span>Scan Barcode</span>
              </div>
            </div>
          </div>

          {/* Subtotal */}
          <div className="po-subtotal-row">
            <span className="po-subtotal-label">SUBTOTAL</span>
            <span className="po-subtotal-val">₹ 0</span>
            <span className="po-subtotal-val">₹ 0</span>
            <span className="po-subtotal-val">₹ 0</span>
          </div>

          {/* Bottom links */}
          <div className="po-bottom-left">
            <button className="po-link-btn">+ Add Notes</button>

            <div className="po-terms-box">
              <div className="po-terms-header">
                <span>Terms and Conditions</span>
                <button className="po-terms-close"><XIcon /></button>
              </div>
              <ol className="po-terms-list">
                <li>Goods once sold will not be taken back or exchanged</li>
                <li>All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction only</li>
              </ol>
            </div>

            <button className="po-link-btn">+ Add New Account</button>
            <button className="po-link-btn">+ Add Payment QR</button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="po-right-col">

          {/* Purchase Order No + Date */}
          <div className="po-right-row">
            <div className="po-field-group">
              <label className="po-field-label">Purchase Order No:</label>
              <input className="po-input" defaultValue="1" />
            </div>
            <div className="po-field-group">
              <label className="po-field-label">Purchase Order Date:</label>
              <div className="po-input-icon">
                <CalendarIcon />
                <input className="po-input po-has-icon" defaultValue="07 Apr 2026" />
                <ChevronDownIcon />
              </div>
            </div>
          </div>

          {/* Link to Purchase Invoice */}
          <div className="po-link-purchase-row">
            <span className="po-field-label">Link to Purchase Invoice:</span>
            <span className="po-new-badge">New</span>
          </div>

          <div className="po-search-invoice">
            <SearchIcon />
            <input className="po-search-input" placeholder="Search purchase invoices" />
          </div>

          {/* Summary */}
          <div className="po-summary">
            <div className="po-summary-row">
              <button className="po-link-btn">+ Add Additional Charges</button>
              <span className="po-summary-amt">₹ 0</span>
            </div>

            <div className="po-summary-row">
              <span className="po-summary-label">Taxable Amount</span>
              <span className="po-summary-amt">₹ 0</span>
            </div>

            <div className="po-summary-row">
              <button className="po-link-btn">+ Add Discount</button>
              <span className="po-summary-amt">- ₹ 0</span>
            </div>

            <div className="po-auto-round-row">
              <input type="checkbox" id="poAutoRound" checked={autoRound} onChange={e => setAutoRound(e.target.checked)} />
              <label htmlFor="poAutoRound">Auto Round Off</label>
              <div className="po-add-select">
                <span>+ Add</span> <ChevronDownIcon />
              </div>
              <span className="po-rupee-sym">₹</span>
              <span className="po-round-val">0</span>
            </div>

            <div className="po-total-row">
              <span className="po-total-label">Total Amount</span>
              <input className="po-payment-input" placeholder="Enter Payment amount" />
            </div>

            <div className="po-mark-paid-row">
              <label className="po-mark-paid">
                <input type="checkbox" checked={markPaid} onChange={e => setMarkPaid(e.target.checked)} />
                Mark as fully paid
              </label>
            </div>

            <div className="po-received-row">
              <span className="po-field-label">Amount Received</span>
              <div className="po-received-right">
                <span className="po-rupee">₹</span>
                <input className="po-received-input" defaultValue="0" />
                <div className="po-cash-select">
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
export default function PurchaseOrdersPage() {
  const [view, setView] = useState("list");

  return (
    <div className="po-shell">
      <Sidebar />
      {view === "list"
        ? <PurchaseOrdersList onCreateClick={() => setView("form")} />
        : <CreatePurchaseOrder onBack={() => setView("list")} />
      }
    </div>
  );
}