import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaSearch, FaChevronDown, FaEllipsisV, FaCog, FaFileExport } from "react-icons/fa";
import QuickSalesReturnSettings from "./Quicksalesreturnsetting";
import "./SalesReturn.css";

const SAMPLE_DATA = [
  { id: 1, date: "05 Mar 2026", number: 3, party: "Aditiya",         invoiceNo: 19, amount: "₹ 3,556",  status: "Unpaid" },
  { id: 2, date: "03 Mar 2026", number: 2, party: "Ramakant Pandit", invoiceNo: 21, amount: "₹ 45,000", status: "Unpaid" },
  { id: 3, date: "03 Mar 2026", number: 1, party: "Ramakant Pandit", invoiceNo: 22, amount: "₹ 21,000", status: "Unpaid" },
];

const SalesReturn = () => {
  const navigate = useNavigate();
  const [dateFilter, setDateFilter]       = useState("Last 365 Days");
  const [showSettings, setShowSettings]   = useState(false);

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="sr-page">

        {/* TOP BAR */}
        <div className="sr-topbar">
          <h2 className="sr-title">Sales Return</h2>
          <div className="sr-topbar-actions">
            <button className="sr-icon-btn" onClick={() => setShowSettings(true)}>
              <FaCog />
            </button>
            <button className="sr-icon-btn"><FaFileExport /></button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="sr-filters">
          <button className="sr-search-btn"><FaSearch /></button>

          <div className="sr-select-wrap">
            <span className="sr-cal-icon">📅</span>
            <select
              className="sr-select"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option>Last 365 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
            <FaChevronDown className="sr-select-arrow" />
          </div>

          <button
            className="sr-create-btn"
            onClick={() => navigate("/sales/create-return")}
          >
            Create Sales Return
          </button>
        </div>

        {/* TABLE */}
        <div className="sr-table-wrap">
          <table className="sr-table">
            <thead>
              <tr>
                <th>Date <span className="sort-arrow">↕</span></th>
                <th>Sales Return Number</th>
                <th>Party Name</th>
                <th>Invoice No</th>
                <th>Amount <span className="sort-arrow">↕</span></th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_DATA.map((row) => (
                <tr key={row.id} className="sr-row">
                  <td>{row.date}</td>
                  <td>{row.number}</td>
                  <td>{row.party}</td>
                  <td>{row.invoiceNo}</td>
                  <td>{row.amount}</td>
                  <td>
                    <span className={`sr-badge sr-badge-${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button className="sr-menu-btn"><FaEllipsisV /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Settings Modal */}
      {showSettings && (
        <QuickSalesReturnSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default SalesReturn;