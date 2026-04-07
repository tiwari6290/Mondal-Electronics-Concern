import { useState } from "react";
import {
  Search,
  ChevronDown,
  Settings,
  LayoutGrid,
  ClipboardList,
  ArrowLeft,
  Calendar,
  Plus,
  X,
  FileX,
} from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Expenses.css";

/* ─── tiny helpers ─── */
function Toggle({ on, onToggle }) {
  return (
    <div className={`ex-tog${on ? " ex-tog-on" : ""}`} onClick={onToggle} />
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function ExpensesPage() {
  /* view: "list" | "create" */
  const [view, setView]                     = useState("list");
  const [expenses, setExpenses]             = useState([]);

  /* create-expense form */
  const [gstOn, setGstOn]                   = useState(false);
  const [category, setCategory]             = useState("");
  const [expenseNumber, setExpenseNumber]   = useState("1");
  const [originalInvoice, setOriginalInvoice] = useState("");
  const [date, setDate]                     = useState("4 Apr 2026");
  const [paymentMode, setPaymentMode]       = useState("");
  const [note, setNote]                     = useState("");
  const [expenseItems, setExpenseItems]     = useState([]);

  /* modals */
  const [showAddItem, setShowAddItem]       = useState(false);
  const [showCreateItem, setShowCreateItem] = useState(false);
  const [showSettings, setShowSettings]     = useState(false);

  /* settings state */
  const [prefixOn, setPrefixOn]             = useState(true);
  const [prefix, setPrefix]                 = useState("Prefix");
  const [seqNum, setSeqNum]                 = useState("1");
  const [showImageOn, setShowImageOn]       = useState(true);

  /* new expense item form */
  const [newItem, setNewItem] = useState({
    name: "", type: "Product", price: "0", tax: "Without Tax",
    unit: "", hsn: "", gstRate: "None", itc: "Eligible",
  });

  /* ── total ── */
  const total = expenseItems.reduce((s, i) => s + parseFloat(i.price || 0), 0);

  /* ── save expense item ── */
  const handleSaveItem = () => {
    if (!newItem.name) return;
    setExpenseItems((p) => [...p, { ...newItem, id: Date.now() }]);
    setNewItem({ name: "", type: "Product", price: "0", tax: "Without Tax", unit: "", hsn: "", gstRate: "None", itc: "Eligible" });
    setShowCreateItem(false);
    setShowAddItem(false);
  };

  /* ── save expense ── */
  const handleSaveExpense = () => {
    if (expenseItems.length === 0) return;
    const exp = {
      id: Date.now(),
      date,
      number: expenseNumber,
      party: "-",
      category: category || "-",
      amount: `₹ ${total.toLocaleString("en-IN")}`,
    };
    setExpenses((p) => [...p, exp]);
    // reset
    setExpenseItems([]);
    setCategory(""); setNote(""); setPaymentMode(""); setOriginalInvoice("");
    setGstOn(false);
    setView("list");
  };

  /* ────────────────────────────────────────
     SETTINGS MODAL (shared)
  ──────────────────────────────────────── */
  const SettingsModal = () => (
    <div className="ex-overlay" onClick={() => setShowSettings(false)}>
      <div className="ex-modal ex-settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ex-modal-hd">
          <h2>Quick Expense Settings</h2>
          <button className="ex-modal-x" onClick={() => setShowSettings(false)}><X size={16} /></button>
        </div>

        <div className="ex-modal-bd ex-settings-bd">
          {/* Prefix block */}
          <div className={`ex-settings-block${prefixOn ? " ex-settings-block-on" : ""}`}>
            <div className="ex-settings-block-hd">
              <div className="ex-settings-block-text">
                <span className="ex-set-title">Expense Prefix &amp; Sequence Number</span>
                <span className="ex-set-desc">Add your custom prefix &amp; sequence for Expense Numbering</span>
              </div>
              <Toggle on={prefixOn} onToggle={() => setPrefixOn((v) => !v)} />
            </div>
            {prefixOn && (
              <div className="ex-prefix-fields">
                <div className="ex-prefix-col">
                  <label>Prefix</label>
                  <input value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="Prefix" />
                </div>
                <div className="ex-prefix-col">
                  <label>Sequence Number</label>
                  <input value={seqNum} onChange={(e) => setSeqNum(e.target.value)} />
                </div>
                <p className="ex-expense-num-preview">Expense Number: {seqNum}</p>
              </div>
            )}
          </div>

          {/* Show Image block */}
          <div className={`ex-settings-block${showImageOn ? " ex-settings-block-on" : ""}`}>
            <div className="ex-settings-block-hd">
              <div className="ex-settings-block-text">
                <span className="ex-set-title">Show Item Image on Invoice</span>
                <span className="ex-set-desc">This will apply to all vouchers except for Payment In and Payment Out</span>
              </div>
              <Toggle on={showImageOn} onToggle={() => setShowImageOn((v) => !v)} />
            </div>
          </div>
        </div>

        <div className="ex-modal-ft">
          <button className="ex-btn-cancel" onClick={() => setShowSettings(false)}>Cancel</button>
          <button className="ex-btn-save" onClick={() => setShowSettings(false)}>Save</button>
        </div>
      </div>
    </div>
  );

  /* ────────────────────────────────────────
     LIST VIEW
  ──────────────────────────────────────── */
  if (view === "list") return (
    <div className="ex-layout">
      <Sidebar />
      <main className="ex-main">
        <div className="ex-header">
          <h1 className="ex-title">Expenses</h1>
          <div className="ex-hdr-right">
            <div className="ex-reports-wrap">
              <button className="ex-reports-btn">
                <ClipboardList size={14} /> Reports <ChevronDown size={13} />
              </button>
            </div>
            <button className="ex-icon-btn" onClick={() => setShowSettings(true)}><Settings size={16} /></button>
            <button className="ex-icon-btn"><LayoutGrid size={16} /></button>
          </div>
        </div>

        {/* filter bar */}
        <div className="ex-filterbar">
          <button className="ex-filter-search-btn"><Search size={14} /></button>
          <div className="ex-filter-select">
            <Calendar size={13} className="ex-filter-ico" />
            <span>Last 365 Days</span>
            <ChevronDown size={13} />
          </div>
          <div className="ex-filter-select">
            <span>All Expenses Categories</span>
            <ChevronDown size={13} />
          </div>
          <button className="ex-create-btn" onClick={() => setView("create")}>Create Expense</button>
        </div>

        {/* table */}
        <div className="ex-tbl-wrap">
          <table className="ex-tbl">
            <thead>
              <tr>
                <th>Date <span className="ex-sort">↕</span></th>
                <th>Expense Number</th>
                <th>Party Name</th>
                <th>Category</th>
                <th>Amount <span className="ex-sort">↕</span></th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="ex-empty-cell">
                    <div className="ex-empty">
                      <FileX size={48} strokeWidth={1} className="ex-empty-ico" />
                      <span>No Transactions Matching the current filter</span>
                    </div>
                  </td>
                </tr>
              ) : expenses.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.date}</td>
                  <td>{exp.number}</td>
                  <td>{exp.party}</td>
                  <td>{exp.category}</td>
                  <td>{exp.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showSettings && <SettingsModal />}
    </div>
  );

  /* ────────────────────────────────────────
     CREATE EXPENSE VIEW
  ──────────────────────────────────────── */
  return (
    <div className="ex-layout">
      <Sidebar />
      <main className="ex-main">
        {/* header */}
        <div className="ex-header">
          <div className="ex-hdr-left">
            <button className="ex-back-btn" onClick={() => setView("list")}><ArrowLeft size={18} /></button>
            <h1 className="ex-title">Create Expense</h1>
          </div>
          <div className="ex-hdr-right">
            <button className="ex-icon-btn" onClick={() => setShowSettings(true)}><Settings size={16} /></button>
            <button className="ex-btn-cancel-sm" onClick={() => setView("list")}>Cancel</button>
            <button className="ex-btn-save-sm" onClick={handleSaveExpense}>Save</button>
          </div>
        </div>

        <div className="ex-create-body">
          {/* ── Left panel ── */}
          <div className="ex-panel-left">
            {/* GST toggle row */}
            <div className="ex-gst-row">
              <span className="ex-gst-label">Expense With GST</span>
              <Toggle on={gstOn} onToggle={() => setGstOn((v) => !v)} />
            </div>

            {/* Expense Category */}
            <div className="ex-field">
              <label>Expense Category</label>
              <div className="ex-select-wrap">
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  <option>Travel</option>
                  <option>Office Supplies</option>
                  <option>Utilities</option>
                  <option>Marketing</option>
                  <option>Other</option>
                </select>
                <ChevronDown size={13} className="ex-sel-caret" />
              </div>
            </div>

            {/* Expense Number */}
            <div className="ex-field">
              <label>Expense Number</label>
              <input
                className="ex-input"
                value={expenseNumber}
                onChange={(e) => setExpenseNumber(e.target.value)}
              />
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="ex-panel-right">
            <div className="ex-field">
              <label>Original Invoice Number</label>
              <input
                className="ex-input"
                value={originalInvoice}
                onChange={(e) => setOriginalInvoice(e.target.value)}
              />
            </div>

            <div className="ex-field">
              <label>Date</label>
              <div className="ex-date-wrap">
                <Calendar size={14} className="ex-date-ico" />
                <input
                  className="ex-input ex-date-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <ChevronDown size={13} className="ex-sel-caret" />
              </div>
            </div>

            <div className="ex-field">
              <label>Payment Mode</label>
              <div className="ex-select-wrap">
                <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                  <option value="">Select</option>
                  <option>Cash</option>
                  <option>Bank Transfer</option>
                  <option>UPI</option>
                  <option>Credit Card</option>
                </select>
                <ChevronDown size={13} className="ex-sel-caret" />
              </div>
            </div>

            <div className="ex-field">
              <label>Note</label>
              <textarea
                className="ex-textarea"
                placeholder="Enter Notes"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ── Items added ── */}
        {expenseItems.length > 0 && (
          <div className="ex-items-list">
            {expenseItems.map((item, idx) => (
              <div key={item.id} className="ex-item-chip">
                <span>{item.name}</span>
                <span className="ex-item-price">₹ {parseFloat(item.price).toLocaleString("en-IN")}</span>
                <button className="ex-item-remove" onClick={() =>
                  setExpenseItems((p) => p.filter((_, i) => i !== idx))
                }><X size={13} /></button>
              </div>
            ))}
          </div>
        )}

        {/* ── Add Item button ── */}
        <button className="ex-add-item-btn" onClick={() => setShowAddItem(true)}>
          <Plus size={14} /> Add Item
        </button>

        {/* Total */}
        <div className="ex-total-row">
          <span className="ex-total-label">Total Expense Amount</span>
          <div className="ex-total-box">
            <span className="ex-total-currency">₹</span>
            <span className="ex-total-val">{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </main>

      {/* ── Add Expense Items modal ── */}
      {showAddItem && (
        <div className="ex-overlay" onClick={() => setShowAddItem(false)}>
          <div className="ex-modal ex-add-item-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ex-modal-hd">
              <h2>Add Expense Items</h2>
              <button className="ex-modal-x" onClick={() => setShowAddItem(false)}><X size={16} /></button>
            </div>

            <div className="ex-add-item-body">
              {expenseItems.length === 0 ? (
                <div className="ex-no-items">
                  <div className="ex-no-items-illo">
                    <div className="ex-illo-sheet" />
                    <div className="ex-illo-wallet">
                      <FileX size={32} strokeWidth={1.2} className="ex-illo-icon" />
                    </div>
                    <div className="ex-illo-cash" />
                  </div>
                  <p className="ex-no-items-title">No Expense Items yet</p>
                  <p className="ex-no-items-sub">Let's create your first Expense Item</p>
                  <button className="ex-create-item-btn" onClick={() => setShowCreateItem(true)}>
                    Create Expense Item
                  </button>
                </div>
              ) : (
                <div className="ex-items-in-modal">
                  {expenseItems.map((item, idx) => (
                    <div key={item.id} className="ex-item-row-modal">
                      <span>{item.name}</span>
                      <span>₹ {parseFloat(item.price).toLocaleString("en-IN")}</span>
                      <button onClick={() => setExpenseItems((p) => p.filter((_, i) => i !== idx))}>
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                  <button className="ex-create-item-btn ex-add-more-btn" onClick={() => setShowCreateItem(true)}>
                    <Plus size={13} /> Add More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Create New Expense Item modal ── */}
      {showCreateItem && (
        <div className="ex-overlay ex-overlay-top" onClick={() => setShowCreateItem(false)}>
          <div className="ex-modal ex-create-item-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ex-modal-hd">
              <h2>Create New Expense Item</h2>
              <button className="ex-modal-x" onClick={() => setShowCreateItem(false)}><X size={16} /></button>
            </div>

            <div className="ex-modal-bd">
              <div className="ex-ci-grid">
                {/* Item Name */}
                <div className="ex-ci-field">
                  <label>Item Name</label>
                  <input
                    className="ex-input"
                    value={newItem.name}
                    onChange={(e) => setNewItem((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>

                {/* Item Type */}
                <div className="ex-ci-field">
                  <label>Item Type</label>
                  <div className="ex-type-row">
                    <label className={`ex-type-opt${newItem.type === "Product" ? " ex-type-sel" : ""}`}>
                      <input type="radio" name="type" value="Product"
                        checked={newItem.type === "Product"}
                        onChange={() => setNewItem((p) => ({ ...p, type: "Product" }))} />
                      <span className="ex-radio-dot" /> Product
                    </label>
                    <label className={`ex-type-opt${newItem.type === "Service" ? " ex-type-sel" : ""}`}>
                      <input type="radio" name="type" value="Service"
                        checked={newItem.type === "Service"}
                        onChange={() => setNewItem((p) => ({ ...p, type: "Service" }))} />
                      <span className="ex-radio-dot" /> Service
                    </label>
                  </div>
                </div>

                {/* Purchase Price */}
                <div className="ex-ci-field">
                  <label>Purchase Price</label>
                  <div className="ex-price-wrap">
                    <input
                      className="ex-input ex-price-inp"
                      value={newItem.price}
                      onChange={(e) => setNewItem((p) => ({ ...p, price: e.target.value }))}
                    />
                    <div className="ex-tax-sel">
                      <select value={newItem.tax} onChange={(e) => setNewItem((p) => ({ ...p, tax: e.target.value }))}>
                        <option>Without Tax</option>
                        <option>With Tax</option>
                      </select>
                      <ChevronDown size={12} className="ex-sel-caret" />
                    </div>
                  </div>
                </div>

                {/* Measuring Unit */}
                <div className="ex-ci-field">
                  <label>Measuring Unit</label>
                  <div className="ex-select-wrap">
                    <Search size={13} className="ex-filter-ico" />
                    <select value={newItem.unit} onChange={(e) => setNewItem((p) => ({ ...p, unit: e.target.value }))}>
                      <option value="">Select Measuring Unit</option>
                      <option>PCS</option>
                      <option>KG</option>
                      <option>LTR</option>
                      <option>MTR</option>
                    </select>
                    <ChevronDown size={13} className="ex-sel-caret" />
                  </div>
                </div>

                {/* HSN */}
                <div className="ex-ci-field">
                  <label>HSN</label>
                  <input
                    className="ex-input"
                    value={newItem.hsn}
                    onChange={(e) => setNewItem((p) => ({ ...p, hsn: e.target.value }))}
                  />
                </div>

                {/* GST Tax Rate */}
                <div className="ex-ci-field">
                  <label>GST Tax rate %</label>
                  <div className="ex-select-wrap">
                    <Search size={13} className="ex-filter-ico" />
                    <select value={newItem.gstRate} onChange={(e) => setNewItem((p) => ({ ...p, gstRate: e.target.value }))}>
                      <option>None</option>
                      <option>5%</option>
                      <option>12%</option>
                      <option>18%</option>
                      <option>28%</option>
                    </select>
                    <ChevronDown size={13} className="ex-sel-caret" />
                  </div>
                </div>

                {/* ITC Applicable */}
                <div className="ex-ci-field">
                  <label>ITC Applicable</label>
                  <div className="ex-select-wrap">
                    <select value={newItem.itc} onChange={(e) => setNewItem((p) => ({ ...p, itc: e.target.value }))}>
                      <option>Eligible</option>
                      <option>Ineligible</option>
                    </select>
                    <ChevronDown size={13} className="ex-sel-caret" />
                  </div>
                </div>
              </div>
            </div>

            <div className="ex-modal-ft">
              <button className="ex-btn-cancel" onClick={() => setShowCreateItem(false)}>Cancel</button>
              <button className="ex-btn-save" onClick={handleSaveItem}>Save Item</button>
            </div>
          </div>
        </div>
      )}

      {showSettings && <SettingsModal />}
    </div>
  );
}