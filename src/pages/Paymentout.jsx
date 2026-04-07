import { useState } from "react";
import "./Paymentout.css";
import Sidebar from "../components/Sidebar/Sidebar";

// Lucide-style SVG icons (inline)
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
const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const ShoppingCartXIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    <line x1="17" y1="9" x2="22" y2="14"/><line x1="22" y1="9" x2="17" y2="14"/>
  </svg>
);
const ReceiptXIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b0b8c5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20l3-3 3 3 3-3 3 3 3-3V2z"/>
    <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
  </svg>
);
const CashIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8ca0b5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const HelpCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);
const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const GearIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const MessageSquareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const DashboardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
);
const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const PackageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
);
const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
);
const ShoppingBagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);
const BarChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
);
const BookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
);

// ─── Screen 1: Payment Out List ───────────────────────────────────────────────
function PaymentOutList({ onCreateClick }) {
  return (
    <div className="main-content">
      <div className="page-header">
        <h2 className="page-title">Payment Out</h2>
        <div className="page-header-actions">
          <button className="icon-btn"><GearIcon /></button>
          <button className="icon-btn"><MessageSquareIcon /></button>
        </div>
      </div>

      <div className="toolbar">
        <button className="toolbar-search-btn"><SearchIcon /></button>
        <div className="date-filter">
          <CalendarIcon />
          <span>Last 365 Days</span>
          <ChevronDownIcon />
        </div>
        <div className="toolbar-spacer" />
        <button className="btn-primary" onClick={onCreateClick}>Create Payment Out</button>
      </div>

      <div className="table-header">
        <div className="th">Date <ChevronDownIcon /></div>
        <div className="th">Payment Number</div>
        <div className="th">Party Name</div>
        <div className="th">Total Amount Settled</div>
        <div className="th">Amount Paid</div>
        <div className="th">Payment Mode</div>
      </div>

      <div className="empty-state">
        <ShoppingCartXIcon />
        <p className="empty-text">No Transactions Matching the current filter</p>
      </div>
    </div>
  );
}

