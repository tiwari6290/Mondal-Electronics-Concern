import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import "./PurchaseInvoice.css";
import {
  ChevronDown, Settings, Plus, Search, Calendar,
  MessageSquare, BarChart2, RefreshCcw,
} from "lucide-react";
import { FaEllipsisV } from "react-icons/fa";

const PurchaseInvoicesList = () => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState("Last 365 Days");

  const SAMPLE_DATA = [
    { id: 1, date: "10 Mar 2026", number: 4, party: "Aditiya",   dueIn: "-", amount: "₹ 0",      amountSub: "",                  status: ""       },
    { id: 2, date: "03 Mar 2026", number: 3, party: "anando",    dueIn: "-", amount: "₹ 38,000", amountSub: "(₹ 38,000 unpaid)", status: "Unpaid" },
    { id: 3, date: "03 Mar 2026", number: 2, party: "Cash Sale", dueIn: "-", amount: "₹ 0",      amountSub: "",                  status: ""       },
    { id: 4, date: "02 Mar 2026", number: 1, party: "anando",    dueIn: "-", amount: "₹ 0",      amountSub: "",                  status: ""       },
  ];

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <main className="pi-main">

          {/* Topbar */}
          <div className="pi-topbar">
            <h1 className="pi-title">Purchase Invoices</h1>
            <div className="pi-topbar-actions">
              <button className="pi-reports-btn">
                <BarChart2 size={15} />
                <span>Reports</span>
                <ChevronDown size={12} />
              </button>
              <button className="pi-icon-sq"><Settings size={15} /></button>
              <button className="pi-icon-sq"><MessageSquare size={15} /></button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="pi-cards">
            <div className="pi-card pi-card--total">
              <div className="pi-card-header">
                <RefreshCcw size={13} className="pi-card-icon-total" />
                <span>Total Purchases</span>
              </div>
              <div className="pi-card-amount">₹ 38,000</div>
            </div>
            <div className="pi-card pi-card--paid">
              <div className="pi-card-header">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pi-card-icon-paid">
                  <circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" />
                </svg>
                <span>Paid</span>
              </div>
              <div className="pi-card-amount">₹ 0</div>
            </div>
            <div className="pi-card pi-card--unpaid">
              <div className="pi-card-header">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pi-card-icon-unpaid">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>Unpaid</span>
              </div>
              <div className="pi-card-amount">₹ 38,000</div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="pi-filterbar">
            <button className="pi-search-btn"><Search size={14} /></button>
            <div className="pi-date-select-wrap">
              <Calendar size={13} className="pi-date-cal" />
              <select
                className="pi-date-select"
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
              >
                <option>Last 365 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
              <ChevronDown size={11} className="pi-date-chev" />
            </div>
            <div className="pi-filterbar-spacer" />
            <button
              className="pi-create-btn"
              onClick={() => navigate("/purchase-invoices/create")}
            >
              Create Purchase Invoice
            </button>
          </div>

          {/* Table */}
          <div className="pi-table-wrap">
            <table className="pi-table">
              <thead>
                <tr>
                  <th>Date <span className="pi-sort">↕</span></th>
                  <th>Purchase Invoice Number</th>
                  <th>Party Name</th>
                  <th>Due In</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_DATA.map(row => (
                  <tr key={row.id} className="pi-row">
                    <td>{row.date}</td>
                    <td>{row.number}</td>
                    <td>{row.party}</td>
                    <td>{row.dueIn}</td>
                    <td>
                      <div>{row.amount}</div>
                      {row.amountSub && <div className="pi-amount-sub">{row.amountSub}</div>}
                    </td>
                    <td>
                      {row.status && (
                        <span className={`pi-badge pi-badge--${row.status.toLowerCase()}`}>
                          {row.status}
                        </span>
                      )}
                    </td>
                    <td><button className="pi-menu-btn"><FaEllipsisV /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
};

export default PurchaseInvoicesList;