import "./Sidebar.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt, FaUsers, FaBox, FaShoppingCart, FaFileInvoice,
  FaChartBar, FaUniversity, FaFileAlt, FaMoneyBill, FaReceipt,
  FaDesktop, FaCog, FaChevronDown, FaChevronRight, FaUserFriends,
  FaSms, FaCalendarCheck, FaUserPlus, FaBoxOpen, FaFileInvoiceDollar,
  FaUndo, FaTruck, FaClipboardList, FaShoppingBag, FaMoneyCheck,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  const [showMore,     setShowMore]     = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openItems,    setOpenItems]    = useState(false);
  const [openSales,    setOpenSales]    = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);

  const isActive = (path) => location.pathname === path;

  // ── Auto-expand the correct section based on current URL ──
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/inventory") || path.startsWith("/godown")) {
      setOpenItems(true);
    }
    if (path.startsWith("/sales/") || path === "/sales") {
      setOpenSales(true);
    }
    if (
      path.startsWith("/purchase") ||
      path.startsWith("/payment-out") ||
      path.startsWith("/debit-note")
    ) {
      setOpenPurchase(true);
    }
  }, [location.pathname]);

  // Navigate without closing the create-invoice dropdown
  const dropdownNavigate = (e, path) => {
    e.stopPropagation();
    navigate(path);
  };

  const navItem = (path, label, Icon) => (
    <div
      key={path}
      className={`sub-item ${isActive(path) ? "active-sub" : ""}`}
      onClick={() => navigate(path)}
    >
      <Icon className="sub-icon" /> {label}
    </div>
  );

  return (
    <div className="sidebar">

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
          <div
            className="invoice-btn"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <span>+ Create Sales Invoice</span>
            <FaChevronDown
              className={`dropdown-arrow ${openDropdown ? "rotate" : ""}`}
            />
          </div>

          {openDropdown && (
            <div className="dropdown-panel" onClick={(e) => e.stopPropagation()}>
              <p className="dropdown-title">GENERAL</p>
              <ul>
                <li onClick={(e) => dropdownNavigate(e, "/create-party")}>
                  <FaUserPlus /> Create Party
                </li>
                <li onClick={(e) => e.stopPropagation()}>
                  <FaBoxOpen /> Create Item
                </li>
              </ul>

              <p className="dropdown-title">SALES TRANSACTIONS</p>
              <ul>
                <li onClick={(e) => dropdownNavigate(e, "/sales/create-invoice")}>
                  <FaFileInvoice /> Sales Invoice
                </li>
                <li onClick={(e) => dropdownNavigate(e, "/sales/create-quotation")}>
                  <FaFileInvoiceDollar /> Quotation
                </li>
                <li onClick={(e) => dropdownNavigate(e, "/sales/create-payment-in")}>
                  <FaMoneyBill /> Payment In
                </li>
                <li onClick={(e) => dropdownNavigate(e, "/sales/create-return")}>
                  <FaUndo /> Sales Return
                </li>
                <li onClick={(e) => dropdownNavigate(e, "/sales/create-credit-note")}>
                  <FaFileAlt /> Credit Note
                </li>
                <li onClick={(e) => e.stopPropagation()}>
                  <FaTruck /> Delivery Challan
                </li>
                <li onClick={(e) => dropdownNavigate(e, "/sales/create-proforma")}>
                  <FaClipboardList /> Proforma Invoice
                </li>
              </ul>

              <p className="dropdown-title">PURCHASE TRANSACTIONS</p>
              <ul>
                <li onClick={(e) => dropdownNavigate(e, "/purchase-invoices/create")}>
                  <FaShoppingBag /> Purchase
                </li>
                <li onClick={(e) => dropdownNavigate(e, "/payment-out/create")}>
                  <FaMoneyCheck /> Payment Out
                </li>
                <li onClick={(e) => dropdownNavigate(e, "/purchase-return/create")}>
                  <FaUndo /> Purchase Return
                </li>
                <li onClick={(e) => dropdownNavigate(e, "/debit-note/create")}>
                  <FaFileAlt /> Debit Note
                </li>
                <li onClick={(e) => dropdownNavigate(e, "/purchase-orders/create")}>
                  <FaClipboardList /> Purchase Orders
                </li>
              </ul>

              <ul>
                <li onClick={(e) => dropdownNavigate(e, "/expenses")}>
                  <FaUserPlus /> Create Expense
                </li>
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
            <li
              className={`menu-item ${isActive("/dashboard") ? "active-item" : ""}`}
              onClick={() => navigate("/dashboard")}
            >
              <FaTachometerAlt className="menu-icon" />
              <span>Dashboard</span>
            </li>

            <li
              className={`menu-item ${isActive("/parties") ? "active-item" : ""}`}
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
                {navItem("/inventory", "Inventory",          FaBox)}
                {navItem("/godown",    "Godown (Warehouse)", FaBox)}
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
                {navItem("/sales/invoices",    "Sales Invoices",       FaFileInvoice)}
                {navItem("/sales/quotation",   "Quotation / Estimate", FaFileInvoiceDollar)}
                {navItem("/sales/payment-in",  "Payment In",           FaMoneyBill)}
                {navItem("/sales/return",      "Sales Return",         FaUndo)}
                {navItem("/sales/credit-note", "Credit Note",          FaFileAlt)}
                {navItem("/sales/challan",     "Delivery Challan",     FaTruck)}
                {navItem("/sales/proforma",    "Proforma Invoice",     FaClipboardList)}
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
                {navItem("/purchase-invoices", "Purchase Invoices", FaShoppingBag)}
                {navItem("/payment-out",       "Payment Out",       FaMoneyCheck)}
                {navItem("/purchase-return",   "Purchase Return",   FaUndo)}
                {navItem("/debit-note",        "Debit Note",        FaFileAlt)}
                {navItem("/purchase-orders",   "Purchase Orders",   FaClipboardList)}
              </div>
            )}

            <li className="menu-item">
              <FaChartBar className="menu-icon" />
              <span>Reports</span>
            </li>
          </ul>

          {/* ACCOUNTING SOLUTIONS */}
          <p className="menu-section">ACCOUNTING SOLUTIONS</p>
          <ul>
            <li className="menu-item" onClick={() => navigate("/cash-bank")}>
              <FaUniversity className="menu-icon" />
              <span>Cash & Bank</span>
            </li>
            <li className="menu-item" onClick={() => navigate("/einvoicing")}>
              <FaFileAlt className="menu-icon" />
              <span>E-Invoicing</span>
            </li>
            <li className="menu-item" onClick={() => navigate("/bills")}>
              <FaMoneyBill className="menu-icon" />
              <span>Automated Bills</span>
            </li>
            <li className="menu-item" onClick={() => navigate("/expenses")}>
              <FaReceipt className="menu-icon" />
              <span>Expenses</span>
            </li>
            <li className="menu-item" onClick={() => navigate("/pos")}>
              <FaDesktop className="menu-icon" />
              <span>POS Billing</span>
            </li>
          </ul>

          {/* BUSINESS TOOLS */}
          <p className="menu-section">BUSINESS TOOLS</p>
          <div className="scroll-btn" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Show Less ↑" : "Scroll for more options ↓"}
          </div>

          {showMore && (
            <ul className="extra-menu">
              <li className="menu-item"><FaCalendarCheck className="menu-icon" /><span>Staff Attendance &amp; Payroll</span></li>
              <li className="menu-item"><FaUserFriends  className="menu-icon" /><span>Manage Users</span></li>
              <li className="menu-item"><FaShoppingCart className="menu-icon" /><span>Online Orders</span></li>
              <li className="menu-item"><FaSms          className="menu-icon" /><span>SMS Marketing</span></li>
            </ul>
          )}

        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="sidebar-footer">
        <div className="footer-settings" onClick={() => navigate("/settings")}>
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