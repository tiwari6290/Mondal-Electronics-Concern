import { useState, useRef, useEffect } from "react";
import "./CreatePaymentIn.css";
import Sidebar from "../components/Sidebar/Sidebar";
import QuickPaymentSettings from "./QuickPaymentSettings";

// ── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, className = "" }) => {
  const icons = {
    dashboard: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    package: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    shoppingCart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    settings: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93A10 10 0 0 1 21.95 10H22a2 2 0 0 1 0 4h-.06a10 10 0 0 1-2.87 5.07M4.93 19.07A10 10 0 0 1 2.05 14H2a2 2 0 0 1 0-4h.06A10 10 0 0 1 4.93 4.93"/>
      </svg>
    ),
    chevronRight: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    ),
    chevronDown: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    ),
    chevronLeft: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    ),
    arrowLeft: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
      </svg>
    ),
    calendar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    plus: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
    x: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    ),
    info: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
    creditCard: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    fileText: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    truck: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    search: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    tag: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
    edit: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    receipt: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 6 2 18 2 18 9"/>
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
    ),
    scrollDown: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="7 13 12 18 17 13"/><polyline points="7 6 12 11 17 6"/>
      </svg>
    ),
    noData: (
      <svg width="80" height="80" viewBox="0 0 120 120" fill="none">
        <rect x="15" y="20" width="55" height="70" rx="4" fill="#e8eaf0" stroke="#c5c8d6" strokeWidth="1.5"/>
        <line x1="25" y1="40" x2="58" y2="40" stroke="#c5c8d6" strokeWidth="2"/>
        <line x1="25" y1="52" x2="58" y2="52" stroke="#c5c8d6" strokeWidth="2"/>
        <line x1="25" y1="64" x2="45" y2="64" stroke="#c5c8d6" strokeWidth="2"/>
        <rect x="50" y="45" width="55" height="55" rx="4" fill="#f0f4f0" stroke="#b8d4b8" strokeWidth="1.5"/>
        <path d="M65 65 L65 80 M72 72 L65 65 L58 72" stroke="#7cb87c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="82" cy="58" r="8" fill="#fff" stroke="#7cb87c" strokeWidth="1.5"/>
        <line x1="82" y1="54" x2="82" y2="62" stroke="#7cb87c" strokeWidth="1.5"/>
        <line x1="78" y1="58" x2="86" y2="58" stroke="#7cb87c" strokeWidth="1.5"/>
        <line x1="88" y1="63" x2="93" y2="68" stroke="#7cb87c" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    lightning: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    camera: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
  };
  return <span className={`icon ${className}`}>{icons[name] || null}</span>;
};

// ── Calendar ─────────────────────────────────────────────────────────────────
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

function CalendarPicker({ value, onChange, onClose }) {
  const [viewDate, setViewDate] = useState(value || new Date());
  const [selected, setSelected] = useState(value || new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: prevDays - i, cur: false });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, cur: true });
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) cells.push({ day: d, cur: false });

  const isSelected = (d, cur) => cur && d === selected.getDate() && month === selected.getMonth() && year === selected.getFullYear();
  const isToday = (d, cur) => { const t = new Date(); return cur && d === t.getDate() && month === t.getMonth() && year === t.getFullYear(); };

  return (
    <div className="calendar-popup">
      <div className="cal-header-title">
        {selected.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, " ")}
      </div>
      <div className="cal-nav-row">
        <div className="cal-nav-month">
          <button className="cal-arrow" onClick={() => setViewDate(new Date(year, month - 1, 1))}><Icon name="chevronLeft" size={14}/></button>
          <span>{MONTHS[month]}</span>
          <button className="cal-arrow" onClick={() => setViewDate(new Date(year, month + 1, 1))}><Icon name="chevronRight" size={14}/></button>
        </div>
        <div className="cal-nav-year">
          <button className="cal-arrow" onClick={() => setViewDate(new Date(year - 1, month, 1))}><Icon name="chevronLeft" size={14}/></button>
          <span>{year}</span>
          <button className="cal-arrow" onClick={() => setViewDate(new Date(year + 1, month, 1))}><Icon name="chevronRight" size={14}/></button>
        </div>
      </div>
      <div className="cal-days-header">
        {DAYS.map(d => <span key={d}>{d}</span>)}
      </div>
      <div className="cal-grid">
        {cells.map((c, i) => (
          <button
            key={i}
            className={`cal-cell ${!c.cur ? "other-month" : ""} ${isSelected(c.day, c.cur) ? "selected" : ""} ${isToday(c.day, c.cur) && !isSelected(c.day, c.cur) ? "today" : ""}`}
            onClick={() => { if (c.cur) setSelected(new Date(year, month, c.day)); }}
          >{c.day}</button>
        ))}
      </div>
      <div className="cal-footer">
        <button className="cal-cancel-btn" onClick={onClose}>CANCEL</button>
        <button className="cal-ok-btn" onClick={() => { onChange(selected); onClose(); }}>OK</button>
      </div>
    </div>
  );
}

