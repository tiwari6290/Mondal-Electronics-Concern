import { useState } from "react";
import "./Refer.css";

/* ── Icon helper ── */
const Icon = ({ d, size = 16, color = "currentColor", strokeWidth = 1.8, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  x:          "M18 6L6 18 M6 6l12 12",
  share:      "M8.59 13.51l6.83 3.98 M15.41 6.51l-6.82 3.98 M21 5a3 3 0 11-6 0 3 3 0 016 0z M9 12a3 3 0 11-6 0 3 3 0 016 0z M21 19a3 3 0 11-6 0 3 3 0 016 0z",
  download:   "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  gift:       "M20 12v10H4V12 M22 7H2v5h20V7z M12 22V7 M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z",
  copy:       "M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z",
  send:       "M22 2L11 13 M22 2L15 22 9 13 2 9l20-7z",
  users:      "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 11a4 4 0 100-8 4 4 0 000 8z",
  rupee:      "M6 3h12 M6 8h12 M6 13l8.5 8 M6 13h3a6 6 0 000-12",
  wallet:     "M21 12V7H5a2 2 0 010-4h14v4 M3 5v14a2 2 0 002 2h16v-5 M18 12a2 2 0 000 4h4v-4z",
  chevron:    "M6 9l6 6 6-6",
  search:     "M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z M16 16l4.5 4.5",
  smartphone: "M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2z M12 18h.01",
  userX:      "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M22 9l-5 5 M17 9l5 5",
};

/* ── Refer Now Modal ── */
function ReferNowModal({ onClose }) {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText("MBB-REF-2026").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="re-overlay" onClick={onClose}>
      <div className="re-modal" onClick={e => e.stopPropagation()}>
        <div className="re-modal-header">
          <h2 className="re-modal-title">Refer Now</h2>
          <button className="re-modal-close" onClick={onClose}>
            <Icon d={icons.x} size={16} color="#555" />
          </button>
        </div>

        <div className="re-modal-body">
          <div className="re-search-wrap">
            <span className="re-search-icon">
              <Icon d={icons.search} size={14} color="#9ca3af" />
            </span>
            <input
              className="re-search-input"
              type="text"
              placeholder="Search Party Name / Phone Number"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="re-search-chevron">
              <Icon d={icons.chevron} size={14} color="#9ca3af" />
            </span>
          </div>
        </div>

        <div className="re-modal-footer">
          <button className={`re-btn-copy ${copied ? "copied" : ""}`} onClick={handleCopy}>
            <Icon d={icons.copy} size={14} color={copied ? "#22c55e" : "#5b4cf5"} />
            {copied ? "Copied!" : "Copy Code"}
          </button>
          <button className="re-btn-refer-now">
            Refer Now
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Banner SVG Illustration ── */
function BannerIllustration() {
  return (
    <svg viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" className="re-banner-svg">
      {/* Gift boxes */}
      <rect x="200" y="35" width="28" height="26" rx="2" fill="#f97316" />
      <rect x="196" y="30" width="36" height="8" rx="2" fill="#ea580c" />
      <line x1="214" y1="30" x2="214" y2="61" stroke="#fed7aa" strokeWidth="2" />
      <path d="M210 30 Q214 24 218 30" stroke="#fed7aa" strokeWidth="1.5" fill="none" />

      <rect x="234" y="28" width="22" height="20" rx="2" fill="#fbbf24" />
      <rect x="231" y="23" width="28" height="7" rx="2" fill="#f59e0b" />
      <line x1="245" y1="23" x2="245" y2="48" stroke="#fde68a" strokeWidth="1.5" />

      <rect x="260" y="38" width="32" height="24" rx="2" fill="#14b8a6" />
      <rect x="256" y="32" width="40" height="9" rx="2" fill="#0d9488" />
      <line x1="276" y1="32" x2="276" y2="62" stroke="#99f6e4" strokeWidth="2" />
      <path d="M271 32 Q276 26 281 32" stroke="#99f6e4" strokeWidth="1.5" fill="none" />

      {/* Stars */}
      <circle cx="180" cy="25" r="2" fill="#fbbf24" />
      <circle cx="295" cy="20" r="1.5" fill="#f97316" />
      <circle cx="310" cy="35" r="2" fill="#fbbf24" />

      {/* Confetti */}
      <rect x="160" y="15" width="5" height="5" rx="1" fill="#f97316" transform="rotate(20,162,17)" />
      <rect x="290" y="50" width="4" height="4" rx="1" fill="#fbbf24" transform="rotate(-15,292,52)" />
      <rect x="305" y="18" width="3" height="3" rx="1" fill="#14b8a6" transform="rotate(30,306,19)" />
    </svg>
  );
}

/* ── Empty State SVG ── */
function EmptyStateSVG() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="22" r="10" stroke="#d1d5db" strokeWidth="2" fill="none" />
      <path d="M8 48c0-9 8.954-16 20-16" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M34 38l6 6 8-8" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ── Main Page ── */
export default function ReferAndEarn() {
  const [activeTab, setActiveTab] = useState("signedUp");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="re-page">
      {/* Page Title */}
      <h1 className="re-page-title">Refer &amp; Earn</h1>

      {/* Hero Banner */}
      <div className="re-banner">
        <div className="re-banner-actions">
          <button className="re-btn-refer-hero" onClick={() => setShowModal(true)}>
            Refer Now
          </button>
          <button className="re-btn-send-code">
            <Icon d={icons.send} size={14} color="#fff" />
            Send Code to my device
          </button>
        </div>
        <BannerIllustration />
      </div>

      {/* Rewards Section */}
      <div className="re-section">
        <h2 className="re-section-title">Rewards Earned</h2>
        <div className="re-rewards-grid">
          <div className="re-reward-card">
            <div className="re-reward-header">
              <Icon d={icons.wallet} size={15} color="#5b4cf5" />
              <span>Total Claimed</span>
            </div>
            <div className="re-reward-amount">
              <span className="re-rupee">₹</span> 0.0
            </div>
          </div>
          <div className="re-reward-card">
            <div className="re-reward-header">
              <Icon d={icons.gift} size={15} color="#f97316" />
              <span>Ready to Withdraw</span>
            </div>
            <div className="re-reward-amount">
              <span className="re-rupee">₹</span> 0.0
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="re-tabs">
          <button
            className={`re-tab ${activeTab === "signedUp" ? "active" : ""}`}
            onClick={() => setActiveTab("signedUp")}
          >
            <Icon d={icons.users} size={14} color={activeTab === "signedUp" ? "#5b4cf5" : "#6b7280"} />
            Signed Up
          </button>
          <button
            className={`re-tab ${activeTab === "planPurchased" ? "active" : ""}`}
            onClick={() => setActiveTab("planPurchased")}
          >
            <Icon d={icons.gift} size={14} color={activeTab === "planPurchased" ? "#5b4cf5" : "#6b7280"} />
            Plan Purchased
          </button>
        </div>

        {/* Empty State */}
        <div className="re-empty-state">
          <EmptyStateSVG />
          <p className="re-empty-text">
            {activeTab === "signedUp" ? "No signed up users yet!" : "No plan purchased yet!"}
          </p>
          <button className="re-btn-refer-empty" onClick={() => setShowModal(true)}>
            Refer Now
          </button>
        </div>
      </div>

      {/* How it Works */}
      <div className="re-section re-how-section">
        <h2 className="re-section-title">How it works?</h2>
        <div className="re-steps-grid">
          <div className="re-step-card">
            <div className="re-step-icon">
              <Icon d={icons.share} size={22} color="#5b4cf5" />
            </div>
            <p>1. Share the referral link with your friends</p>
          </div>
          <div className="re-step-card">
            <div className="re-step-icon">
              <Icon d={icons.smartphone} size={22} color="#f97316" />
            </div>
            <p>2. Your friend download myBillBook and subscribe the plan</p>
          </div>
          <div className="re-step-card">
            <div className="re-step-icon">
              <Icon d={icons.gift} size={22} color="#fbbf24" />
            </div>
            <p>3. You earn ₹501, they get 15% discount</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && <ReferNowModal onClose={() => setShowModal(false)} />}
    </div>
  );
}