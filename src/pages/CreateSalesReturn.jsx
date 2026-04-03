import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import {
  FaArrowLeft, FaKeyboard, FaCog, FaCalendarAlt,
  FaChevronDown, FaTimes, FaPlus, FaInfoCircle, FaSearch
} from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import "./CreateSalesReturn.css";

const CreateSalesReturn = () => {
  const navigate = useNavigate();
  const [showNotes, setShowNotes]   = useState(false);
  const [notes, setNotes]           = useState("");
  const [markPaid, setMarkPaid]     = useState(false);
  const [roundOff, setRoundOff]     = useState(false);
  const [invoiceSearch, setInvoiceSearch] = useState("");

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="csr-page">

        {/* ══ TOP BAR ══ */}
        <div className="csr-topbar">
          <div className="csr-topbar-left">
            <button className="csr-back-btn" onClick={() => navigate("/sales/return")}>
              <FaArrowLeft />
            </button>
            <span className="csr-title">Create Sales Return</span>
          </div>
          <div className="csr-topbar-right">
            <button className="csr-icon-btn"><FaKeyboard /></button>
            <button className="csr-settings-btn">
              <FaCog size={13} />
              <span>Settings</span>
            </button>
            <button className="csr-savnew-btn">Save &amp; New</button>
            <button className="csr-save-btn" disabled>Save</button>
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="csr-body">

          {/* ── LEFT MAIN ── */}
          <div className="csr-main">

            {/* Bill To */}
            <div className="csr-bill-section">
              <p className="csr-bill-label">Bill To</p>
              <div className="csr-add-party-box">
                <span className="csr-add-party-text">+ Add Party</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="csr-table-wrapper">
              <div className="csr-table-head">
                <span className="csr-th-no">NO</span>
                <span className="csr-th-item">ITEMS/ SERVICES</span>
                <span className="csr-th-hsn">HSN/ SAC</span>
                <span className="csr-th-qty">QTY</span>
                <span className="csr-th-price">PRICE/ITEM (₹)</span>
                <span className="csr-th-disc">DISCOUNT</span>
                <span className="csr-th-tax">TAX</span>
                <span className="csr-th-amt">AMOUNT (₹)</span>
                <span className="csr-th-plus"><FaPlus /></span>
              </div>

              <div className="csr-add-item-area">
                <div className="csr-add-item-dashed">
                  <span className="csr-add-item-text">+ Add Item</span>
                </div>
                <div className="csr-scan-box">
                  <MdQrCodeScanner size={28} />
                  <span>Scan Barcode</span>
                </div>
              </div>
            </div>

            {/* Subtotal */}
            <div className="csr-subtotal-bar">
              <span className="csr-sub-label">SUBTOTAL</span>
              <span className="csr-sub-val">₹ 0</span>
              <span className="csr-sub-val">₹ 0</span>
              <span className="csr-sub-val">₹ 0</span>
            </div>

            {/* Bottom Split */}
            <div className="csr-bottom-split">

              {/* Bottom Left */}
              <div className="csr-bl">
                {!showNotes
                  ? <button className="csr-link" onClick={() => setShowNotes(true)}>+ Add Notes</button>
                  : <textarea
                      className="csr-notes-ta"
                      placeholder="Add notes…"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                    />
                }

                <div className="csr-terms-card">
                  <div className="csr-terms-top">
                    <span>Terms and Conditions</span>
                    <button className="csr-circle-x"><FaTimes size={10} /></button>
                  </div>
                  <div className="csr-terms-body">
                    <p>1. Goods once sold will not be taken back or exchanged</p>
                    <p>2. All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction only</p>
                  </div>
                </div>
              </div>

              {/* Bottom Right */}
              <div className="csr-br">
                <div className="csr-br-row">
                  <button className="csr-link">+ Add Additional Charges</button>
                  <span className="csr-br-val">₹ 0</span>
                </div>
                <div className="csr-br-row">
                  <span className="csr-br-key">Taxable Amount</span>
                  <span className="csr-br-val">₹ 0</span>
                </div>
                <div className="csr-br-row">
                  <button className="csr-link">+ Add Discount</button>
                  <span className="csr-br-val red">- ₹ 0</span>
                </div>

                <div className="csr-divider" />

                <div className="csr-br-row">
                  <label className="csr-check-label">
                    <input type="checkbox" checked={roundOff} onChange={e => setRoundOff(e.target.checked)} />
                    <span>Auto Round Off</span>
                  </label>
                  <div className="csr-add-wrap">
                    <button className="csr-add-drop">+ Add <FaChevronDown size={9} /></button>
                    <div className="csr-rupee-field">₹ &nbsp; 0</div>
                  </div>
                </div>

                <div className="csr-divider" />

                <div className="csr-total-row">
                  <span className="csr-total-label">Total Amount</span>
                  <input className="csr-payment-inp" placeholder="Enter Payment amount" readOnly />
                </div>

                {/* Mark as fully paid */}
                <div className="csr-mark-paid-row">
                  <span className="csr-mark-paid-text">Mark as fully paid</span>
                  <input
                    type="checkbox"
                    className="csr-paid-checkbox"
                    checked={markPaid}
                    onChange={e => setMarkPaid(e.target.checked)}
                  />
                </div>

                {/* Amount Paid */}
                <div className="csr-amount-paid-row">
                  <span className="csr-amount-paid-label">Amount Paid</span>
                  <div className="csr-amount-paid-inputs">
                    <div className="csr-rupee-input-wrap">
                      <span className="csr-rupee-symbol">₹</span>
                      <input className="csr-rupee-input" defaultValue="0" />
                    </div>
                    <div className="csr-payment-mode-wrap">
                      <select className="csr-payment-mode">
                        <option>Cash</option>
                        <option>Bank Transfer</option>
                        <option>UPI</option>
                        <option>Cheque</option>
                      </select>
                      <FaChevronDown size={9} className="csr-mode-arrow" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── RIGHT META PANEL ── */}
          <div className="csr-right">

            {/* Sales Return No + Date */}
            <div className="csr-right-row2">
              <div className="csr-meta-field">
                <label>Sales Return No:</label>
                <input className="csr-meta-input" defaultValue="4" />
              </div>
              <div className="csr-meta-field">
                <label>Sales Return Date:</label>
                <div className="csr-date-box">
                  <FaCalendarAlt size={12} className="csr-cal-icon" />
                  <span>03 Apr 2026</span>
                  <FaChevronDown size={10} className="csr-chev" />
                </div>
              </div>
            </div>

            {/* Link to Invoice */}
            <div className="csr-meta-field">
              <label>Link to Invoice :</label>
              <div className="csr-search-wrap">
                <FaSearch size={12} className="csr-search-icon" />
                <input
                  className="csr-search-input"
                  placeholder="Search invoices"
                  value={invoiceSearch}
                  onChange={e => setInvoiceSearch(e.target.value)}
                />
              </div>
            </div>

            {/* 4-col row */}
            <div className="csr-right-row4">
              <div className="csr-meta-field">
                <label>E-Way Bill No: <FaInfoCircle size={10} className="csr-info" /></label>
                <input className="csr-meta-input" />
              </div>
              <div className="csr-meta-field">
                <label>Challan No:</label>
                <input className="csr-meta-input" />
              </div>
              <div className="csr-meta-field">
                <label>Financed By:</label>
                <input className="csr-meta-input" />
              </div>
              <div className="csr-meta-field">
                <label>Salesman:</label>
                <input className="csr-meta-input" />
              </div>
            </div>

            {/* 2-col row */}
            <div className="csr-right-row2">
              <div className="csr-meta-field">
                <label>Email ID:</label>
                <input className="csr-meta-input" />
              </div>
              <div className="csr-meta-field">
                <label>Warranty Period:</label>
                <input className="csr-meta-input" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSalesReturn;