import "./Sidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaFileInvoice,
  FaChartBar,
  FaUniversity,
  FaFileAlt,
  FaMoneyBill,
  FaReceipt,
  FaDesktop,
  FaCog,
  FaChevronDown,
  FaUserFriends,
  FaSms,
  FaCalendarCheck,

  // Dropdown icons
  FaUserPlus,
  FaBoxOpen,
  FaFileInvoiceDollar,
  FaUndo,
  FaTruck,
  FaClipboardList,
  FaShoppingBag,
  FaMoneyCheck
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [openItems, setOpenItems] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);

  return (
    <div className="sidebar">

      {/* PROFILE */}
      <div className="profile">
        <div>
          <h4>Mondal Electronic...</h4>
          <p>9555780835</p>
        </div>
        <FaCog
        onClick={() => navigate("/settings")}
        style={{ cursor: "pointer" }}
      />
      </div>

      {/* CREATE INVOICE */}
      <div className="invoice-box">
        <div
          className="invoice-btn"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <span>+ Create Sales Invoice</span>
          <FaChevronDown className={openDropdown ? "rotate" : ""} />
        </div>

        {/*  FULL DROPDOWN */}
        {openDropdown && (
          <div className="dropdown-panel">

            {/* GENERAL */}
            <p className="dropdown-title">GENERAL</p>
            <ul>
              <li><FaUserPlus /> Create Party</li>
              <li><FaBoxOpen /> Create Item</li>
            </ul>

            {/* SALES */}
            <p className="dropdown-title">SALES TRANSACTIONS</p>
            <ul>
              <li><FaFileInvoiceDollar /> Quotation</li>
              <li><FaMoneyBill /> Payment In</li>
              <li><FaUndo /> Sales Return</li>
              <li><FaFileAlt /> Credit Note</li>
              <li><FaTruck /> Delivery Challan</li>
              <li><FaClipboardList /> Proforma Invoice</li>
            </ul>

            {/* PURCHASE */}
            <p className="dropdown-title">PURCHASE TRANSACTIONS</p>
            <ul>
              <li><FaShoppingBag /> Purchase</li>
              <li><FaMoneyCheck /> Payment Out</li>
              <li><FaUndo /> Purchase Return</li>
              <li><FaFileAlt /> Debit Note</li>
              <li><FaClipboardList /> Purchase Orders</li>
            </ul>

            {/* EXPENSE */}
            <ul>
              <li><FaUserPlus /> Create Expense</li>
            </ul>

          </div>
        )}
      </div>

      {/* SALE */}
      <div className="sale-banner">
        <span className="sale-tag">SALE</span>
        <span>Plans and Pricing</span>
        <span className="trial">Trial Expired</span>
      </div>

      {/* MENU */}
      <div className="menu">

        <p className="section">GENERAL</p>

        <ul>
          <li className="active"><FaTachometerAlt /> Dashboard</li>
          <li><FaUsers /> Parties</li>

          <li onClick={() => setOpenItems(!openItems)}>
            <FaBox /> Items
            <FaChevronDown className={`arrow ${openItems ? "rotate" : ""}`} />
          </li>

          {openItems && (
            <div className="sub-menu">
              <div className="sub-item active-sub">
                <FaBox /> Inventory
              </div>
              <div className="sub-item">
                <FaBox /> Godown (Warehouse)
              </div>
            </div>
          )}

          <li onClick={() => setOpenSales(!openSales)}>
            <FaShoppingCart /> Sales
            <FaChevronDown className={`arrow ${openSales ? "rotate" : ""}`} />
          </li>

          {openSales && (
            <div className="sub-menu">
              <div className="sub-item active-sub">
                <FaFileInvoice /> Sales Invoices
              </div>
              <div className="sub-item">
                <FaFileInvoiceDollar /> Quotation / Estimate
              </div>
              <div className="sub-item">
                <FaMoneyBill /> Payment In
              </div>
              <div className="sub-item">
                <FaUndo /> Sales Return
              </div>
              <div className="sub-item">
                <FaFileAlt /> Credit Note
              </div>
              <div className="sub-item">
                <FaTruck /> Delivery Challan
              </div>
              <div className="sub-item">
                <FaClipboardList /> Proforma Invoice
              </div>
            </div>
          )}

          <li onClick={() => setOpenPurchase(!openPurchase)}>
            <FaFileInvoice /> Purchases
            <FaChevronDown className={`arrow ${openPurchase ? "rotate" : ""}`} />
          </li>

          {openPurchase && (
            <div className="sub-menu">
              <div className="sub-item active-sub">
                <FaShoppingBag /> Purchase Invoices
              </div>
              <div className="sub-item">
                <FaMoneyCheck /> Payment Out
              </div>
              <div className="sub-item">
                <FaUndo /> Purchase Return
              </div>
              <div className="sub-item">
                <FaFileAlt /> Debit Note
              </div>
              <div className="sub-item">
                <FaClipboardList /> Purchase Orders
              </div>
            </div>
          )}

          <li><FaChartBar /> Reports</li>
        </ul>

        {/* ACCOUNTING */}
        <p className="section">ACCOUNTING SOLUTIONS</p>

        <ul>
          <li><FaUniversity /> Cash & Bank</li>
          <li><FaFileAlt /> E-Invoicing</li>
          <li><FaMoneyBill /> Automated Bills</li>
          <li><FaReceipt /> Expenses</li>
          <li><FaDesktop /> POS Billing</li>
        </ul>

        {/* BUSINESS TOOLS */}
        <p className="section">BUSINESS TOOLS</p>

        <div className="scroll-btn" onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less ↑" : "Scroll for more options ↓"}
        </div>

        {showMore && (
          <ul className="extra-menu">
            <li><FaCalendarCheck /> Staff Attendance & Payroll</li>
            <li><FaUserFriends /> Manage Users</li>
            <li><FaShoppingCart /> Online Orders</li>
            <li><FaSms /> SMS Marketing</li>
          </ul>
        )}

      </div>

      {/* FOOTER */}
      <div className="footer">
        <div
          className="settings"
          onClick={() => navigate("/settings")}
          style={{ cursor: "pointer" }}
        >
          <FaCog /> Settings

      </div>
        <div className="security">
          <span>100% Secure</span>
          <span>ISO Certified</span>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;