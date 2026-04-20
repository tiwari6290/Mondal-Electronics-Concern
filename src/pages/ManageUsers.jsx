import { useState } from "react";
import "./ManageUsers.css";

const VIEW_EMPTY = "empty";
const VIEW_ACTIVITY = "activity";

export default function ManageUsers() {
  const [view, setView] = useState(VIEW_EMPTY);
  const [activeCard, setActiveCard] = useState("users"); // "users" | "activities"

  return (
    <div className="mu-page">
      {/* Header */}
      <div className="mu-header">
        <h2 className="mu-title">Manage Users</h2>
        <button className="mu-help-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#aaa" strokeWidth="1.4"/>
            <text x="8" y="12" textAnchor="middle" fontSize="10" fill="#aaa">?</text>
          </svg>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="mu-stats-row">
        <div
          className={`mu-stat-card ${activeCard === "users" ? "active" : ""}`}
          onClick={() => { setActiveCard("users"); setView(VIEW_EMPTY); }}
        >
          <div className="mu-stat-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#0eb87f"/>
            </svg>
            <span>Number of Users</span>
          </div>
          <div className="mu-stat-value">1</div>
        </div>

        <div
          className={`mu-stat-card ${activeCard === "activities" ? "active" : ""}`}
          onClick={() => { setActiveCard("activities"); setView(VIEW_ACTIVITY); }}
        >
          <div className="mu-stat-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="#4f46e5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Activities Performed</span>
          </div>
          <div className="mu-stat-row-bottom">
            <div className="mu-stat-value">0</div>
            <span className="mu-badge">Last 30 Days</span>
          </div>
        </div>
      </div>

      {/* Content */}
      {view === VIEW_EMPTY && <EmptyView />}
      {view === VIEW_ACTIVITY && <ActivityView />}
    </div>
  );
}

/* ── Empty / Onboarding View ── */
function EmptyView() {
  return (
    <div className="mu-empty-view">
      <div className="mu-diagram">
        {/* Admin node */}
        <div className="mu-node mu-node-admin">
          <div className="mu-avatar-admin">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="16" r="10" fill="#b0b8c8"/>
              <path d="M4 44c0-11 8-18 20-18s20 7 20 18" fill="#b0b8c8"/>
              <circle cx="34" cy="28" r="8" fill="#4f46e5"/>
              <path d="M30 28l2.5 2.5L38 25" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="mu-node-label">Admin</span>
          <span className="mu-full-vision-badge">Full Vision</span>
        </div>

        {/* Arrows + Mid nodes */}
        <div className="mu-mid-col">
          <div className="mu-mid-node">
            <div className="mu-mid-avatar partner">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <circle cx="16" cy="16" r="8" fill="#c8d0dc"/>
                <circle cx="32" cy="16" r="8" fill="#b0b8c8"/>
                <path d="M4 40c0-8 5-14 12-14h16c7 0 12 6 12 14" fill="#b0b8c8"/>
              </svg>
            </div>
            <span className="mu-node-label">Partner</span>
          </div>
          <div className="mu-mid-node">
            <div className="mu-mid-avatar ca">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
                <circle cx="20" cy="14" r="8" fill="#c8d0dc"/>
                <rect x="28" y="24" width="14" height="18" rx="2" fill="#b0b8c8"/>
                <path d="M4 44c0-9 6-16 16-16" fill="#b0b8c8"/>
              </svg>
            </div>
            <span className="mu-node-label">CA</span>
          </div>
        </div>

        {/* Right nodes */}
        <div className="mu-right-col">
          <RoleCard label="Salesman" color="#e8eaf6" />
          <RoleCard label="Stock Manager" color="#e8eaf6" />
          <RoleCard label="Delivery Boy" color="#e8eaf6" />
        </div>

        {/* Feature badges */}
        <div className="mu-badge-staffwise">
          <span className="mu-feature-dot orange" />
          Staffwise Daybook Report
        </div>
        <div className="mu-badge-activity">
          <span className="mu-feature-dot blue" />
          Activity Tracker
        </div>
      </div>

      <p className="mu-cta-title">Give access to users and monitor their actions</p>
      <p className="mu-cta-sub">Manage your business more efficiently with full control and vision</p>

      <div className="mu-cta-btns">
        <button className="mu-btn-primary">+ Add New User</button>
        <button className="mu-btn-outline">+ Add Your CA</button>
      </div>
    </div>
  );
}

function RoleCard({ label }) {
  return (
    <div className="mu-role-card">
      <div className="mu-role-avatar">
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="16" r="10" fill="#c8d0dc"/>
          <path d="M4 44c0-11 8-18 20-18s20 7 20 18" fill="#b0b8c8"/>
        </svg>
      </div>
      <div className="mu-role-lines">
        <div className="mu-line" />
        <div className="mu-line short" />
      </div>
      <span className="mu-role-label">{label}</span>
    </div>
  );
}

/* ── Activity Log View ── */
function ActivityView() {
  return (
    <div className="mu-activity-view">
      {/* Filters */}
      <div className="mu-filters-row">
        <div className="mu-search-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="#aaa" strokeWidth="1.4"/>
            <path d="M10.5 10.5L14 14" stroke="#aaa" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="mu-filter-select">
          <span>All Transactions</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="#888" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="mu-filter-select">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="2" width="14" height="13" rx="2" stroke="#888" strokeWidth="1.2"/>
            <path d="M5 1v2M11 1v2M1 6h14" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span>Last 30 Days</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="#888" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="mu-table">
        <div className="mu-table-head">
          <div className="mu-th">
            Time of Activity
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{marginLeft:4}}>
              <path d="M6 2v8M3 7l3 3 3-3" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="mu-th">Activity</div>
          <div className="mu-th wide">Transaction Details</div>
          <div className="mu-th">Performed By</div>
        </div>

        <div className="mu-table-empty">
          <div className="mu-empty-icon">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="24" stroke="#c8ccd8" strokeWidth="1.5"/>
              <polyline points="38 20 24 34 18 28" stroke="#c8ccd8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="38" y1="14" x2="14" y2="38" stroke="#c8ccd8" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="mu-empty-text">You have performed 0 activities</p>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="mu-promo-banner">
        <div className="mu-promo-icons">
          <div className="mu-promo-icon orange">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div className="mu-promo-icon purple">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="white"/>
            </svg>
          </div>
          <div className="mu-promo-icon green">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M16.5 16.5L21 21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="mu-promo-icon blue">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="mu-promo-text">
          <p className="mu-promo-title">Interested to see how your users create and edit transactions?</p>
          <p className="mu-promo-sub">With User Activity Tracker, you can get full visibility into your user's activities</p>
        </div>
        <button className="mu-btn-track">Track All Activities</button>
      </div>
    </div>
  );
}