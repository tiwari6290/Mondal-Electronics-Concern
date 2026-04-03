import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentIn.css";
import Sidebar from "../components/Sidebar/Sidebar";
import { FiSearch, FiSettings, FiMoreVertical, FiChevronDown } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { BsFileEarmarkText } from "react-icons/bs";

/* ── Sample Data ── */
const PAYMENTS = [
  { id: 13, date: "10 Mar 2026", party: "Saktiman",          settled: 10000,  received: 10000,  mode: "Cash"           },
  { id: 12, date: "10 Mar 2026", party: "Saktiman",          settled: 1000,   received: 1000,   mode: "Cash"           },
  { id: 11, date: "10 Mar 2026", party: "sumon",             settled: 8999,   received: 8999,   mode: "Cash"           },
  { id: 10, date: "10 Mar 2026", party: "Aditiya",           settled: 512,    received: 512,    mode: "Cash"           },
  { id:  9, date: "10 Mar 2026", party: "abv",               settled: 512,    received: 512,    mode: "Cash"           },
  { id:  8, date: "09 Mar 2026", party: "tripathi",          settled: 34020,  received: 34010,  mode: "Cash + Discount"},
  { id:  7, date: "09 Mar 2026", party: "anando",            settled: 19600,  received: 19600,  mode: "Cash"           },
  { id:  6, date: "03 Mar 2026", party: "Ramakant Pandit",   settled: 46000,  received: 46000,  mode: "Cash"           },
  { id:  5, date: "02 Mar 2026", party: "MONDAL ELECTRONIC", settled: 256,    received: 256,    mode: "Cheque"         },
  { id:  4, date: "28 Feb 2026", party: "ranjan",            settled: 369875, received: 369875, mode: "Cash"           },
];

const fmtINR = (n) => "₹ " + Number(n).toLocaleString("en-IN");

const PaymentIn = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main pi-main">

        {/* ── TOP BAR ── */}
        <div className="pi-topbar">
          <h2 className="pi-title">Payment In</h2>
          <div className="pi-topbar-right">
            <button className="pi-icon-btn"><FiSettings size={17} /></button>
            <button className="pi-icon-btn"><BsFileEarmarkText size={15} /></button>
          </div>
        </div>

        {/* ── TAB BAR ── */}
        <div className="pi-tabs">
          <button className="pi-tab pi-tab-active">
             Payment Received
          </button>
        </div>

        {/* ── FILTER BAR ── */}
        <div className="pi-filterbar">
          <div className="pi-filter-left">
            <button className="pi-icon-btn"><FiSearch size={15} /></button>
            <button className="pi-filter-date">
              <LuCalendarDays size={14} /> Last 365 Days <FiChevronDown size={12} />
            </button>
          </div>
          <button
            className="pi-create-btn"
            onClick={() => navigate("/sales/create-payment-in")}
          >
            Create Payment In
          </button>
        </div>

        {/* ── TABLE ── */}
        <div className="pi-table-wrap">
          <table className="pi-table">
            <thead>
              <tr>
                <th>Date <span className="pi-sort">⇅</span></th>
                <th>Payment Number</th>
                <th>Party Name</th>
                <th>Total Amount Settled</th>
                <th>Amount Received</th>
                <th>Payment Mode</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {PAYMENTS.map((p) => (
                <tr key={p.id} className="pi-row">
                  <td>{p.date}</td>
                  <td>{p.id}</td>
                  <td>{p.party}</td>
                  <td>{fmtINR(p.settled)}</td>
                  <td>{fmtINR(p.received)}</td>
                  <td>{p.mode}</td>
                  <td className="pi-td-more">
                    <button className="pi-more"><FiMoreVertical size={15} /></button>
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

export default PaymentIn;
