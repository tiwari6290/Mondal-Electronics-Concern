import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import QuickQuotationSettings from "../pages/QuickQuotationSettings";
import {
  FaSearch, FaChevronDown, FaEllipsisV, FaCog, FaFileExport,
} from "react-icons/fa";
import "./Quotation.css";

const SAMPLE_DATA = [
  { id: 1, date: "28 Feb 2026", number: 4, party: "MONDAL ELECTRONIC", dueIn: "-", amount: "₹ 38,540", status: "Open" },
  { id: 2, date: "27 Feb 2026", number: 3, party: "Cash Sale",          dueIn: "-", amount: "₹ 0",      status: "Open" },
];

const Quotation = () => {
  const navigate = useNavigate();
  const [dateFilter,   setDateFilter]   = useState("Last 365 Days");
  const [statusFilter, setStatusFilter] = useState("Show Open Quotation");

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="quotation-page">

        {/* TOP BAR */}
        <div className="qp-topbar">
          <h2 className="qp-title">Quotation / Estimate</h2>
          <div className="qp-topbar-actions">
            <button className="icon-btn">
              <FaCog />
              <span className="notif-dot" />
            </button>
            <button className="icon-btn"><FaFileExport /></button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="qp-filters">
          <button className="qp-search-icon-btn">
            <FaSearch />
          </button>

          <div className="qp-select-wrap">
            <span className="qp-cal-icon">📅</span>
            <select className="qp-select" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
              <option>Last 365 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
            <FaChevronDown className="qp-select-arrow" />
          </div>

          <div className="qp-select-wrap">
            <select className="qp-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>Show Open Quotation</option>
              <option>Show All Quotation</option>
              <option>Show Closed Quotation</option>
            </select>
            <FaChevronDown className="qp-select-arrow" />
          </div>

          <button className="qp-create-btn" onClick={() => navigate("/sales/create-quotation")}>
            Create Quotation
          </button>
        </div>

        {/* TABLE */}
        <div className="qp-table-wrap">
          <table className="qp-table">
            <thead>
              <tr>
                <th>Date <span className="sort-arrow">↕</span></th>
                <th>Quotation Number</th>
                <th>Party Name</th>
                <th>Due In</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_DATA.map((q) => (
                <tr key={q.id} className="qp-row">
                  <td>{q.date}</td>
                  <td>{q.number}</td>
                  <td>{q.party}</td>
                  <td>{q.dueIn}</td>
                  <td>{q.amount}</td>
                  <td>
                    <span className={`status-badge status-${q.status.toLowerCase()}`}>
                      {q.status}
                    </span>
                  </td>
                  <td>
                    <button className="row-menu-btn"><FaEllipsisV /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Quotation;