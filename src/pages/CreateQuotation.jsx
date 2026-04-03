import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import {
  FaArrowLeft, FaKeyboard, FaCog, FaCalendarAlt,
  FaChevronDown, FaTimes, FaPlus, FaInfoCircle
} from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import QuickQuotationSettings from "../pages/QuickQuotationSettings";
import "./CreateQuotation.css";

const CreateQuotation = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [showNotes, setShowNotes]       = useState(false);
  const [notes, setNotes]               = useState("");
  const [validFor, setValidFor]         = useState("30");

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="cq-page">

        {/* ══ TOP BAR ══ */}
        <div className="cq-topbar">
          <div className="cq-topbar-left">
            <button className="cq-back-btn" onClick={() => navigate("/sales/quotation")}>
              <FaArrowLeft />
            </button>
            <span className="cq-title">Create Quotation</span>
          </div>
          <div className="cq-topbar-right">
            <button className="cq-icon-btn"><FaKeyboard /></button>
            <button className="cq-settings-btn" onClick={() => setShowSettings(true)}>
              <FaCog size={13} />
              <span>Settings</span>
              <span className="cq-red-dot" />
            </button>
            <button className="cq-savnew-btn">Save &amp; New</button>
            <button className="cq-save-btn" disabled>Save</button>
          </div>
        </div>

        {/* ══ BODY: LEFT MAIN + RIGHT META PANEL ══ */}
        <div className="cq-body">

          {/* ── LEFT MAIN ── */}
          <div className="cq-main">

            {/* Bill To */}
            <div className="cq-bill-section">
              <p className="cq-bill-label">Bill To</p>
              <div className="cq-add-party-box">
                <span className="cq-add-party-text">+ Add Party</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="cq-table-wrapper">
              <div className="cq-table-head">
                <span className="th-no">NO</span>
                <span className="th-item">ITEMS/ SERVICES</span>
                <span className="th-hsn">HSN/ SAC</span>
                <span className="th-qty">QTY</span>
                <span className="th-price">PRICE/ITEM (₹)</span>
                <span className="th-disc">DISCOUNT</span>
                <span className="th-tax">TAX</span>
                <span className="th-amt">AMOUNT (₹)</span>
                <span className="th-plus"><FaPlus /></span>
              </div>

              <div className="cq-add-item-area">
                <div className="cq-add-item-dashed">
                  <span className="cq-add-item-text">+ Add Item</span>
                </div>
                <div className="cq-scan-box">
                  <MdQrCodeScanner size={28} />
                  <span>Scan Barcode</span>
                </div>
              </div>
            </div>

            {/* Subtotal */}
            <div className="cq-subtotal-bar">
              <span className="cq-sub-label">SUBTOTAL</span>
              <span className="cq-sub-val">₹ 0</span>
              <span className="cq-sub-val">₹ 0</span>
              <span className="cq-sub-val">₹ 0</span>
            </div>

            {/* Bottom split: notes/terms LEFT, totals RIGHT */}
            <div className="cq-bottom-split">

              <div className="cq-bl">
                {!showNotes
                  ? <button className="cq-link" onClick={() => setShowNotes(true)}>+ Add Notes</button>
                  : <textarea
                      className="cq-notes-ta"
                      placeholder="Add notes…"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                    />
                }

                <div className="cq-terms-card">
                  <div className="cq-terms-top">
                    <span>Terms and Conditions</span>
                    <button className="cq-circle-x"><FaTimes size={10} /></button>
                  </div>
                  <div className="cq-terms-body">
                    <p>1. Goods once sold will not be taken back or exchanged</p>
                    <p>2. All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction only</p>
                  </div>
                </div>

                <button className="cq-link">+ Add Bank Account</button>
                <button className="cq-link">+ Add Payment QR</button>
              </div>

              <div className="cq-br">
                <div className="cq-br-row">
                  <button className="cq-link">+ Add Additional Charges</button>
                  <span className="cq-br-val">₹ 0</span>
                </div>
                <div className="cq-br-row">
                  <span className="cq-br-key">Taxable Amount</span>
                  <span className="cq-br-val">₹ 0</span>
                </div>
                <div className="cq-br-row">
                  <button className="cq-link">+ Add Discount</button>
                  <span className="cq-br-val red">- ₹ 0</span>
                </div>

                <div className="cq-divider" />

                <div className="cq-br-row">
                  <label className="cq-check-label">
                    <input type="checkbox" />
                    <span>Auto Round Off</span>
                  </label>
                  <div className="cq-add-wrap">
                    <button className="cq-add-drop">+ Add <FaChevronDown size={9} /></button>
                    <div className="cq-rupee-field">₹ &nbsp; 0</div>
                  </div>
                </div>

                <div className="cq-divider" />

                <div className="cq-total-row">
                  <span className="cq-total-label">Total Amount</span>
                  <input className="cq-payment-inp" placeholder="Enter Payment amount" readOnly />
                </div>

                <div className="cq-signatory">
                  Authorized signatory for <strong>Mondal Electronics Concern</strong>
                </div>
                <div className="cq-sign-box" />
              </div>

            </div>
          </div>

          {/* ── RIGHT META PANEL ── */}
          <div className="cq-right">

            {/* Quotation No + Date */}
            <div className="cq-right-row2">
              <div className="cq-meta-field">
                <label>Quotation No:</label>
                <input className="cq-meta-input" defaultValue="5" />
              </div>
              <div className="cq-meta-field">
                <label>Quotation Date:</label>
                <div className="cq-date-box">
                  <FaCalendarAlt size={12} className="cq-cal-icon" />
                  <span>03 Apr 2026</span>
                  <FaChevronDown size={10} className="cq-chev" />
                </div>
              </div>
            </div>

            {/* Valid For dashed box */}
            <div className="cq-validity-box">
              <button className="cq-validity-x"><FaTimes size={10} /></button>
              <div className="cq-right-row2">
                <div className="cq-meta-field">
                  <label>Valid For:</label>
                  <div className="cq-validfor-wrap">
                    <input
                      className="cq-validfor-input"
                      value={validFor}
                      onChange={e => setValidFor(e.target.value)}
                    />
                    <span className="cq-days-tag">days</span>
                  </div>
                </div>
                <div className="cq-meta-field">
                  <label>Validity Date:</label>
                  <div className="cq-date-box">
                    <FaCalendarAlt size={12} className="cq-cal-icon" />
                    <span>03 May 2026</span>
                    <FaChevronDown size={10} className="cq-chev" />
                  </div>
                </div>
              </div>
            </div>

            {/* 4-col row */}
            <div className="cq-right-row4">
              <div className="cq-meta-field">
                <label>E-Way Bill No: <FaInfoCircle size={10} className="cq-info" /></label>
                <input className="cq-meta-input" />
              </div>
              <div className="cq-meta-field">
                <label>Challan No:</label>
                <input className="cq-meta-input" />
              </div>
              <div className="cq-meta-field">
                <label>Financed By:</label>
                <input className="cq-meta-input" />
              </div>
              <div className="cq-meta-field">
                <label>Salesman:</label>
                <input className="cq-meta-input" />
              </div>
            </div>

            {/* 2-col row */}
            <div className="cq-right-row2">
              <div className="cq-meta-field">
                <label>Email ID:</label>
                <input className="cq-meta-input" />
              </div>
              <div className="cq-meta-field">
                <label>Warranty Period:</label>
                <input className="cq-meta-input" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {showSettings && <QuickQuotationSettings onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default CreateQuotation;