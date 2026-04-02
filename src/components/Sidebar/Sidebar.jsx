import "./Sidebar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
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
  FaChevronRight,
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
  const navigate  = useNavigate();
  const location  = useLocation();

  const [showMore,      setShowMore]      = useState(false);
  const [openDropdown,  setOpenDropdown]  = useState(false);
  const [openItems,     setOpenItems]     = useState(false);
  const [openSales,     setOpenSales]     = useState(false);
  const [openPurchase,  setOpenPurchase]  = useState(false);

  const isActive = (path) => location.pathname === path;

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
      {/* ── SCROLLABLE TOP ── */}
      <div className="sidebar-top">

        {/* PROFILE */}
        <div className="profile">
          <div className="profile-avatar">
            <span className="avatar-dot" />
          </div>
          <div className="profile-info">
            <h4>Mondal Electronic...</h4>
            <p>9555780835</p>
          </div>
        </div>

        {/* CREATE INVOICE BUTTON */}
        <div className="invoice-box">
          <div className="invoice-btn" onClick={() => setOpenDropdown(!openDropdown)}>
            <span>+ Create Sales Invoice</span>
            <FaChevronDown className={`dropdown-arrow ${openDropdown ? "rotate" : ""}`} />
          </div>

          {openDropdown && (
            <div className="dropdown-panel">
              <p className="dropdown-title">GENERAL</p>
              <ul>
                <li><FaUserPlus /> Create Party</li>
                <li><FaBoxOpen /> Create Item</li>
              </ul>

              <p className="dropdown-title">SALES TRANSACTIONS</p>
              <ul>
                <li><FaFileInvoiceDollar /> Quotation</li>
                <li><FaMoneyBill /> Payment In</li>
                <li><FaUndo /> Sales Return</li>
                <li><FaFileAlt /> Credit Note</li>
                <li><FaTruck /> Delivery Challan</li>
                <li><FaClipboardList /> Proforma Invoice</li>
              </ul>

              <p className="dropdown-title">PURCHASE TRANSACTIONS</p>
              <ul>
                <li><FaShoppingBag /> Purchase</li>
                <li><FaMoneyCheck /> Payment Out</li>
                <li><FaUndo /> Purchase Return</li>
                <li><FaFileAlt /> Debit Note</li>
                <li><FaClipboardList /> Purchase Orders</li>
              </ul>

              <ul>
                <li><FaUserPlus /> Create Expense</li>
              </ul>
            </div>
          )}
        </div>

        {/* SALE BANNER */}
        <div className="sale-banner">
          <span className="sale-tag">SALE</span>
          <span className="sale-text">Plans and Pricing</span>
          <span className="trial">Trial Expired</span>
        </div>

        {/* ── MENU ── */}
        <div className="menu">

          <p className="menu-section">GENERAL</p>

          <ul>
            {/* Dashboard */}
            <li
              className={isActive("/") ? "menu-item active-item" : "menu-item"}
              onClick={() => navigate("/")}
            >
              <FaTachometerAlt className="menu-icon" />
              <span>Dashboard</span>
            </li>

            {/* Parties */}
            <li
              className={isActive("/parties") ? "menu-item active-item" : "menu-item"}
              onClick={() => navigate("/parties")}
            >
              <FaUsers className="menu-icon" />
              <span>Parties</span>
            </li>

            {/* Items */}
            <li className="menu-item" onClick={() => setOpenItems(!openItems)}>
              <FaBox className="menu-icon" />
              <span>Items</span>
              <FaChevronRight className={`arrow-icon ${openItems ? "rotate" : ""}`} />
            </li>
            {openItems && (
              <div className="sub-menu">
                <div className="sub-item active-sub"><FaBox className="sub-icon" /> Inventory</div>
                <div className="sub-item"><FaBox className="sub-icon" /> Godown (Warehouse)</div>
              </div>
            )}

            {/* Sales */}
            <li className="menu-item" onClick={() => setOpenSales(!openSales)}>
              <FaShoppingCart className="menu-icon" />
              <span>Sales</span>
              <FaChevronRight className={`arrow-icon ${openSales ? "rotate" : ""}`} />
            </li>
            {openSales && (
              <div className="sub-menu">
                <div className="sub-item active-sub"><FaFileInvoice className="sub-icon" /> Sales Invoices</div>
                <div className="sub-item"><FaFileInvoiceDollar className="sub-icon" /> Quotation / Estimate</div>
                <div className="sub-item"><FaMoneyBill className="sub-icon" /> Payment In</div>
                <div className="sub-item"><FaUndo className="sub-icon" /> Sales Return</div>
                <div className="sub-item"><FaFileAlt className="sub-icon" /> Credit Note</div>
                <div className="sub-item"><FaTruck className="sub-icon" /> Delivery Challan</div>
                <div className="sub-item"><FaClipboardList className="sub-icon" /> Proforma Invoice</div>
              </div>
            )}

            {/* Purchases */}
            <li className="menu-item" onClick={() => setOpenPurchase(!openPurchase)}>
              <FaFileInvoice className="menu-icon" />
              <span>Purchases</span>
              <FaChevronRight className={`arrow-icon ${openPurchase ? "rotate" : ""}`} />
            </li>
            {openPurchase && (
              <div className="sub-menu">
                <div className="sub-item active-sub"><FaShoppingBag className="sub-icon" /> Purchase Invoices</div>
                <div className="sub-item"><FaMoneyCheck className="sub-icon" /> Payment Out</div>
                <div className="sub-item"><FaUndo className="sub-icon" /> Purchase Return</div>
                <div className="sub-item"><FaFileAlt className="sub-icon" /> Debit Note</div>
                <div className="sub-item"><FaClipboardList className="sub-icon" /> Purchase Orders</div>
              </div>
            )}

            {/* Reports */}
            <li className="menu-item">
              <FaChartBar className="menu-icon" />
              <span>Reports</span>
            </li>
          </ul>

          {/* ACCOUNTING SOLUTIONS */}
          <p className="menu-section">ACCOUNTING SOLUTIONS</p>
          <ul>
            <li className="menu-item"><FaUniversity className="menu-icon" /><span>Cash &amp; Bank</span></li>
            <li className="menu-item"><FaFileAlt className="menu-icon" /><span>E-Invoicing</span></li>
            <li className="menu-item"><FaMoneyBill className="menu-icon" /><span>Automated Bills</span></li>
            <li className="menu-item"><FaReceipt className="menu-icon" /><span>Expenses</span></li>
            <li className="menu-item"><FaDesktop className="menu-icon" /><span>POS Billing</span></li>
          </ul>

          {/* BUSINESS TOOLS */}
          <p className="menu-section">BUSINESS TOOLS</p>
          <div className="scroll-btn" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less ↑" : "Scroll for more options ↓"}
          </div>

          {showMore && (
            <ul className="extra-menu">
              <li className="menu-item"><FaCalendarCheck className="menu-icon" /><span>Staff Attendance &amp; Payroll</span></li>
              <li className="menu-item"><FaUserFriends className="menu-icon" /><span>Manage Users</span></li>
              <li className="menu-item"><FaShoppingCart className="menu-icon" /><span>Online Orders</span></li>
              <li className="menu-item"><FaSms className="menu-icon" /><span>SMS Marketing</span></li>
            </ul>
          )}

        </div>
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
      {/* ── FOOTER ── */}
      <div className="sidebar-footer">
        <div className="footer-settings">
          <FaCog className="menu-icon" />
          <span>Settings</span>
        </div>
        <div className="footer-security">
          <span>🔒 100% Secure</span>
          <span>🏅 ISO Certified</span>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