// ─── Screen 2: Record Payment Out Form ────────────────────────────────────────
function RecordPaymentOut({ onBack, onSelectParty }) {
  const [partySearch, setPartySearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateParty, setShowCreateParty] = useState(false);

  const handlePartyFocus = () => setShowDropdown(true);
  const handlePartyBlur = () => setTimeout(() => setShowDropdown(false), 150);

  return (
    <div className="main-content">
      {showCreateParty && (
        <CreatePartyModal onClose={() => setShowCreateParty(false)} />
      )}

      <div className="form-page-header">
        <button className="back-btn" onClick={onBack}><ArrowLeftIcon /></button>
        <h2 className="page-title">Record Payment Out #1</h2>
        <div className="form-header-actions">
          <button className="icon-btn-square"><MessageSquareIcon /></button>
          <button className="btn-settings-outline"><SettingsIcon /> Settings</button>
          <button className="btn-cancel">Cancel</button>
          <button className="btn-save" disabled>Save</button>
        </div>
      </div>

      <div className="form-body">
        <div className="form-card left-card">
          <div className="form-group">
            <label className="form-label">Party Name</label>
            <div className="input-with-icon" style={{ position: "relative" }}>
              <input
                className="form-input"
                placeholder="Search party by name or number"
                value={partySearch}
                onChange={e => setPartySearch(e.target.value)}
                onFocus={handlePartyFocus}
                onBlur={handlePartyBlur}
              />
              <span className="input-arrow"><ChevronDownIcon /></span>
              {showDropdown && (
                <div className="party-dropdown">
                  <div className="party-dropdown-item">Cash Sale</div>
                  <button className="create-party-option" onMouseDown={() => { setShowDropdown(false); setShowCreateParty(true); }}>
                    + Create Party
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Amount Paid</label>
              <input className="form-input" defaultValue="0" />
            </div>
            <div className="form-group">
              <label className="form-label">
                Payment Out Discount <InfoIcon />
              </label>
              <input className="form-input" defaultValue="0" />
            </div>
          </div>
        </div>

        <div className="form-card right-card">
          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Payment Date</label>
              <div className="input-with-icon">
                <CalendarIcon />
                <input className="form-input has-left-icon" defaultValue="6 Apr 2026" />
                <ChevronDownIcon />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Payment Mode</label>
              <div className="input-with-icon">
                <input className="form-input" defaultValue="Cash" />
                <ChevronDownIcon />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Payment Out Number</label>
              <input className="form-input" defaultValue="1" />
            </div>
          </div>
          <div className="form-group" style={{ marginTop: "12px" }}>
            <label className="form-label">Notes</label>
            <div className="notes-area">
              <textarea className="form-textarea" placeholder="Enter Notes" />
              <span className="textarea-edit-icon"><PencilIcon /></span>
            </div>
          </div>
        </div>
      </div>

      <div className="no-party-state">
        <div className="no-party-illustration">
          <ReceiptXIcon />
          <CashIcon />
        </div>
        <p className="no-party-title">No party selected!</p>
        <p className="no-party-sub">Select Party Name to view transactions</p>
        <button className="btn-select-party" onClick={onSelectParty}>Select Party</button>
      </div>

      <button className="floating-help"><HelpCircleIcon /></button>
    </div>
  );
}

// ─── Create Party Modal ───────────────────────────────────────────────────────
function CreatePartyModal({ onClose }) {
  const [showAddress, setShowAddress] = useState(false);
  const [showGSTIN, setShowGSTIN] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Create New Party</h3>
          <button className="modal-close" onClick={onClose}><XIcon /></button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label required">Party Name <span className="required-star">*</span></label>
            <input className="form-input" placeholder="Enter name" autoFocus />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input className="form-input" placeholder="Enter Mobile Number" />
          </div>

          {!showAddress && (
            <button className="link-btn" onClick={() => setShowAddress(true)}>+ Add Address (Optional)</button>
          )}

          {showAddress && (
            <div className="optional-section">
              <div className="optional-section-header">
                <span className="optional-label">Address (Optional)</span>
                <button className="remove-btn" onClick={() => setShowAddress(false)}>Remove</button>
              </div>
              <div className="form-group">
                <label className="form-label required">BILLING ADDRESS <span className="required-star">*</span></label>
                <textarea className="form-textarea short" placeholder="Enter billing address" />
              </div>
              <div className="form-row-address">
                <div className="form-group">
                  <label className="form-label">STATE</label>
                  <div className="input-with-icon">
                    <SearchIcon />
                    <input className="form-input has-left-icon" placeholder="Enter State" />
                    <ChevronDownIcon />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">PINCODE</label>
                  <input className="form-input" placeholder="Enter Pincode" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">CITY</label>
                <input className="form-input" placeholder="Enter City" />
              </div>
              <div className="checkbox-row">
                <input type="checkbox" id="sameShipping" defaultChecked />
                <label htmlFor="sameShipping">Shipping address same as billing address</label>
              </div>
            </div>
          )}

          {!showGSTIN && (
            <button className="link-btn" onClick={() => setShowGSTIN(true)}>+ Add GSTIN (Optional)</button>
          )}

          {showGSTIN && (
            <div className="optional-section">
              <div className="optional-section-header">
                <span className="optional-label">GSTIN (Optional)</span>
                <button className="remove-btn" onClick={() => setShowGSTIN(false)}>Remove</button>
              </div>
              <div className="form-group">
                <label className="form-label">GSTIN</label>
                <input className="form-input" placeholder="ex: 29XXXXX9438X1XX" />
              </div>
            </div>
          )}

          <div className="custom-fields-note">
            You can add Custom Fields from <a className="link-text">Party Settings</a>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" disabled>Save</button>
        </div>
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function PaymentOutPage() {
  const [view, setView] = useState("list"); // "list" | "form"

  return (
    <div className="app-shell">
      <Sidebar />
      {view === "list" ? (
        <PaymentOutList onCreateClick={() => setView("form")} />
      ) : (
        <RecordPaymentOut onBack={() => setView("list")} onSelectParty={() => {}} />
      )}
    </div>
  );
}