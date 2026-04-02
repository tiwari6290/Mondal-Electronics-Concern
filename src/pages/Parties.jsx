import "./Parties.css";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaEllipsisV,
  FaUsers,
  FaLink,
  FaChartBar,
  FaChevronDown,
  FaCog,
  FaKeyboard,
  FaLayerGroup
} from "react-icons/fa";

const Parties = () => {

  const navigate = useNavigate();

  const [openReports, setOpenReports] = useState(false);
  const reportRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (reportRef.current && !reportRef.current.contains(e.target)) {
        setOpenReports(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const data = [
    { name: "abv", mobile: "-", type: "Customer", balance: "₹ 0" },
    { name: "Aditya", mobile: "8899554466", type: "Customer", balance: "↑ ₹ 3,556" },
    { name: "anando", mobile: "0987643211", type: "Customer", balance: "↓ ₹ 43,744" },
    { name: "Cash Sale", mobile: "9555780835", type: "Customer", balance: "₹ 0" },
    { name: "eghwh", mobile: "7621583903", type: "Supplier", balance: "↓ ₹ 33,000" },
    { name: "MONDAL ELECTRONIC", mobile: "7003236738", type: "Customer", balance: "₹ 0" },
    { name: "ram ram", mobile: "8392470783", type: "Customer", balance: "↓ ₹ 9,000" },
    { name: "Ramakant Pandit", mobile: "7788991455", type: "Customer", balance: "↑ ₹ 66,000" }
  ];

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="main">

        <div className="parties">

          {/* HEADER */}
          <div className="parties-header">

            <h2>Parties</h2>

            <div className="header-actions">

              <button className="outline-btn icon-btn-flex">
                <FaLink />
                <span>SharedLedger Portal</span>
              </button>

              {/* REPORT DROPDOWN */}
              <div className="reports-wrapper" ref={reportRef}>
                <button
                  className={`reports-btn ${openReports ? "active" : ""}`}
                  onClick={() => setOpenReports(!openReports)}
                >
                  <FaChartBar />
                  <span>Reports</span>
                  <FaChevronDown />
                </button>

                {openReports && (
                  <div className="reports-dropdown">
                    <div className="dropdown-item">Partywise Outstanding</div>
                    <div className="dropdown-item">Item Report By Party</div>
                    <div className="dropdown-item">Receivable Ageing Report</div>
                  </div>
                )}
              </div>

              <button className="square-btn">
                <FaCog />
              </button>

              <button className="square-btn">
                <FaKeyboard />
              </button>

            </div>
          </div>

          {/* CARDS */}
          <div className="cards">

            <div className="card active">
              <p><FaUsers /> All Parties</p>
              <h3>13</h3>
            </div>

            <div className="card">
              <p className="green">To Collect</p>
              <h3>₹ 3,52,702</h3>
            </div>

            <div className="card">
              <p className="red">To Pay</p>
              <h3>₹ 69,556</h3>
            </div>

          </div>

          {/* FILTER */}
          <div className="filter-bar">

            <div className="search-box">
              <FaSearch />
              <input placeholder="Search Categories" />
            </div>

            <div className="right-actions">

              <button className="bulk-btn">
                <FaLayerGroup />
                <span>Bulk Action</span>
                <FaChevronDown />
              </button>

              {/* ✅ UPDATED BUTTON */}
              <button
                className="primary-btn"
                onClick={() => navigate("/create-party")}
              >
                Create Party
              </button>

            </div>

          </div>

          {/* TABLE */}
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Party Name</th>
                  <th>Category</th>
                  <th>Mobile Number</th>
                  <th>Party type</th>
                  <th>Balance</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>-</td>
                    <td>{item.mobile}</td>
                    <td>{item.type}</td>

                    <td
                      className={
                        item.balance.includes("↑")
                          ? "up"
                          : item.balance.includes("↓")
                          ? "down"
                          : ""
                      }
                    >
                      {item.balance}
                    </td>

                    <td>
                      <FaEllipsisV />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FLOAT BUTTON */}
          <div className="floating-btn">
            Pending Actions <span>3</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Parties;