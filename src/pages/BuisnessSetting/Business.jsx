import { useState, useRef } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./Business.css";

/* ── SVG Icon helper ──────────────────────────────────────────────────────── */
const Icon = ({ d, size = 16, color = "currentColor", strokeWidth = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  building:    "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  phone:       "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.14 1.27 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92",
  mail:        "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  mapPin:      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 7a3 3 0 100 6 3 3 0 000-6z",
  hash:        "M4 9h16 M4 15h16 M10 3L8 21 M16 3l-2 18",
  shield:      "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  tag:         "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z M7 7h.01",
  pen:         "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  globe:       "M12 2a10 10 0 100 20A10 10 0 0012 2z M2 12h20 M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20",
  save:        "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z M17 21v-8H7v8 M7 3v5h8",
  x:           "M18 6L6 18 M6 6l12 12",
  chevronDown: "M6 9l6 6 6-6",
  upload:      "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M17 8l-5-5-5 5 M12 3v12",
  plus:        "M12 5v14 M5 12h14",
  check:       "M20 6L9 17l-5-5",
  info:        "M12 22a10 10 0 100-20 10 10 0 000 20z M12 8v4 M12 16h.01",
  briefcase:   "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2",
  store:       "M2 3h20 M2 3v1a4 4 0 004 4h12a4 4 0 004-4V3 M6 8v13 M18 8v13 M2 21h20",
  help:        "M12 22a10 10 0 100-20 10 10 0 000 20z M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3 M12 17h.01",
  calendar:    "M3 9h18 M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z M16 3v4 M8 3v4",
  arrowLeft:   "M19 12H5 M12 19l-7-7 7-7",
  receipt:     "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  arrowRight:  "M5 12h14 M12 5l7 7-7 7",
  user:        "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  fileText:    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  printer:     "M6 9V2h12v7 M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2 M6 14h12v8H6z",
  users:       "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 11a4 4 0 100-8 4 4 0 000 8z",
  bell:        "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  share2:      "M8.59 13.51l6.83 3.98 M15.41 6.51l-6.82 3.98 M21 5a3 3 0 11-6 0 3 3 0 016 0z M9 12a3 3 0 11-6 0 3 3 0 016 0z M21 19a3 3 0 11-6 0 3 3 0 016 0z",
  dollarSign:  "M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  logOut:      "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  search:      "M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z M16 16l4.5 4.5",
  shield2:     "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  keyboard:    "M20 5H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2z M8 10h.01 M12 10h.01 M16 10h.01 M8 14h8",
};

/* ── Sidebar ──────────────────────────────────────────────────────────────── */
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { key: "account",   label: "Account",            icon: "user",        path: "/settings/account" },
    { key: "manage",    label: "Manage Business",     icon: "briefcase",   path: "/settings" },
    { key: "invoice",   label: "Invoice Settings",    icon: "fileText",    path: "/settings/invoice" },
    { key: "print",     label: "Print Settings",      icon: "printer",     path: "/settings/print" },
    { key: "users",     label: "Manage Users",        icon: "users",       path: "/settings/users" },
    { key: "reminders", label: "Reminders",           icon: "bell",        path: "/settings/reminders" },
    { key: "ca",        label: "CA Reports Sharing",  icon: "share2",      path: "/settings/reports" },
    { key: "pricing",   label: "Pricing",             icon: "dollarSign",  path: "/settings/pricing" },
    { key: "refer",     label: "Refer & Earn",        icon: "help",        path: "/settings/refer" },
    { key: "help",      label: "Help And Support",    icon: "help",        path: "/settings/help" },
  ];

  return (
    <aside className="bs-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-avatar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
          </svg>
        </div>
        <div>
          <div className="sidebar-biz-name">Mondal Electronics Concern</div>
          <div className="sidebar-biz-phone">9555780835</div>
        </div>
      </div>

      <button className="sidebar-back-btn" onClick={() => navigate("/dashboard")}>
        <Icon d={icons.arrowLeft} size={13} color="#fff" />
        Back to Dashboard
      </button>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.key}
            className={`sidebar-nav-item${isActive(item.path) ? " active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <Icon
              d={icons[item.icon] || icons.help}
              size={15}
              color={isActive(item.path) ? "var(--accent)" : "var(--text-2)"}
            />
            {item.label}
          </button>
        ))}

        <div className="sidebar-divider" />

        <button className="sidebar-nav-item" onClick={() => navigate("/login")}>
          <Icon d={icons.logOut} size={15} color="var(--text-2)" />
          Logout
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-version">App Version : 9.1.0</div>
        <div className="sidebar-secure-row">
          <div className="sidebar-secure-badge">
            <Icon d={icons.shield2} size={12} color="var(--text-2)" />
            100% Secure
          </div>
          <div className="sidebar-secure-badge">
            <Icon d={icons.check} size={12} color="var(--text-2)" />
            ISO Certified
          </div>
        </div>
        <div className="sidebar-brand-logo">
          <span className="brand-text">myBillBook</span>
          <span className="brand-sub">by ★ fiobiz</span>
        </div>
      </div>
    </aside>
  );
}

/* ── Toggle ───────────────────────────────────────────────────────────────── */
function Toggle({ checked, onChange, label, badge, disabled }) {
  return (
    <div className={`toggle-row${checked ? " toggle-on" : ""}${disabled ? " einvoice-row" : ""}`}>
      <span className="toggle-label">
        {label}
        {badge && <span className="badge">{badge}</span>}
      </span>
      <button
        role="switch"
        aria-checked={checked}
        className={`toggle-btn${checked ? " on" : ""}`}
        onClick={() => !disabled && onChange(!checked)}
        style={disabled ? { opacity: 0.5, cursor: "not-allowed" } : {}}
      >
        <span className="toggle-thumb" />
      </button>
    </div>
  );
}

/* ── Field ────────────────────────────────────────────────────────────────── */
function Field({ label, icon, required, hint, error, children, style }) {
  return (
    <div className="bs-field" style={style}>
      {label && (
        <label className="bs-label">
          {icon && <Icon d={icons[icon]} size={12} color="var(--accent)" />}
          {label}
          {required && <span className="req">*</span>}
          {hint && <span className="label-hint">{hint}</span>}
        </label>
      )}
      {children}
      {error && (
        <span className="field-error">
          <Icon d={icons.info} size={11} color="var(--red)" /> {error}
        </span>
      )}
    </div>
  );
}

/* ── Card ─────────────────────────────────────────────────────────────────── */
function Card({ icon, title, children, className = "" }) {
  return (
    <div className={`bs-card ${className}`}>
      <div className="bs-card-header">
        <div className="bs-card-icon-wrap">
          <Icon d={icons[icon]} size={14} color="var(--accent)" />
        </div>
        <h2 className="bs-card-title">{title}</h2>
      </div>
      {children}
    </div>
  );
}

/* ── Store SVG illustrations ──────────────────────────────────────────────── */
function Store1SVG() {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
      <rect x="5" y="30" width="90" height="50" fill="#e8845a" rx="2"/>
      <rect x="0" y="22" width="100" height="12" fill="#c0603a" rx="2"/>
      <rect x="12" y="38" width="18" height="16" fill="#7ecfe8" rx="2"/>
      <rect x="40" y="38" width="18" height="16" fill="#7ecfe8" rx="2"/>
      <rect x="68" y="38" width="18" height="16" fill="#7ecfe8" rx="2"/>
      <rect x="36" y="56" width="28" height="24" fill="#8b6914" rx="2"/>
      <circle cx="60" cy="68" r="2" fill="#f5c842"/>
      <rect x="20" y="44" width="60" height="5" fill="#f5c842" rx="1"/>
    </svg>
  );
}

function Store2SVG() {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
      <rect x="5" y="30" width="90" height="50" fill="#8b6914" rx="2"/>
      <rect x="0" y="22" width="100" height="12" fill="#6b4f10" rx="2"/>
      <rect x="12" y="38" width="18" height="16" fill="#a8d4f5" rx="2"/>
      <rect x="68" y="38" width="18" height="16" fill="#a8d4f5" rx="2"/>
      <rect x="36" y="52" width="28" height="28" fill="#5b4cf5" rx="2"/>
      <rect x="42" y="58" width="7" height="10" fill="#7ecfe8" rx="1"/>
      <rect x="51" y="58" width="7" height="10" fill="#7ecfe8" rx="1"/>
    </svg>
  );
}

function ConnectorSVG() {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
      <line x1="0" y1="30" x2="18" y2="30" stroke="#e4e6ef" strokeWidth="2"/>
      <line x1="62" y1="30" x2="80" y2="30" stroke="#e4e6ef" strokeWidth="2"/>
      <rect x="18" y="14" width="44" height="32" fill="white" stroke="#e4e6ef" strokeWidth="1.5" rx="4"/>
      <rect x="22" y="18" width="36" height="22" fill="#f1f2f7" rx="2"/>
      <rect x="26" y="22" width="10" height="6" fill="#f97316" rx="1"/>
      <rect x="26" y="30" width="16" height="2" fill="#e4e6ef" rx="1"/>
      <rect x="26" y="34" width="12" height="2" fill="#e4e6ef" rx="1"/>
      <rect x="40" y="21" width="14" height="8" fill="#5b4cf5" rx="1" opacity="0.3"/>
      <rect x="36" y="46" width="8" height="4" fill="#e4e6ef" rx="1"/>
      <rect x="30" y="50" width="20" height="2" fill="#e4e6ef" rx="1"/>
      <path d="M14 27l-4 3 4 3" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M66 27l4 3-4 3" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── ManageBusiness Page (index route) ───────────────────────────────────── */
function ManageBusinessPage() {
  const [businessName, setBusinessName]   = useState("");
  const [nameError, setNameError]         = useState("");
  const [phone, setPhone]                 = useState("");
  const [email, setEmail]                 = useState("");
  const [address, setAddress]             = useState("");
  const [stateVal, setStateVal]           = useState("");
  const [pincode, setPincode]             = useState("");
  const [city, setCity]                   = useState("");
  const [isGST, setIsGST]                 = useState(false);
  const [gstin, setGstin]                 = useState("");
  const [pan, setPan]                     = useState("");
  const [eInvoice, setEInvoice]           = useState(false);
  const [enableTDS, setEnableTDS]         = useState(true);
  const [enableTCS, setEnableTCS]         = useState(true);
  const [bizType, setBizType]             = useState("Services");
  const [industryType, setIndustryType]   = useState("");
  const [regType, setRegType]             = useState("");
  const [website, setWebsite]             = useState("");
  const [signatureFile, setSignatureFile] = useState(null);
  const [logoFile, setLogoFile]           = useState(null);
  const [logoPreview, setLogoPreview]     = useState(null);
  const [saved, setSaved]                 = useState(false);
  const [isDragging, setIsDragging]       = useState(false);
  const logoRef = useRef();
  const sigRef  = useRef();

  const handleSave = () => {
    if (businessName.length > 0 && (businessName.length < 3 || businessName.length > 60)) {
      setNameError("Business name must be 3–60 characters.");
      return;
    }
    setNameError("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0] || e.target.files?.[0];
    if (file) setSignatureFile(file.name);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => setLogoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bs-page">

      {/* Top Bar */}
      <header className="bs-topbar">
        <div className="bs-topbar-left">
          <h1 className="bs-title">Business Settings</h1>
          <p className="bs-subtitle">Edit Your Company Settings And Information</p>
        </div>
        <div className="bs-topbar-right">
          <button className="btn-keyboard" title="Keyboard shortcuts">
            <Icon d={icons.keyboard} size={16} color="var(--text-2)" />
          </button>
          <button className="btn-orange">
            <Icon d={icons.plus} size={13} /> Create new business
          </button>
          <button className="btn-ghost">
            <Icon d={icons.help} size={13} /> Chat Support
          </button>
          <button className="btn-ghost">
            <Icon d={icons.calendar} size={13} /> Close Financial Year
          </button>
          <button className="btn-ghost btn-cancel">Cancel</button>
          <button className={`btn-save${saved ? " saved" : ""}`} onClick={handleSave}>
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="bs-body">

        {/* LEFT COLUMN */}
        <div className="bs-col">

          <Card icon="building" title="Company Identity">
            <div className="logo-name-row">
              <div className="logo-upload-box" onClick={() => logoRef.current?.click()}>
                <input ref={logoRef} type="file" hidden accept="image/*" onChange={handleLogoChange} />
                {logoPreview
                  ? <img src={logoPreview} alt="Logo" />
                  : <>
                      <Icon d={icons.upload} size={18} color="var(--accent)" />
                      <span>Upload Logo</span>
                    </>
                }
              </div>
              <Field label="Business Name" icon="tag" required error={nameError} style={{ flex: 1 }}>
                <input type="text"
                  className={`bs-input${nameError ? " input-error" : ""}`}
                  value={businessName}
                  onChange={e => { setBusinessName(e.target.value); setNameError(""); }}
                  placeholder="Enter business name" />
              </Field>
            </div>

            <div className="bs-grid-2">
              <Field label="Company Phone Number" icon="phone">
                <input type="tel" className="bs-input" value={phone}
                  onChange={e => setPhone(e.target.value)} placeholder="Enter company phone number" />
              </Field>
              <Field label="Company E-Mail" icon="mail">
                <input type="email" className="bs-input" value={email}
                  onChange={e => setEmail(e.target.value)} placeholder="Enter company e-mail" />
              </Field>
            </div>

            <Field label="Billing Address" icon="mapPin">
              <textarea className="bs-input bs-textarea" value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter Billing Address" rows={3} />
            </Field>

            <div className="bs-grid-2">
              <Field label="State">
                <div className="select-wrap">
                  <span className="search-icon">
                    <Icon d={icons.search} size={12} color="var(--text-3)" />
                  </span>
                  <input type="text" className="bs-input with-search-icon" value={stateVal}
                    onChange={e => setStateVal(e.target.value)} placeholder="Enter State" />
                  <span className="caret"><Icon d={icons.chevronDown} size={13} /></span>
                </div>
              </Field>
              <Field label="Pincode">
                <input type="text" className="bs-input" value={pincode}
                  onChange={e => setPincode(e.target.value)} placeholder="Enter Pincode" />
              </Field>
            </div>

            <Field label="City" icon="mapPin">
              <input type="text" className="bs-input" value={city}
                onChange={e => setCity(e.target.value)} />
            </Field>
          </Card>

          <Card icon="shield" title="GST & Tax Details">
            <Field label="Are you GST Registered?">
              <div className="radio-group">
                {["Yes", "No"].map(v => (
                  <label key={v} className={`radio-pill${isGST === (v === "Yes") ? " active" : ""}`}>
                    <input type="radio" name="gst" hidden
                      checked={isGST === (v === "Yes")} onChange={() => setIsGST(v === "Yes")} />
                    <span className="radio-dot" />
                    {v}
                  </label>
                ))}
              </div>
            </Field>

            {isGST && (
              <Field label="GSTIN" icon="hash" required>
                <input type="text" className="bs-input" value={gstin}
                  onChange={e => setGstin(e.target.value)} placeholder="Enter your GST Number" />
              </Field>
            )}

            <Toggle checked={eInvoice} onChange={setEInvoice} label="Enable e-Invoicing" badge="New" disabled={!isGST} />

            <Field label="PAN Number" icon="hash">
              <input type="text" className="bs-input" value={pan}
                onChange={e => setPan(e.target.value)} placeholder="Enter your PAN Number" />
            </Field>

            <Toggle checked={enableTDS} onChange={setEnableTDS} label="Enable TDS" />
            <Toggle checked={enableTCS} onChange={setEnableTCS} label="Enable TCS" />
          </Card>

          <Card icon="store" title="Company Settings">
            <div className="tally-card">
              <div className="tally-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="3" y1="15" x2="21" y2="15"/>
                  <line x1="9" y1="3" x2="9" y2="21"/>
                  <line x1="15" y1="3" x2="15" y2="21"/>
                </svg>
              </div>
              <div className="tally-info">
                <span className="tally-name">
                  Data Export to Tally <span className="badge badge-orange">New</span>
                </span>
                <span className="tally-desc">Transfer vouchers, items and parties to Tally</span>
              </div>
              <button className="btn-tally-go">
                <Icon d={icons.arrowRight} size={13} color="var(--accent)" />
              </button>
            </div>
          </Card>

          <div className="bs-card add-biz-card">
            <div className="bs-card-header">
              <div className="bs-card-icon-wrap">
                <Icon d={icons.store} size={14} color="var(--accent)" />
              </div>
              <h2 className="bs-card-title">Add New Business</h2>
            </div>
            <div style={{ padding: "0 20px 20px" }}>
              <div className="stores-visual-area">
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                    background: "white", border: "1px solid var(--border)",
                    borderRadius: "4px", fontSize: "9px", fontWeight: 800,
                    padding: "2px 10px", color: "var(--text-2)", letterSpacing: ".5px", whiteSpace: "nowrap"
                  }}>STORE 1</div>
                  <Store1SVG />
                </div>
                <ConnectorSVG />
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                    background: "var(--orange)", border: "1px solid var(--orange)",
                    borderRadius: "4px", fontSize: "9px", fontWeight: 800,
                    padding: "2px 10px", color: "#fff", letterSpacing: ".5px", whiteSpace: "nowrap"
                  }}>STORE 2</div>
                  <Store2SVG />
                </div>
              </div>
              <p className="store-caption">Easily Manage all your businesses in one place on myBillBook app</p>
              <button className="btn-create-biz">
                <Icon d={icons.plus} size={13} /> Create New Business
              </button>
            </div>
          </div>

        </div>{/* end left col */}

        {/* RIGHT COLUMN */}
        <div className="bs-col">

          <Card icon="briefcase" title="Business Classification">
            <Field label="Business Type" hint="(Select multiple, if applicable)">
              <div className="select-wrap">
                <select className="bs-input bs-select" value={bizType} onChange={e => setBizType(e.target.value)}>
                  {["Services", "Manufacturing", "Trading", "Retail", "Wholesale", "Other"].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <span className="caret"><Icon d={icons.chevronDown} size={13} /></span>
              </div>
            </Field>

            <Field label="Industry Type">
              <div className="select-wrap industry-select-wrap">
                <span className="industry-search-icon">
                  <Icon d={icons.search} size={12} color="var(--text-3)" />
                </span>
                <select className="bs-input bs-select with-search-icon" value={industryType} onChange={e => setIndustryType(e.target.value)}>
                  <option value="">Select Industry Type</option>
                  {["Electronics", "Retail", "FMCG", "Healthcare", "IT", "Finance", "Education"].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <span className="caret"><Icon d={icons.chevronDown} size={13} /></span>
              </div>
            </Field>

            <Field label="Business Registration Type">
              <div className="select-wrap">
                <select className="bs-input bs-select" value={regType} onChange={e => setRegType(e.target.value)}>
                  {["Private Limited Company", "Public Limited Company", "LLP",
                    "Sole Proprietorship", "Partnership Firm", "OPC"].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <span className="caret"><Icon d={icons.chevronDown} size={13} /></span>
              </div>
            </Field>
          </Card>

          <Card icon="pen" title="Signature">
            <div className="invoice-note">
              <Icon d={icons.info} size={13} color="#92400e" />
              <strong>Note:</strong>&nbsp;Details added below will be shown on your Invoices
            </div>

            {!signatureFile ? (
              <>
                <div
                  className="signature-placeholder"
                  onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => sigRef.current?.click()}
                >
                  <input ref={sigRef} type="file" hidden accept="image/*" onChange={handleFileDrop} />
                  <div className="sig-inner-box" />
                </div>
                <p className="sig-hint">
                  You have enabled to show 'Empty Signature box' on invoices
                </p>
                <span className="sig-remove-link" onClick={() => {}}>Remove</span>
              </>
            ) : (
              <>
                <div
                  className={`drop-zone has-file${isDragging ? " dragging" : ""}`}
                  onClick={() => sigRef.current?.click()}
                >
                  <input ref={sigRef} type="file" hidden accept="image/*" onChange={handleFileDrop} />
                  <div className="drop-check">
                    <Icon d={icons.check} size={16} color="#fff" />
                  </div>
                  <span className="drop-filename">{signatureFile}</span>
                </div>
                <button className="btn-remove" onClick={() => setSignatureFile(null)}>
                  <Icon d={icons.x} size={11} /> Remove
                </button>
              </>
            )}
          </Card>

          <Card icon="globe" title="Add Business Details">
            <p className="card-desc">Add additional business information such as MSME number, Website etc.</p>
            <div className="website-row">
              <span className="website-prefix">
                <Icon d={icons.globe} size={12} color="var(--accent)" /> Website
              </span>
              <span className="website-separator">-</span>
              <input type="text" className="bs-input website-input"
                value={website} onChange={e => setWebsite(e.target.value)}
                placeholder="www.website.com" />
              <button className="btn-add">Add</button>
            </div>
          </Card>

        </div>{/* end right col */}
      </div>
    </div>
  );
}

/* ── Root Layout Export ───────────────────────────────────────────────────── */
export default function BusinessSettings() {
  const location = useLocation();
  const isIndex  = location.pathname === "/settings";

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="bs-outlet">
        {isIndex ? <ManageBusinessPage /> : <Outlet />}
      </div>
    </div>
  );
}