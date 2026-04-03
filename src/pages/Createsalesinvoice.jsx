import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateSalesInvoice.css";
import Sidebar from "../components/Sidebar/Sidebar";
import QuickInvoiceSettings from "../pages/Quickinvoicesettings";
import { FaArrowLeft } from "react-icons/fa";
import { FiSettings, FiX } from "react-icons/fi";
import { BsKeyboard, BsUpcScan } from "react-icons/bs";
import { LuCalendarDays } from "react-icons/lu";

/* ── generate a blank item row ── */
const blankItem = () => ({
  id: Date.now() + Math.random(),
  name: "", hsn: "", qty: "", price: "", discount: "", tax: "",
});

const CreateSalesInvoice = () => {
  const navigate = useNavigate();

  /* ── state ── */
  const [items,         setItems]         = useState([]);
  const [showNotes,     setShowNotes]     = useState(false);
  const [notes,         setNotes]         = useState("");
  const [applyTCS,      setApplyTCS]      = useState(false);
  const [autoRound,     setAutoRound]     = useState(false);
  const [markPaid,      setMarkPaid]      = useState(false);
  const [amtReceived,   setAmtReceived]   = useState("");
  const [payMode,       setPayMode]       = useState("Cash");
  const [showSettings,  setShowSettings]  = useState(false);

  /* ── item helpers ── */
  const addItem    = () => setItems((p) => [...p, blankItem()]);
  const removeItem = (id) => setItems((p) => p.filter((i) => i.id !== id));
  const updateItem = (id, field, val) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, [field]: val } : i)));

  /* ── calculations ── */
  const rows = items.map((it) => {
    const base  = (parseFloat(it.qty) || 0) * (parseFloat(it.price) || 0);
    const disc  = base * ((parseFloat(it.discount) || 0) / 100);
    const taxed = (base - disc) * ((parseFloat(it.tax) || 0) / 100);
    return { base, disc, taxed, total: base - disc + taxed };
  });

  const subDiscount = rows.reduce((s, r) => s + r.disc, 0);
  const subTax      = rows.reduce((s, r) => s + r.taxed, 0);
  const subTotal    = rows.reduce((s, r) => s + r.total, 0);
  const totalAmount = subTotal;
  const balance     = totalAmount - (parseFloat(amtReceived) || 0);

  const fmtR = (n) => "₹ " + (n || 0).toFixed(0);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main csi-main">

        {/* ══════════════════════════════════════
            TOP BAR
        ══════════════════════════════════════ */}
        <div className="csi-topbar">
          <div className="csi-top-left">
            <FaArrowLeft
              className="csi-back"
              onClick={() => navigate("/sales/invoices")}
            />
            <h2 className="csi-heading">Create Sales Invoice</h2>
          </div>
          <div className="csi-top-right">
            <button className="csi-kb-btn"><BsKeyboard size={18} /></button>
            <button className="csi-settings-btn" onClick={() => setShowSettings(true)}>
              <FiSettings size={14} /> Settings
              <span className="csi-dot" />
            </button>
            <button className="csi-savenew-btn">Save &amp; New</button>
            <button className="csi-save-btn">Save</button>
          </div>
        </div>

        {/* ══════════════════════════════════════
            BODY — left | right
        ══════════════════════════════════════ */}
        <div className="csi-body">

          {/* ─────────────── LEFT ─────────────── */}
          <div className="csi-left">

            {/* Bill To */}
            <div className="csi-bill-to">
              <p className="csi-section-title">Bill To</p>
              <div className="csi-add-party-box">
                <button className="csi-add-party-btn">+ Add Party</button>
              </div>
            </div>

            {/* ── Items Table ── */}
            <div className="csi-table-section">
              <table className="csi-table">
                <thead>
                  <tr>
                    <th className="csi-col-no">NO</th>
                    <th className="csi-col-item">ITEMS/ SERVICES</th>
                    <th>HSN/ SAC</th>
                    <th>QTY</th>
                    <th>PRICE/ITEM (₹)</th>
                    <th>DISCOUNT</th>
                    <th>TAX</th>
                    <th>AMOUNT (₹)</th>
                    <th className="csi-col-del">
                      <button className="csi-add-row-btn" onClick={addItem}>
                        <FiX size={0} style={{ display: "none" }} />
                        <span className="csi-plus-icon">+</span>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => {
                    const r = rows[idx] || {};
                    return (
                      <tr key={it.id} className="csi-item-row">
                        <td className="csi-td-no">{idx + 1}</td>
                        <td>
                          <input
                            className="csi-cell-input"
                            placeholder="Select Item"
                            value={it.name}
                            onChange={(e) => updateItem(it.id, "name", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            className="csi-cell-input csi-sm"
                            value={it.hsn}
                            onChange={(e) => updateItem(it.id, "hsn", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="csi-cell-input csi-sm"
                            value={it.qty}
                            onChange={(e) => updateItem(it.id, "qty", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="csi-cell-input csi-sm"
                            value={it.price}
                            onChange={(e) => updateItem(it.id, "price", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="csi-cell-input csi-sm"
                            placeholder="0%"
                            value={it.discount}
                            onChange={(e) => updateItem(it.id, "disc", e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="csi-cell-input csi-sm"
                            placeholder="0%"
                            value={it.tax}
                            onChange={(e) => updateItem(it.id, "tax", e.target.value)}
                          />
                        </td>
                        <td className="csi-td-amt">
                          {(r.total || 0).toFixed(2)}
                        </td>
                        <td>
                          <button
                            className="csi-del-btn"
                            onClick={() => removeItem(it.id)}
                          >
                            <FiX size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Add Item + Scan Barcode */}
              <div className="csi-add-row">
                <div className="csi-add-item-box" onClick={addItem}>
                  + Add Item
                </div>
                <button className="csi-scan-btn">
                  <BsUpcScan size={22} /> Scan Barcode
                </button>
              </div>

              {/* Subtotal bar */}
              <div className="csi-subtotal-bar">
                <span className="csi-sub-label">SUBTOTAL</span>
                <span className="csi-sub-val">{fmtR(subDiscount)}</span>
                <span className="csi-sub-val">{fmtR(subTax)}</span>
                <span className="csi-sub-val">{fmtR(subTotal)}</span>
              </div>
            </div>

            {/* ── Bottom Left ── */}
            <div className="csi-bottom-left">

              {/* Add Notes */}
              {!showNotes
                ? <button className="csi-link" onClick={() => setShowNotes(true)}>+ Add Notes</button>
                : (
                  <div className="csi-fg">
                    <label className="csi-lbl">Notes</label>
                    <textarea
                      className="csi-textarea"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes..."
                    />
                  </div>
                )
              }

              {/* Terms and Conditions */}
              <div className="csi-terms-card">
                <div className="csi-terms-head">
                  <span>Terms and Conditions</span>
                  <button className="csi-terms-x">
                    <FiX size={13} />
                  </button>
                </div>
                <div className="csi-terms-body">
                  <p>1. Goods once sold will not be taken back or exchanged</p>
                  <p>2. All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction only</p>
                </div>
              </div>

              <button className="csi-link csi-mt">+ Add Bank Account</button>
              <button className="csi-link">+ Add Payment QR</button>

            </div>
          </div>

          {/* ─────────────── RIGHT ─────────────── */}
          <div className="csi-right">

            {/* Invoice meta */}
            <div className="csi-meta">

              {/* Row 1: Invoice No | Invoice Date */}
              <div className="csi-meta-row2">
                <div className="csi-fg">
                  <label className="csi-lbl">Sales Invoice No:</label>
                  <input className="csi-input" defaultValue="30" />
                </div>
                <div className="csi-fg">
                  <label className="csi-lbl">Sales Invoice Date:</label>
                  <div className="csi-date-pill">
                    <LuCalendarDays size={13} />
                    <span>03 Apr 2026</span>
                    <span className="csi-chev">&#8964;</span>
                  </div>
                </div>
              </div>

              {/* Payment Terms + Due Date inside dashed box */}
              <div className="csi-terms-dashed">
                <div className="csi-fg">
                  <label className="csi-lbl">Payment Terms:</label>
                  <div className="csi-days-wrap">
                    <input className="csi-input csi-days-input" defaultValue="30" />
                    <span className="csi-days-tag">days</span>
                  </div>
                </div>
                <div className="csi-fg">
                  <label className="csi-lbl">Due Date:</label>
                  <div className="csi-date-pill">
                    <LuCalendarDays size={13} />
                    <span>03 May 2026</span>
                    <span className="csi-chev">&#8964;</span>
                  </div>
                </div>
                <button className="csi-dashed-x"><FiX size={14} /></button>
              </div>

              {/* Extra fields 2×2 */}
              <div className="csi-extra-grid">
                <div className="csi-fg">
                  <label className="csi-lbl">E-Way Bill No:</label>
                  <input className="csi-input csi-muted" />
                </div>
                <div className="csi-fg">
                  <label className="csi-lbl">Challan No.:</label>
                  <input className="csi-input csi-muted" />
                </div>
                <div className="csi-fg">
                  <label className="csi-lbl">Financed By:</label>
                  <input className="csi-input csi-muted" />
                </div>
                <div className="csi-fg">
                  <label className="csi-lbl">Salesman:</label>
                  <input className="csi-input csi-muted" />
                </div>
                <div className="csi-fg">
                  <label className="csi-lbl">Email ID:</label>
                  <input className="csi-input csi-muted" />
                </div>
                <div className="csi-fg">
                  <label className="csi-lbl">Warranty Period:</label>
                  <input className="csi-input csi-muted" />
                </div>
              </div>
            </div>

            {/* ── Totals Panel ── */}
            <div className="csi-totals">

              <div className="csi-t-row">
                <button className="csi-link">+ Add Additional Charges</button>
                <span>₹ 0</span>
              </div>

              <div className="csi-t-row">
                <span className="csi-t-label">Taxable Amount</span>
                <span>₹ 0</span>
              </div>

              <div className="csi-t-row">
                <button className="csi-link">+ Add Discount</button>
                <span>- ₹ 0</span>
              </div>

              {/* Apply TCS */}
              <div className="csi-check-row">
                <input
                  type="checkbox"
                  className="csi-cb"
                  checked={applyTCS}
                  onChange={(e) => setApplyTCS(e.target.checked)}
                />
                <span>Apply TCS</span>
              </div>

              {/* Auto Round Off */}
              <div className="csi-check-row">
                <input
                  type="checkbox"
                  className="csi-cb"
                  checked={autoRound}
                  onChange={(e) => setAutoRound(e.target.checked)}
                />
                <span>Auto Round Off</span>
                <div className="csi-round-add">
                  <span>+ Add</span>
                  <span className="csi-chev">&#8964;</span>
                </div>
                <div className="csi-round-wrap">
                  <span>₹</span>
                  <input className="csi-round-input" defaultValue="0" readOnly />
                </div>
              </div>

              {/* Total Amount */}
              <div className="csi-total-row">
                <span className="csi-total-label">Total Amount</span>
                <input
                  className="csi-pay-input"
                  placeholder="Enter Payment amount"
                  readOnly
                />
              </div>

              {/* Mark as fully paid — appears ABOVE Amount Received per screenshot */}
              <div className="csi-mark-row">
                <span className="csi-mark-label">Mark as fully paid</span>
                <input
                  type="checkbox"
                  className="csi-cb"
                  checked={markPaid}
                  onChange={(e) => setMarkPaid(e.target.checked)}
                />
              </div>

              {/* Amount Received */}
              <div className="csi-t-row csi-t-border-top">
                <span className="csi-t-label">Amount Received</span>
                <div className="csi-amt-wrap">
                  <div className="csi-rupee-box">
                    <span>₹</span>
                    <input
                      type="number"
                      className="csi-amt-input"
                      value={amtReceived}
                      onChange={(e) => setAmtReceived(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <select
                    className="csi-pay-mode"
                    value={payMode}
                    onChange={(e) => setPayMode(e.target.value)}
                  >
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Bank Transfer</option>
                    <option>Cheque</option>
                  </select>
                </div>
              </div>

              {/* Balance Amount */}
              <div className="csi-balance-row">
                <span className="csi-balance-label">Balance Amount</span>
                <span className="csi-balance-val">
                  ₹ {balance > 0 ? balance.toFixed(0) : 0}
                </span>
              </div>

              {/* Authorized Signatory */}
              <div className="csi-sign-section">
                <p className="csi-sign-text">
                  Authorized signatory for <b>Mondal Electronics Concern</b>
                </p>
                <div className="csi-sign-box" />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* QUICK INVOICE SETTINGS MODAL */}
      {showSettings && (
        <QuickInvoiceSettings onClose={() => setShowSettings(false)} />
      )}

    </div>
  );
};

export default CreateSalesInvoice;
