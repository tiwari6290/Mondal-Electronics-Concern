import { useState, useRef, useEffect } from "react";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import "./AllTransactions.css";

const AllTransactions = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [selected, setSelected] = useState("Last 365 Days");

  const dropdownRef = useRef(null);

  const options = [
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "Last 7 Days",
    "This Month",
    "Previous Month",
    "Last 30 Days",
    "This Quarter",
    "Previous Quarter",
    "Current Fiscal Year",
    "Previous Fiscal Year",
    "Last 365 Days"
  ];

  const data = [
    { date: "10 Mar 2026", txn: 4, type: "Purchase Invoices", party: "Aditya", amount: "₹ 0" },
    { date: "10 Mar 2026", txn: 5, type: "Credit Note", party: "Saktiman", amount: "₹ 256" },
    { date: "10 Mar 2026", txn: 29, type: "Sales Invoices", party: "Saktiman", amount: "₹ 256" },
    { date: "10 Mar 2026", txn: 13, type: "Payment In", party: "Saktiman", amount: "₹ 10,000" },
    { date: "09 Mar 2026", txn: 8, type: "Payment In", party: "tripathi", amount: "₹ 34,020" }
  ];

  /* 🔥 CLICK OUTSIDE LOGIC */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="main">

        <Header />

        <div className="all-transactions">

          <h2>All Transactions</h2>

          {/* FILTER BAR */}
          <div className="filter-bar">

            <input placeholder="Search..." />

            {/* CUSTOM DROPDOWN */}
            <div className="custom-dropdown" ref={dropdownRef}>

              <div
                className={`dropdown-header ${openFilter ? "open" : ""}`}
                onClick={() => setOpenFilter(!openFilter)}
              >
                <div className="filter-left">
                  <FaCalendarAlt />
                  <span>{selected}</span>
                </div>

                <FaChevronDown className="dropdown-arrow" />
              </div>

              {openFilter && (
                <div className="dropdown-list">
                  {options.map((item, index) => (
                    <div
                      key={index}
                      className={`dropdown-item ${
                        selected === item ? "active-item" : ""
                      }`}
                      onClick={() => {
                        setSelected(item);
                        setOpenFilter(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>

          {/* TABLE */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction Number</th>
                  <th>Type</th>
                  <th>Party Name</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.txn}</td>
                    <td>{item.type}</td>
                    <td>{item.party}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AllTransactions;