// ── Create Party Modal ────────────────────────────────────────────────────────
function CreatePartyModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [showGstin, setShowGstin] = useState(false);
  const [billingAddress, setBillingAddress] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [shippingSame, setShippingSame] = useState(true);
  const [gstin, setGstin] = useState("");

  const handleSave = () => {
    if (name.trim()) { onCreate(name.trim()); onClose(); }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Create New Party</span>
          <button className="modal-close" onClick={onClose}><Icon name="x" size={16}/></button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Party Name <span className="required">*</span></label>
            <input className="form-input" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} autoFocus/>
          </div>
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input className="form-input" placeholder="Enter Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)}/>
          </div>

          {!showAddress && (
            <button className="add-optional-btn" onClick={() => setShowAddress(true)}>
              <Icon name="plus" size={13}/> Add Address (Optional)
            </button>
          )}

          {showAddress && (
            <div className="optional-section">
              <div className="optional-section-header">
                <span>Address (Optional)</span>
                <button className="remove-btn" onClick={() => setShowAddress(false)}>Remove</button>
              </div>
              <div className="form-group">
                <label className="form-label">BILLING ADDRESS <span className="required">*</span></label>
                <textarea className="form-textarea" placeholder="Enter billing address" value={billingAddress} onChange={e => setBillingAddress(e.target.value)}/>
              </div>
              <div className="form-row-two">
                <div className="form-group">
                  <label className="form-label">STATE</label>
                  <div className="select-wrap">
                    <Icon name="search" size={14} className="select-icon"/>
                    <select className="form-select" value={state} onChange={e => setState(e.target.value)}>
                      <option value="">Enter State</option>
                      <option>West Bengal</option><option>Maharashtra</option>
                      <option>Karnataka</option><option>Delhi</option>
                      <option>Tamil Nadu</option>
                    </select>
                    <Icon name="chevronDown" size={14} className="select-arrow"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">PINCODE</label>
                  <input className="form-input" placeholder="Enter Pincode" value={pincode} onChange={e => setPincode(e.target.value)}/>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">CITY</label>
                <input className="form-input" placeholder="Enter City" value={city} onChange={e => setCity(e.target.value)}/>
              </div>
              <label className="checkbox-label">
                <input type="checkbox" checked={shippingSame} onChange={e => setShippingSame(e.target.checked)}/>
                <span>Shipping address same as billing address</span>
              </label>
            </div>
          )}

          {!showGstin && (
            <button className="add-optional-btn" onClick={() => setShowGstin(true)}>
              <Icon name="plus" size={13}/> Add GSTIN (Optional)
            </button>
          )}

          {showGstin && (
            <div className="optional-section">
              <div className="optional-section-header">
                <span>GSTIN (Optional)</span>
                <button className="remove-btn" onClick={() => setShowGstin(false)}>Remove</button>
              </div>
              <div className="form-group">
                <label className="form-label">GSTIN</label>
                <input className="form-input" placeholder="ex: 29XXXXX9438X1XX" value={gstin} onChange={e => setGstin(e.target.value)}/>
              </div>
            </div>
          )}

          <div className="custom-fields-notice">
            You can add Custom Fields from <a href="#" className="link">Party Settings</a>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className={`btn-save ${!name.trim() ? "disabled" : ""}`} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function RecordPaymentIn() {
  const [partySearch, setPartySearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);
  const [amountReceived, setAmountReceived] = useState("");
  const [paymentDiscount, setPaymentDiscount] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date(2026, 3, 10));
  const [showCalendar, setShowCalendar] = useState(false);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [notes, setNotes] = useState("");
  const [showCreateParty, setShowCreateParty] = useState(false);
  const [parties, setParties] = useState(["Cash Sale"]);

  // ── New: Settings state ──────────────────────────────────────────────────
  const [showSettings, setShowSettings] = useState(false);

  const dropdownRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false);
      if (calendarRef.current && !calendarRef.current.contains(e.target)) setShowCalendar(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredParties = parties.filter(p => p.toLowerCase().includes(partySearch.toLowerCase()));

  const formatDate = (d) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  const handlePartySelect = (p) => {
    setSelectedParty(p);
    setPartySearch(p);
    setShowDropdown(false);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        {/* Top bar */}
        <div className="page-topbar">
          <div className="page-topbar-left">
            <button className="back-btn"><Icon name="arrowLeft" size={18}/></button>
            <h1 className="page-title">Record Payment In #1</h1>
          </div>
          <div className="page-topbar-right">
            <button className="icon-btn"><Icon name="camera" size={18}/></button>

            {/* ── Updated Settings button ── */}
            <button className="icon-btn settings-btn" onClick={() => setShowSettings(true)}>
              <Icon name="settings" size={16}/> Settings
            </button>

            <button className="btn-cancel-action">Cancel</button>
            <button className="btn-save-action" disabled>Save</button>
          </div>
        </div>

        {/* Form area */}
        <div className="form-area">
          {/* Left card */}
          <div className="card left-card">
            <div className="form-group">
              <label className="field-label">Party Name</label>
              <div className="party-search-wrap" ref={dropdownRef}>
                <input
                  className="party-input"
                  placeholder="Search party by name or number"
                  value={partySearch}
                  onChange={e => { setPartySearch(e.target.value); setShowDropdown(true); setSelectedParty(null); }}
                  onFocus={() => setShowDropdown(true)}
                />
                <span className="party-input-arrow"><Icon name="chevronDown" size={14}/></span>

                {showDropdown && (
                  <div className="party-dropdown">
                    {filteredParties.map(p => (
                      <div key={p} className="party-dropdown-item" onClick={() => handlePartySelect(p)}>{p}</div>
                    ))}
                    <div className="party-dropdown-create" onClick={() => { setShowDropdown(false); setShowCreateParty(true); }}>
                      <Icon name="plus" size={13}/> Create Party
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="form-row-two" style={{marginTop: 16}}>
              <div className="form-group">
                <label className="field-label">Amount Received</label>
                <input className="field-input" type="number" value={amountReceived} onChange={e => setAmountReceived(e.target.value)} placeholder="0"/>
              </div>
              <div className="form-group">
                <label className="field-label">Payment In Discount <Icon name="info" size={13} className="info-icon"/></label>
                <input className="field-input" type="number" value={paymentDiscount} onChange={e => setPaymentDiscount(e.target.value)} placeholder="0"/>
              </div>
            </div>
          </div>

          {/* Right card */}
          <div className="card right-card">
            <div className="right-card-row">
              <div className="form-group flex-1">
                <label className="field-label">Payment Date</label>
                <div className="date-field-wrap" ref={calendarRef}>
                  <button className="date-field" onClick={() => setShowCalendar(v => !v)}>
                    <Icon name="calendar" size={14}/> {formatDate(paymentDate)}
                    <Icon name="chevronDown" size={14} className="ml-auto"/>
                  </button>
                  {showCalendar && (
                    <CalendarPicker
                      value={paymentDate}
                      onChange={d => setPaymentDate(d)}
                      onClose={() => setShowCalendar(false)}
                    />
                  )}
                </div>
              </div>
              <div className="form-group flex-1">
                <label className="field-label">Payment Mode</label>
                <div className="select-wrap">
                  <select className="form-select" value={paymentMode} onChange={e => setPaymentMode(e.target.value)}>
                    <option>Cash</option><option>UPI</option>
                    <option>Bank Transfer</option><option>Cheque</option><option>Card</option>
                  </select>
                  <Icon name="chevronDown" size={14} className="select-arrow"/>
                </div>
              </div>
              <div className="form-group" style={{minWidth: 120}}>
                <label className="field-label">Payment In Number</label>
                <input className="field-input" value="1" readOnly/>
              </div>
            </div>
            <div className="form-group" style={{marginTop: 16}}>
              <label className="field-label">Notes</label>
              <textarea
                className="notes-textarea"
                placeholder="Enter Notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Empty state */}
        {!selectedParty && (
          <div className="empty-state">
            <Icon name="noData" size={80}/>
            <div className="empty-title">No party selected!</div>
            <div className="empty-sub">Select Party Name to view transactions</div>
            <button className="select-party-btn" onClick={() => { setShowDropdown(true); }}>Select Party</button>
          </div>
        )}
      </main>

      {/* Create Party Modal */}
      {showCreateParty && (
        <CreatePartyModal
          onClose={() => setShowCreateParty(false)}
          onCreate={(name) => {
            setParties(prev => [...prev, name]);
            handlePartySelect(name);
          }}
        />
      )}

      {/* ── Quick Payment Settings Modal ── */}
      {showSettings && (
        <QuickPaymentSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}