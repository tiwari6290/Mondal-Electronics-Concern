import { useNavigate } from "react-router-dom";
import "./DebitNote.css";
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
const ReceiptXIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#b0b8c5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20l3-3 3 3 3-3 3 3 3-3V2z"/>
    <line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
  </svg>
);

export default function DebitNoteList() {
  const navigate = useNavigate();

  return (
    <div className="dn-shell">
      <Sidebar />
      <div className="dn-main">
      <div className="dn-page-header">
        <h2 className="dn-page-title">Debit Note</h2>
        <div className="dn-header-actions">
          <button className="dn-icon-btn"><GearIcon /></button>
          <button className="dn-icon-btn"><MessageSquareIcon /></button>
        </div>
      </div>

      <div className="dn-toolbar">
        <button className="dn-search-btn"><SearchIcon /></button>
        <div className="dn-date-filter">
          <CalendarIcon />
          <span>Last 365 Days</span>
          <ChevronDownIcon />
        </div>
        <div className="dn-spacer" />
        <button
          className="dn-btn-primary"
          onClick={() => navigate("/debit-note/create")}
        >
          Create Debit Note
        </button>
      </div>

      <div className="dn-table-header">
        <div className="dn-th">Date <ChevronDownIcon /></div>
        <div className="dn-th">Debit Note Number</div>
        <div className="dn-th">Party Name</div>
        <div className="dn-th">Purchase No</div>
        <div className="dn-th">Amount</div>
        <div className="dn-th">Status</div>
      </div>

      <div className="dn-empty-state">
        <ReceiptXIcon />
        <p className="dn-empty-text">No Transactions Matching the current filter</p>
      </div>
      </div>
    </div>
  );
}