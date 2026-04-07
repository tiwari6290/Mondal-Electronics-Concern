import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCreditNote.css";
import Sidebar from "../components/Sidebar/Sidebar";
import QuickCreditNoteSettings from "../pages/Quickcreditnotesettings";
import { FaArrowLeft } from "react-icons/fa";
import { FiSettings, FiX, FiSearch } from "react-icons/fi";
import { BsKeyboard, BsUpcScan } from "react-icons/bs";
import { LuCalendarDays } from "react-icons/lu";

/* ── blank item row ── */
const blankItem = () => ({
  id: Date.now() + Math.random(),
  name: "", hsn: "", qty: "", price: "", discount: "", tax: "",
});

const CreateCreditNote = () => {
  const navigate = useNavigate();

  const [items,        setItems]        = useState([]);
  const [showNotes,    setShowNotes]    = useState(false);
  const [notes,        setNotes]        = useState("");
  const [applyTCS,     setApplyTCS]     = useState(false);
  const [autoRound,    setAutoRound]    = useState(false);
  const [markPaid,     setMarkPaid]     = useState(false);
  const [amtReceived,  setAmtReceived]  = useState("");
  const [payMode,      setPayMode]      = useState("Cash");
  const [showSettings, setShowSettings] = useState(false);

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
  const balance     = subTotal - (parseFloat(amtReceived) || 0);

  const fmtR = (n) => "₹ " + (n || 0).toFixed(0);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main ccn-main">

        {/* ══ TOP BAR ══ */}
        <div className="ccn-topbar">
          <div className="ccn-top-left">
            <FaArrowLeft className="ccn-back" onClick={() => navigate("/sales/credit-note")} />
            <h2 className="ccn-heading">Create Credit Note</h2>
          </div>
          <div className="ccn-top-right">
            <button className="ccn-kb-btn"><BsKeyboard size={18} /></button>
            <button className="ccn-settings-btn" onClick={() => setShowSettings(true)}>
              <FiSettings size={14} /> Settings
            </button>
            <button className="ccn-savenew-btn">Save &amp; New</button>
            <button className="ccn-save-btn">Save</button>
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="ccn-body">

          {/* ── LEFT COLUMN ── */}
          <div className="ccn-left">

            {/* Bill To */}
            <div className="ccn-bill-to">
              <p className="ccn-section-title">Bill To</p>
              <div className="ccn-add-party-box">
                <button className="ccn-add-party-btn">+ Add Party</button>
              </div>
            </div>

            {/* Items Table */}
            <div className="ccn-table-section">
              <table className="ccn-table">
                <thead>
                  <tr>
                    <th className="ccn-col-no">NO</th>
                    <th className="ccn-col-item">ITEMS/ SERVICES</th>
                    <th>HSN/ SAC</th>
                    <th>QTY</th>
                    <th>PRICE/ITEM (₹)</th>
                    <th>DISCOUNT</th>
                    <th>TAX</th>
                    <th>AMOUNT (₹)</th>
                    <th className="ccn-col-add">
                      <button className="ccn-add-row-btn" onClick={addItem}>+</button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => {
                    const r = rows[idx] || {};
                    return (
                      <tr key={it.id} className="ccn-item-row">
                        <td className="ccn-td-no">{idx + 1}</td>
                        <td>
                          <input className="ccn-cell-input" placeholder="Select Item"
                            value={it.name} onChange={(e) => updateItem(it.id, "name", e.target.value)} />
                        </td>
                        <td><input className="ccn-cell-input ccn-sm" value={it.hsn}
                            onChange={(e) => updateItem(it.id, "hsn", e.target.value)} /></td>
                        <td><input type="number" className="ccn-cell-input ccn-sm" value={it.qty}
                            onChange={(e) => updateItem(it.id, "qty", e.target.value)} /></td>
                        <td><input type="number" className="ccn-cell-input ccn-sm" value={it.price}
                            onChange={(e) => updateItem(it.id, "price", e.target.value)} /></td>
                        <td><input type="number" className="ccn-cell-input ccn-sm" placeholder="0%"
                            value={it.discount} onChange={(e) => updateItem(it.id, "discount", e.target.value)} /></td>
                        <td><input type="number" className="ccn-cell-input ccn-sm" placeholder="0%"
                            value={it.tax} onChange={(e) => updateItem(it.id, "tax", e.target.value)} /></td>
                        <td className="ccn-td-amt">{(r.total || 0).toFixed(2)}</td>
                        <td>
                          <button className="ccn-del-btn" onClick={() => removeItem(it.id)}>
                            <FiX size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Add Item + Scan Barcode */}
              <div className="ccn-add-row">
                <div className="ccn-add-item-box" onClick={addItem}>+ Add Item</div>
                <button className="ccn-scan-btn"><BsUpcScan size={22} /> Scan Barcode</button>
              </div>

              {/* Subtotal */}
              <div className="ccn-subtotal-bar">
                <span className="ccn-sub-label">SUBTOTAL</span>
                <span className="ccn-sub-val">{fmtR(subDiscount)}</span>
                <span className="ccn-sub-val">{fmtR(subTax)}</span>
                <span className="ccn-sub-val">{fmtR(subTotal)}</span>
              </div>
            </div>

            {/* Bottom Left */}
            <div className="ccn-bottom-left">
              {!showNotes
                ? <button className="ccn-link" onClick={() => setShowNotes(true)}>+ Add Notes</button>
                : (
                  <div className="ccn-fg">
                    <label className="ccn-lbl">Notes</label>
                    <textarea className="ccn-textarea" rows={3} value={notes}
                      onChange={(e) => setNotes(e.target.value)} placeholder="Add notes..." />
                  </div>
                )
              }

              {/* Terms and Conditions */}
              <div className="ccn-terms-card">
                <div className="ccn-terms-head">
                  <span>Terms and Conditions</span>
                  <button className="ccn-terms-x"><FiX size={13} /></button>
                </div>
                <div className="ccn-terms-body">
                  <p>1. Goods once sold will not be taken back or exchanged</p>
                  <p>2. All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction only</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="ccn-right">

            {/* Meta Fields */}
            <div className="ccn-meta">
              <div className="ccn-meta-row2">
                <div className="ccn-fg">
                  <label className="ccn-lbl">Credit Note No:</label>
                  <input className="ccn-input" defaultValue="6" />
                </div>
                <div className="ccn-fg">
                  <label className="ccn-lbl">Credit Note Date:</label>
                  <div className="ccn-date-pill">
                    <LuCalendarDays size={13} />
                    <span>05 Apr 2026</span>
                    <span className="ccn-chev">&#8964;</span>
                  </div>
                </div>
              </div>

              {/* Link to Invoice */}
              <div className="ccn-fg">
                <label className="ccn-lbl">Link to Invoice :</label>
                <div className="ccn-search-wrap">
                  <FiSearch size={13} className="ccn-search-icon" />
                  <input className="ccn-search-input" placeholder="Search invoices" />
                </div>
              </div>

              {/* Extra fields */}
              <div className="ccn-extra-grid">
                <div className="ccn-fg">
                  <label className="ccn-lbl">E-Way Bill No:</label>
                  <input className="ccn-input ccn-muted" />
                </div>
                <div className="ccn-fg">
                  <label className="ccn-lbl">Challan No.:</label>
                  <input className="ccn-input ccn-muted" />
                </div>
                <div className="ccn-fg">
                  <label className="ccn-lbl">Financed By:</label>
                  <input className="ccn-input ccn-muted" />
                </div>
                <div className="ccn-fg">
                  <label className="ccn-lbl">Salesman:</label>
                  <input className="ccn-input ccn-muted" />
                </div>
                <div className="ccn-fg">
                  <label className="ccn-lbl">Email ID:</label>
                  <input className="ccn-input ccn-muted" />
                </div>
                <div className="ccn-fg">
                  <label className="ccn-lbl">Warranty Period:</label>
                  <input className="ccn-input ccn-muted" />
                </div>
              </div>
            </div>

            {/* Totals Panel */}
            <div className="ccn-totals">
              <div className="ccn-t-row">
                <button className="ccn-link">+ Add Additional Charges</button>
                <span>₹ 0</span>
              </div>
              <div className="ccn-t-row">
                <span className="ccn-t-label">Taxable Amount</span>
                <span>₹ 0</span>
              </div>
              <div className="ccn-t-row">
                <button className="ccn-link">+ Add Discount</button>
                <span>- ₹ 0</span>
              </div>

              <div className="ccn-check-row">
                <input type="checkbox" className="ccn-cb" checked={applyTCS}
                  onChange={(e) => setApplyTCS(e.target.checked)} />
                <span>Apply TCS</span>
              </div>

              <div className="ccn-check-row">
                <input type="checkbox" className="ccn-cb" checked={autoRound}
                  onChange={(e) => setAutoRound(e.target.checked)} />
                <span>Auto Round Off</span>
                <div className="ccn-round-add"><span>+ Add</span><span className="ccn-chev">&#8964;</span></div>
                <div className="ccn-round-wrap">
                  <span>₹</span>
                  <input className="ccn-round-input" defaultValue="0" readOnly />
                </div>
              </div>

              {/* Total Amount */}
              <div className="ccn-total-row">
                <span className="ccn-total-label">Total Amount</span>
                <input className="ccn-pay-input" placeholder="Enter Payment amount" readOnly />
              </div>

              {/* Mark as fully paid */}
              <div className="ccn-mark-row">
                <span>Mark as fully paid</span>
                <input type="checkbox" className="ccn-cb" checked={markPaid}
                  onChange={(e) => setMarkPaid(e.target.checked)} />
              </div>

              {/* Amount Received */}
              <div className="ccn-t-row ccn-t-border-top">
                <span className="ccn-t-label">Amount Received</span>
                <div className="ccn-amt-wrap">
                  <div className="ccn-rupee-box">
                    <span>₹</span>
                    <input type="number" className="ccn-amt-input" value={amtReceived}
                      onChange={(e) => setAmtReceived(e.target.value)} placeholder="0" />
                  </div>
                  <select className="ccn-pay-mode" value={payMode}
                    onChange={(e) => setPayMode(e.target.value)}>
                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Bank Transfer</option>
                    <option>Cheque</option>
                  </select>
                </div>
              </div>

              {/* Balance Amount */}
              <div className="ccn-balance-row">
                <span className="ccn-balance-label">Balance Amount</span>
                <span className="ccn-balance-val">₹ {balance > 0 ? balance.toFixed(0) : 0}</span>
              </div>

              {/* Signatory */}
              <div className="ccn-sign-section">
                <p className="ccn-sign-text">
                  Authorized signatory for <b>Mondal Electronics Concern</b>
                </p>
                <div className="ccn-sign-box" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Credit Note Settings Modal */}
      {showSettings && (
        <QuickCreditNoteSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default CreateCreditNote;
