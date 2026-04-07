import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreditNote.css";
import Sidebar from "../components/Sidebar/Sidebar";
import QuickCreditNoteSettings from "../pages/Quickcreditnotesettings";
import { FiSearch, FiSettings, FiMoreVertical, FiChevronDown } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { BsFileEarmarkText } from "react-icons/bs";

/* ── Sample Data ── */
const CREDIT_NOTES = [
  { id: 5, date: "10 Mar 2026", party: "Saktiman",  invoiceNo: 29, amount: 256,   status: "Refunded" },
  { id: 4, date: "10 Mar 2026", party: "Saktiman",  invoiceNo: 24, amount: 256,   status: "Refunded" },
  { id: 3, date: "05 Mar 2026", party: "anando",    invoiceNo: 18, amount: 42000, status: "Refunded" },
  { id: 2, date: "02 Mar 2026", party: "Cash Sale", invoiceNo: "-", amount: 256,  status: "Refunded" },
  { id: 1, date: "02 Mar 2026", party: "anando",    invoiceNo: "-", amount: 256,  status: "Unpaid"   },
];

const fmtINR = (n) => "₹ " + Number(n).toLocaleString("en-IN");

const StatusBadge = ({ status }) => {
  const cls = status === "Refunded" ? "cn-badge-refunded" : "cn-badge-unpaid";
  return <span className={`cn-badge ${cls}`}>{status}</span>;
};

const CreditNote = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main cn-main">

        {/* ── TOP BAR ── */}
        <div className="cn-topbar">
          <div className="cn-topbar-left">
            {/* Business name tooltip shown on hover of profile */}
            <span className="cn-biz-name">Mondal Electronics Concern</span>
          </div>
          <div className="cn-topbar-right">
            <button className="cn-icon-btn" onClick={() => setShowSettings(true)}><FiSettings size={17} /></button>
            <button className="cn-icon-btn"><BsFileEarmarkText size={15} /></button>
          </div>
        </div>

        {/* ── FILTER BAR ── */}
        <div className="cn-filterbar">
          <div className="cn-filter-left">
            <button className="cn-icon-btn"><FiSearch size={15} /></button>
            <button className="cn-filter-date">
              <LuCalendarDays size={14} /> Last 365 Days <FiChevronDown size={12} />
            </button>
          </div>
          <button
            className="cn-create-btn"
            onClick={() => navigate("/sales/create-credit-note")}
          >
            Create Credit Note
          </button>
        </div>

        {/* ── TABLE ── */}
        <div className="cn-table-wrap">
          <table className="cn-table">
            <thead>
              <tr>
                <th>Date <span className="cn-sort">⇅</span></th>
                <th>Credit Note Number</th>
                <th>Party Name</th>
                <th>Invoice No</th>
                <th>Amount</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {CREDIT_NOTES.map((cn) => (
                <tr key={cn.id} className="cn-row">
                  <td>{cn.date}</td>
                  <td>{cn.id}</td>
                  <td>{cn.party}</td>
                  <td>{cn.invoiceNo}</td>
                  <td>{fmtINR(cn.amount)}</td>
                  <td><StatusBadge status={cn.status} /></td>
                  <td className="cn-td-more">
                    <button className="cn-more"><FiMoreVertical size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {showSettings && (
        <QuickCreditNoteSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default CreditNote;
