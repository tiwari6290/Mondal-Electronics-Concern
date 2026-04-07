import React, { useState } from "react";
import {
  Plus,
  ArrowRightLeft,
  Building2,
  CalendarDays,
  ChevronDown,
  Download,
  Landmark,
  X,
} from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Cash.css";

const today = new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

// ─── Adjust Balance Modal ────────────────────────────────────────────────────
function AdjustBalanceModal({ onClose }) {
  const [mode, setMode] = useState("add");
  const [amount, setAmount] = useState("");
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState("");

  const newBalance = mode === "add"
    ? (parseFloat(amount) || 0)
    : -(parseFloat(amount) || 0);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Adjust Balance</span>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-body">
          <label className="modal-label">Adjust money in</label>
          <div className="modal-select">
            <span>Cash</span>
            <ChevronDown size={15} />
          </div>

          <label className="modal-label" style={{ marginTop: 18 }}>Add or Reduce</label>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${mode === "add" ? "active-add" : ""}`}
              onClick={() => setMode("add")}
            >+ Add Money</button>
            <button
              className={`toggle-btn ${mode === "reduce" ? "active-reduce" : ""}`}
              onClick={() => setMode("reduce")}
            >- Reduce Money</button>
          </div>

          <div className="modal-row">
            <div>
              <label className="modal-label">Current Balance</label>
              <p className="modal-value">₹ 0</p>
            </div>
            <div>
              <label className="modal-label">Date</label>
              <div className="date-pill">
                <CalendarDays size={13} />
                <span>{today}</span>
                <ChevronDown size={13} />
              </div>
            </div>
          </div>

          <label className="modal-label modal-label-accent">Enter Amount</label>
          <div className="amount-input-wrapper">
            <span className="amount-prefix">{mode === "add" ? "+ ₹" : "- ₹"}</span>
            <input
              className="amount-input"
              type="number"
              placeholder=""
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
            />
          </div>
          <div className="amount-underline" />

          <p className="new-balance-label">
            New balance{amount ? <>&nbsp;<strong>₹ {newBalance}</strong></> : ""}
          </p>

          {!showRemarks ? (
            <button className="add-remarks-btn" onClick={() => setShowRemarks(true)}>
              + Add Remarks
            </button>
          ) : (
            <>
              <label className="modal-label" style={{ marginTop: 14 }}>Remarks</label>
              <textarea
                className="remarks-textarea"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
              />
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save">Save</button>
        </div>
      </div>
    </div>
  );
}

// ─── Transfer Balance Modal ──────────────────────────────────────────────────
function TransferBalanceModal({ onClose }) {
  const [amount, setAmount] = useState("");
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState("");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Transfer Balance</span>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-body">
          <label className="modal-label">Transfer money from</label>
          <div className="modal-select">
            <span>Cash</span>
            <ChevronDown size={15} />
          </div>

          <label className="modal-label" style={{ marginTop: 18 }}>Transfer money to</label>
          <div className="modal-select">
            <span className="placeholder-text">Select account</span>
            <ChevronDown size={15} />
          </div>

          <div className="modal-row" style={{ marginTop: 18 }}>
            <div>
              <label className="modal-label">Current Balance</label>
              <p className="modal-value">₹ 0</p>
            </div>
            <div>
              <label className="modal-label">Date</label>
              <div className="date-pill">
                <CalendarDays size={13} />
                <span>{today}</span>
                <ChevronDown size={13} />
              </div>
            </div>
          </div>

          <label className="modal-label modal-label-accent" style={{ marginTop: 18 }}>Enter Amount</label>
          <div className="amount-input-wrapper">
            <span className="amount-prefix">₹</span>
            <input
              className="amount-input"
              type="number"
              placeholder=""
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
            />
          </div>
          <div className="amount-underline" />

          {!showRemarks ? (
            <button className="add-remarks-btn" onClick={() => setShowRemarks(true)}>
              + Add Remarks
            </button>
          ) : (
            <>
              <label className="modal-label" style={{ marginTop: 14 }}>Remarks</label>
              <textarea
                className="remarks-textarea"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
              />
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save">Save</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Cash() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [modal, setModal] = useState(null);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="topbar">
          <h1 className="page-title">Cash and Bank</h1>
          <div className="topbar-actions">
            <button className="btn-outline" onClick={() => setModal("adjust")}>
              <Plus size={15} />
              Add/Reduce Money
            </button>
            <button className="btn-outline" onClick={() => setModal("transfer")}>
              <ArrowRightLeft size={15} />
              Transfer Money
            </button>
            <button className="btn-primary">
              <Plus size={15} />
              Add New Account
            </button>
          </div>
        </div>

        <div className="content-body">
          <div className="accounts-panel">
            <div className="total-balance-row">
              <span className="total-balance-label">Total Balance:</span>
              <span className="total-balance-amount">₹0</span>
            </div>

            <div className="account-section-header">
              <span>Cash</span>
            </div>

            <div
              className={`account-item ${selectedAccount === "cash" ? "selected" : ""}`}
              onClick={() => setSelectedAccount("cash")}
            >
              <span className="account-item-label">Cash in hand</span>
              <span className="account-item-amount">₹0</span>
            </div>

            <div className="account-section-header">
              <span>Bank Accounts</span>
              <button className="add-bank-btn">
                <Plus size={12} /> Add New Bank
              </button>
            </div>

            <div
              className={`account-item unlinked ${selectedAccount === "unlinked" ? "selected" : ""}`}
              onClick={() => setSelectedAccount("unlinked")}
            >
              <Building2 size={16} className="account-bank-icon" />
              <span className="account-item-label">Unlinked Transactions</span>
              <span className="account-item-amount">₹0</span>
            </div>
          </div>

          <div className="transactions-panel">
            <div className="tabs-row">
              <button className="tab active">Transactions</button>
            </div>

            <div className="filter-row">
              <div className="date-filter">
                <CalendarDays size={14} className="filter-icon" />
                <span>Last 30 Days</span>
                <ChevronDown size={14} />
              </div>
              <button className="download-btn">
                <Download size={15} />
              </button>
            </div>

            <div className="empty-state">
              <div className="empty-icon-wrapper">
                <Landmark size={48} className="empty-icon" strokeWidth={1.2} />
              </div>
              <p className="empty-title">No Transactions</p>
              <p className="empty-subtitle">
                Your don't have any transaction in selected period
              </p>
            </div>
          </div>
        </div>
      </main>

      {modal === "adjust" && <AdjustBalanceModal onClose={() => setModal(null)} />}
      {modal === "transfer" && <TransferBalanceModal onClose={() => setModal(null)} />}
    </div>
  );
}