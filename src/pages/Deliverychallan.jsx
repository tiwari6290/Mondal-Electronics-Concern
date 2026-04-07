import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DeliveryChallan.css";
import Sidebar from "../components/Sidebar/Sidebar";
import { FiSearch, FiSettings, FiMoreVertical, FiChevronDown } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { BsFileEarmarkText } from "react-icons/bs";

/* ── Sample Data ── */
const CHALLANS = [
  { id: 19, date: "01 Mar 2026", party: "Ramakant Pandit", amount: 410.96, status: "Open" },
];

const fmtINR = (n) => "₹ " + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const StatusBadge = ({ status }) => {
  const cls =
    status === "Open"   ? "dc-badge-open"   :
    status === "Closed" ? "dc-badge-closed" :
                          "dc-badge-open";
  return <span className={`dc-badge ${cls}`}>{status}</span>;
};

const DeliveryChallan = () => {
  const navigate = useNavigate();
  const [challanFilter, setChallanFilter] = useState("Show Open Challans");

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main dc-main">

        {/* ── TOP BAR ── */}
        <div className="dc-topbar">
          <h2 className="dc-title">Delivery Challan</h2>
          <div className="dc-topbar-right">
            <button className="dc-icon-btn dc-dot-btn"><FiSettings size={17} /></button>
            <button className="dc-icon-btn"><BsFileEarmarkText size={15} /></button>
          </div>
        </div>

        {/* ── FILTER BAR ── */}
        <div className="dc-filterbar">
          <div className="dc-filter-left">
            <button className="dc-icon-btn"><FiSearch size={15} /></button>
            <button className="dc-filter-date">
              <LuCalendarDays size={14} /> Last 365 Days <FiChevronDown size={12} />
            </button>
            <div className="dc-filter-select-wrap">
              <select
                className="dc-filter-select"
                value={challanFilter}
                onChange={(e) => setChallanFilter(e.target.value)}
              >
                <option>Show Open Challans</option>
                <option>Show Closed Challans</option>
                <option>Show All Challans</option>
              </select>
              <FiChevronDown size={12} className="dc-select-arrow" />
            </div>
          </div>
          <button
            className="dc-create-btn"
            onClick={() => navigate("/sales/create-challan")}
          >
            Create Delivery Challan
          </button>
        </div>

        {/* ── TABLE ── */}
        <div className="dc-table-wrap">
          <table className="dc-table">
            <thead>
              <tr>
                <th>Date <span className="dc-sort">⇅</span></th>
                <th>Delivery Challan Number</th>
                <th>Party Name</th>
                <th>Amount</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {CHALLANS.map((ch) => (
                <tr key={ch.id} className="dc-row">
                  <td>{ch.date}</td>
                  <td>{ch.id}</td>
                  <td>{ch.party}</td>
                  <td>{fmtINR(ch.amount)}</td>
                  <td><StatusBadge status={ch.status} /></td>
                  <td className="dc-td-more">
                    <button className="dc-more"><FiMoreVertical size={15} /></button>
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

export default DeliveryChallan;
