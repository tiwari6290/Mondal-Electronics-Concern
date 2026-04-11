import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProformaInvoice.css";
import Sidebar from "../components/Sidebar/Sidebar";
import { FiSearch, FiSettings, FiMoreVertical, FiChevronDown } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { BsFileEarmarkText } from "react-icons/bs";
import QuickProformaSettings from "./Quickproformainvoicesetting";

/* ── Sample Data ── */
const PROFORMA = [
  { id: 2, date: "02 Mar 2026", party: "Cash Sale", dueIn: "-",                 amount: 256, status: "Open" },
  { id: 1, date: "02 Mar 2026", party: "anando",    dueIn: "Overdue by 4 days", amount: 256, status: "Open" },
];

const fmtINR = (n) => "₹ " + Number(n).toLocaleString("en-IN");

const ProformaInvoice = () => {
  const navigate = useNavigate();
  const [invoiceFilter, setInvoiceFilter] = useState("Show Open Invoices");
  const [showSettings,  setShowSettings]  = useState(false);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main pfi-main">

        {/* ── TOP BAR ── */}
        <div className="pfi-topbar">
          <h2 className="pfi-title">Proforma Invoice</h2>
          <div className="pfi-topbar-right">
            <button className="pfi-icon-btn pfi-dot-btn" onClick={() => setShowSettings(true)}>
              <FiSettings size={17} />
            </button>
            <button className="pfi-icon-btn"><BsFileEarmarkText size={15} /></button>
          </div>
        </div>

        {/* ── FILTER BAR ── */}
        <div className="pfi-filterbar">
          <div className="pfi-filter-left">
            <button className="pfi-icon-btn"><FiSearch size={15} /></button>

            <button className="pfi-filter-date">
              <LuCalendarDays size={14} /> Last 365 Days <FiChevronDown size={12} />
            </button>

            <div className="pfi-select-wrap">
              <select
                className="pfi-select"
                value={invoiceFilter}
                onChange={(e) => setInvoiceFilter(e.target.value)}
              >
                <option>Show Open Invoices</option>
                <option>Show Closed Invoices</option>
                <option>Show All Invoices</option>
              </select>
              <FiChevronDown size={12} className="pfi-select-arrow" />
            </div>
          </div>

          <button
            className="pfi-create-btn"
            onClick={() => navigate("/sales/create-proforma")}
          >
            Create Proforma Invoice
          </button>
        </div>

        {/* ── TABLE ── */}
        <div className="pfi-table-wrap">
          <table className="pfi-table">
            <thead>
              <tr>
                <th>Date <span className="pfi-sort">⇅</span></th>
                <th>Performa Invoice Number</th>
                <th>Party Name</th>
                <th>Due In</th>
                <th>Amount</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {PROFORMA.map((pf) => (
                <tr key={pf.id} className="pfi-row">
                  <td>{pf.date}</td>
                  <td>{pf.id}</td>
                  <td>{pf.party}</td>
                  <td className={pf.dueIn.startsWith("Overdue") ? "pfi-overdue" : ""}>
                    {pf.dueIn}
                  </td>
                  <td>{fmtINR(pf.amount)}</td>
                  <td><span className="pfi-badge pfi-badge-open">{pf.status}</span></td>
                  <td className="pfi-td-more">
                    <button className="pfi-more"><FiMoreVertical size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Settings Modal */}
      {showSettings && (
        <QuickProformaSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default ProformaInvoice;