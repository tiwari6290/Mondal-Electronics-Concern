import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import "./CreatePaymentOut.css";

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
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
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
const MessageSquareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

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

// ─── Record Payment Out Page ──────────────────────────────────────────────────
export default function RecordPaymentOut() {
  const navigate = useNavigate();
  const [partySearch, setPartySearch]     = useState("");
  const [showDropdown, setShowDropdown]   = useState(false);
  const [showCreateParty, setShowCreateParty] = useState(false);

  const handlePartyFocus = () => setShowDropdown(true);
  const handlePartyBlur  = () => setTimeout(() => setShowDropdown(false), 150);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        {showCreateParty && (
          <CreatePartyModal onClose={() => setShowCreateParty(false)} />
        )}

        <div className="form-page-header">
          <button className="back-btn" onClick={() => navigate("/payment-out")}>
            <ArrowLeftIcon />
          </button>
          <h2 className="page-title">Record Payment Out #1</h2>
          <div className="form-header-actions">
            <button className="icon-btn-square"><MessageSquareIcon /></button>
            <button className="btn-settings-outline"><SettingsIcon /> Settings</button>
            <button className="btn-cancel" onClick={() => navigate("/payment-out")}>Cancel</button>
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
                    <button
                      className="create-party-option"
                      onMouseDown={() => { setShowDropdown(false); setShowCreateParty(true); }}
                    >
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
          <button className="btn-select-party">Select Party</button>
        </div>

        <button className="floating-help"><HelpCircleIcon /></button>
      </div>
    </div>
  );
}