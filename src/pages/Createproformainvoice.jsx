import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProformaInvoice.css";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaArrowLeft } from "react-icons/fa";
import { FiSettings, FiX } from "react-icons/fi";
import { BsKeyboard, BsUpcScan } from "react-icons/bs";
import { LuCalendarDays } from "react-icons/lu";

/* ── blank item row ── */
const blankItem = () => ({
  id: Date.now() + Math.random(),
  name: "", hsn: "", qty: "", price: "", discount: "", tax: "",
});

const CreateProformaInvoice = () => {
  const navigate = useNavigate();

  const [items,       setItems]       = useState([]);
  const [showNotes,   setShowNotes]   = useState(false);
  const [notes,       setNotes]       = useState("");
  const [autoRound,   setAutoRound]   = useState(false);

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

  const fmtR = (n) => "₹ " + (n || 0).toFixed(0);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main cpfi-main">

        {/* ══ TOP BAR ══ */}
        <div className="cpfi-topbar">
          <div className="cpfi-top-left">
            <FaArrowLeft
              className="cpfi-back"
              onClick={() => navigate("/sales/proforma")}
            />
            <h2 className="cpfi-heading">Create Proforma Invoice</h2>
          </div>
          <div className="cpfi-top-right">
            <button className="cpfi-kb-btn"><BsKeyboard size={18} /></button>
            <button className="cpfi-settings-btn">
              <FiSettings size={14} /> Settings
              <span className="cpfi-dot" />
            </button>
            <button className="cpfi-savenew-btn">Save &amp; New</button>
            <button className="cpfi-save-btn">Save</button>
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="cpfi-body">

          {/* ─────────── LEFT ─────────── */}
          <div className="cpfi-left">

            {/* Bill To */}
            <div className="cpfi-bill-to">
              <p className="cpfi-section-title">Bill To</p>
              <div className="cpfi-add-party-box">
                <button className="cpfi-add-party-btn">+ Add Party</button>
              </div>
            </div>

            {/* Items Table */}
            <div className="cpfi-table-section">
              <table className="cpfi-table">
                <thead>
                  <tr>
                    <th className="cpfi-col-no">NO</th>
                    <th className="cpfi-col-item">ITEMS/ SERVICES</th>
                    <th>HSN/ SAC</th>
                    <th>QTY</th>
                    <th>PRICE/ITEM (₹)</th>
                    <th>DISCOUNT</th>
                    <th>TAX</th>
                    <th>AMOUNT (₹)</th>
                    <th className="cpfi-col-add">
                      <button className="cpfi-add-row-btn" onClick={addItem}>+</button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => {
                    const r = rows[idx] || {};
                    return (
                      <tr key={it.id} className="cpfi-item-row">
                        <td className="cpfi-td-no">{idx + 1}</td>
                        <td>
                          <input className="cpfi-cell-input" placeholder="Select Item"
                            value={it.name} onChange={(e) => updateItem(it.id, "name", e.target.value)} />
                        </td>
                        <td><input className="cpfi-cell-input cpfi-sm" value={it.hsn}
                            onChange={(e) => updateItem(it.id, "hsn", e.target.value)} /></td>
                        <td><input type="number" className="cpfi-cell-input cpfi-sm" value={it.qty}
                            onChange={(e) => updateItem(it.id, "qty", e.target.value)} /></td>
                        <td><input type="number" className="cpfi-cell-input cpfi-sm" value={it.price}
                            onChange={(e) => updateItem(it.id, "price", e.target.value)} /></td>
                        <td><input type="number" className="cpfi-cell-input cpfi-sm" placeholder="0%"
                            value={it.discount} onChange={(e) => updateItem(it.id, "discount", e.target.value)} /></td>
                        <td><input type="number" className="cpfi-cell-input cpfi-sm" placeholder="0%"
                            value={it.tax} onChange={(e) => updateItem(it.id, "tax", e.target.value)} /></td>
                        <td className="cpfi-td-amt">{(r.total || 0).toFixed(2)}</td>
                        <td>
                          <button className="cpfi-del-btn" onClick={() => removeItem(it.id)}>
                            <FiX size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Add Item + Scan Barcode */}
              <div className="cpfi-add-row">
                <div className="cpfi-add-item-box" onClick={addItem}>+ Add Item</div>
                <button className="cpfi-scan-btn"><BsUpcScan size={22} /> Scan Barcode</button>
              </div>

              {/* Subtotal bar */}
              <div className="cpfi-subtotal-bar">
                <span className="cpfi-sub-label">SUBTOTAL</span>
                <span className="cpfi-sub-val">{fmtR(subDiscount)}</span>
                <span className="cpfi-sub-val">{fmtR(subTax)}</span>
                <span className="cpfi-sub-val">{fmtR(subTotal)}</span>
              </div>
            </div>

            {/* Bottom Left */}
            <div className="cpfi-bottom-left">
              {!showNotes
                ? <button className="cpfi-link" onClick={() => setShowNotes(true)}>+ Add Notes</button>
                : (
                  <div className="cpfi-fg">
                    <label className="cpfi-lbl">Notes</label>
                    <textarea className="cpfi-textarea" rows={3} value={notes}
                      onChange={(e) => setNotes(e.target.value)} placeholder="Add notes..." />
                  </div>
                )
              }

              {/* Terms and Conditions */}
              <div className="cpfi-terms-card">
                <div className="cpfi-terms-head">
                  <span>Terms and Conditions</span>
                  <button className="cpfi-terms-x"><FiX size={13} /></button>
                </div>
                <div className="cpfi-terms-body">
                  <p>1. Goods once sold will not be taken back or exchanged</p>
                  <p>2. All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction only</p>
                </div>
              </div>

              <button className="cpfi-link cpfi-mt">+ Add Bank Account</button>
              <button className="cpfi-link">+ Add Payment QR</button>
            </div>
          </div>

          {/* ─────────── RIGHT ─────────── */}
          <div className="cpfi-right">

            {/* Invoice Meta */}
            <div className="cpfi-meta">

              {/* Row 1: Proforma Invoice No | Proforma Invoice Date */}
              <div className="cpfi-meta-row2">
                <div className="cpfi-fg">
                  <label className="cpfi-lbl">Proforma Invoice No:</label>
                  <input className="cpfi-input" defaultValue="4" />
                </div>
                <div className="cpfi-fg">
                  <label className="cpfi-lbl">Proforma Invoice Date:</label>
                  <div className="cpfi-date-pill">
                    <LuCalendarDays size={13} />
                    <span>06 Apr 2026</span>
                    <span className="cpfi-chev">&#8964;</span>
                  </div>
                </div>
              </div>

              {/* Payment Terms + Expiry Date inside dashed box */}
              <div className="cpfi-terms-dashed">
                <div className="cpfi-fg">
                  <label className="cpfi-lbl">Payment Terms:</label>
                  <div className="cpfi-days-wrap">
                    <input className="cpfi-input cpfi-days-input" defaultValue="30" />
                    <span className="cpfi-days-tag">days</span>
                  </div>
                </div>
                <div className="cpfi-fg">
                  <label className="cpfi-lbl">Expiry Date:</label>
                  <div className="cpfi-date-pill">
                    <LuCalendarDays size={13} />
                    <span>06 May 2026</span>
                    <span className="cpfi-chev">&#8964;</span>
                  </div>
                </div>
                <button className="cpfi-dashed-x"><FiX size={14} /></button>
              </div>

              {/* Extra fields 2×2 */}
              <div className="cpfi-extra-grid">
                <div className="cpfi-fg">
                  <label className="cpfi-lbl">E-Way Bill No:</label>
                  <input className="cpfi-input cpfi-muted" />
                </div>
                <div className="cpfi-fg">
                  <label className="cpfi-lbl">Challan No.:</label>
                  <input className="cpfi-input cpfi-muted" />
                </div>
                <div className="cpfi-fg">
                  <label className="cpfi-lbl">Financed By:</label>
                  <input className="cpfi-input cpfi-muted" />
                </div>
                <div className="cpfi-fg">
                  <label className="cpfi-lbl">Salesman:</label>
                  <input className="cpfi-input cpfi-muted" />
                </div>
                <div className="cpfi-fg">
                  <label className="cpfi-lbl">Email ID:</label>
                  <input className="cpfi-input cpfi-muted" />
                </div>
                <div className="cpfi-fg">
                  <label className="cpfi-lbl">Warranty Period:</label>
                  <input className="cpfi-input cpfi-muted" />
                </div>
              </div>
            </div>

            {/* Totals Panel */}
            <div className="cpfi-totals">

              <div className="cpfi-t-row">
                <button className="cpfi-link">+ Add Additional Charges</button>
                <span>₹ 0</span>
              </div>

              <div className="cpfi-t-row">
                <span className="cpfi-t-label">Taxable Amount</span>
                <span>₹ 0</span>
              </div>

              <div className="cpfi-t-row">
                <button className="cpfi-link">+ Add Discount</button>
                <span>- ₹ 0</span>
              </div>

              {/* Auto Round Off */}
              <div className="cpfi-check-row">
                <input type="checkbox" className="cpfi-cb" checked={autoRound}
                  onChange={(e) => setAutoRound(e.target.checked)} />
                <span>Auto Round Off</span>
                <div className="cpfi-round-add">
                  <span>+ Add</span>
                  <span className="cpfi-chev">&#8964;</span>
                </div>
                <div className="cpfi-round-wrap">
                  <span>₹</span>
                  <input className="cpfi-round-input" defaultValue="0" readOnly />
                </div>
              </div>

              {/* Total Amount */}
              <div className="cpfi-total-row">
                <span className="cpfi-total-label">Total Amount</span>
                <input className="cpfi-pay-input" placeholder="Enter Payment amount" readOnly />
              </div>

              {/* Authorized Signatory */}
              <div className="cpfi-sign-section">
                <p className="cpfi-sign-text">
                  Authorized signatory for <b>Mondal Electronics Concern</b>
                </p>
                <div className="cpfi-sign-box" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateProformaInvoice;
