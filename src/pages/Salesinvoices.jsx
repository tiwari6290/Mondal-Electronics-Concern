import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SalesInvoices.css";
import Sidebar from "../components/Sidebar/Sidebar";
import QuickInvoiceSettings from "../pages/Quickinvoicesettings";
import { FiSearch, FiSettings, FiMoreVertical, FiChevronDown } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { BsFileEarmarkText } from "react-icons/bs";

/* ── Sample Data ── */
const INVOICES = [
  { id: 29, date: "10 Mar 2026", party: "Saktiman",        dueIn: "-",      amount: 256,   unpaid: null,  status: "Paid"           },
  { id: 28, date: "10 Mar 2026", party: "abv",             dueIn: "-",      amount: 512,   unpaid: null,  status: "Paid"           },
  { id: 27, date: "09 Mar 2026", party: "tripathi",        dueIn: "-",      amount: 34020, unpaid: null,  status: "Paid"           },
  { id: 26, date: "09 Mar 2026", party: "anando",          dueIn: "-",      amount: 69600, unpaid: null,  status: "Paid"           },
  { id: 25, date: "06 Mar 2026", party: "Aditiya",         dueIn: "-",      amount: 512,   unpaid: null,  status: "Paid"           },
  { id: 24, date: "06 Mar 2026", party: "Saktiman",        dueIn: "-",      amount: 256,   unpaid: null,  status: "Paid"           },
  { id: 23, date: "06 Mar 2026", party: "Saktiman",        dueIn: "2 Days", amount: 42768, unpaid: 31768, status: "Partially Paid" },
  { id: 22, date: "03 Mar 2026", party: "Ramakant Pandit", dueIn: "-",      amount: 21000, unpaid: null,  status: "Paid"           },
  { id: 21, date: "03 Mar 2026", party: "Ramakant Pandit", dueIn: "-",      amount: 45000, unpaid: null,  status: "Paid"           },
];

const fmtINR = (n) => "₹ " + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 1 });

const StatusBadge = ({ status }) => {
  const cls =
    status === "Paid"           ? "si-badge-paid"     :
    status === "Partially Paid" ? "si-badge-partial"  :
    status === "Unpaid"         ? "si-badge-unpaid"   :
                                  "si-badge-cancelled";
  return <span className={`si-badge ${cls}`}>{status}</span>;
};

const SalesInvoices = () => {
  const navigate = useNavigate();
  const [selected,     setSelected]     = useState([]);
  const [showSettings, setShowSettings] = useState(false);   // ← added

  const toggleRow = (id) =>
    setSelected((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const toggleAll = () =>
    setSelected(selected.length === INVOICES.length ? [] : INVOICES.map((i) => i.id));

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main si-main">

        {/* TOP BAR */}
        <div className="si-topbar">
          <h2 className="si-title">Sales Invoices</h2>
          <div className="si-topbar-right">
            <button className="si-reports-btn">
              <TbReportAnalytics size={15} /> Reports <FiChevronDown size={12} />
            </button>
            {/* ← onClick opens the same settings popup */}
            <button className="si-icon-btn si-dot-btn" onClick={() => setShowSettings(true)}>
              <FiSettings size={16} />
            </button>
            <button className="si-icon-btn"><BsFileEarmarkText size={15} /></button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="si-cards">
          <div className="si-card si-card-active">
            <div className="si-card-label">
              <HiOutlineCurrencyRupee size={14} className="si-icon-indigo" /> Total Sales
            </div>
            <div className="si-card-value">₹ 15,83,929.3</div>
          </div>
          <div className="si-card">
            <div className="si-card-label"><span className="si-dot si-green" /> Paid</div>
            <div className="si-card-value">₹ 14,28,160.3</div>
          </div>
          <div className="si-card">
            <div className="si-card-label"><span className="si-dot si-red" /> Unpaid</div>
            <div className="si-card-value">₹ 1,55,769</div>
          </div>
          <div className="si-card">
            <div className="si-card-label">
              <MdOutlineCancel size={13} className="si-icon-red" /> Cancelled
            </div>
            <div className="si-card-value">₹ –</div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="si-filterbar">
          <div className="si-filter-left">
            <button className="si-icon-btn"><FiSearch size={15} /></button>
            <button className="si-filter-date">
              <LuCalendarDays size={14} /> Last 365 Days <FiChevronDown size={12} />
            </button>
          </div>
          <div className="si-filter-right">
            <button className="si-bulk-btn">
              <RiCheckboxMultipleLine size={14} /> Bulk Actions <FiChevronDown size={12} />
            </button>
            <button
              className="si-create-btn"
              onClick={() => navigate("/sales/create-invoice")}
            >
              Create Sales Invoice
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="si-table-wrap">
          <table className="si-table">
            <thead>
              <tr>
                <th className="si-th-check">
                  <input
                    type="checkbox"
                    className="si-cb"
                    checked={selected.length === INVOICES.length}
                    onChange={toggleAll}
                  />
                </th>
                <th>Date <span className="si-sort">⇅</span></th>
                <th>Invoice Number</th>
                <th>Party Name</th>
                <th>Due In</th>
                <th>Amount <span className="si-sort">⇅</span></th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr
                  key={inv.id}
                  className={`si-row ${selected.includes(inv.id) ? "si-row-sel" : ""}`}
                >
                  <td className="si-td-check">
                    <input
                      type="checkbox"
                      className="si-cb"
                      checked={selected.includes(inv.id)}
                      onChange={() => toggleRow(inv.id)}
                    />
                  </td>
                  <td>{inv.date}</td>
                  <td>{inv.id}</td>
                  <td>{inv.party}</td>
                  <td>{inv.dueIn}</td>
                  <td>
                    <div className="si-amt-col">
                      <span>{fmtINR(inv.amount)}</span>
                      {inv.unpaid && (
                        <span className="si-unpaid">
                          (₹ {Number(inv.unpaid).toLocaleString("en-IN")} unpaid)
                        </span>
                      )}
                    </div>
                  </td>
                  <td><StatusBadge status={inv.status} /></td>
                  <td className="si-td-more">
                    <button className="si-more"><FiMoreVertical size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* QUICK INVOICE SETTINGS MODAL — same as CreateSalesInvoice */}
      {showSettings && (
        <QuickInvoiceSettings onClose={() => setShowSettings(false)} />
      )}

    </div>
  );
};

export default SalesInvoices;