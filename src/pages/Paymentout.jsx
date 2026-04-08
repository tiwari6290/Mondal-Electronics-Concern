import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Paymentout.css";

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
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
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
const ShoppingCartXIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    <line x1="17" y1="9" x2="22" y2="14"/><line x1="22" y1="9" x2="17" y2="14"/>
  </svg>
);

export default function PaymentOutList() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <Sidebar />
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
          <button className="btn-primary" onClick={() => navigate("/payment-out/create")}>
            Create Payment Out
          </button>
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
    </div>
  );
}