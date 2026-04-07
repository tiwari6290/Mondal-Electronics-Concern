import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import "./PurchaseInvoice.css";
import {
  ChevronDown, Settings, Plus, Search, Calendar,
  MessageSquare, BarChart2, RefreshCcw, ArrowLeft,
  Keyboard, Smartphone, ScanLine, X, Share2,
} from "lucide-react";
import { FaEllipsisV } from "react-icons/fa";

/* ─────────────────────────────────────────
   PURCHASE INVOICES LIST PAGE
───────────────────────────────────────── */
const PurchaseInvoicesList = ({ onCreateNew }) => {
  const [dateFilter, setDateFilter] = useState("Last 365 Days");

  const SAMPLE_DATA = [
    { id: 1, date: "10 Mar 2026", number: 4, party: "Aditiya",    dueIn: "-", amount: "₹ 0",      amountSub: "",                   status: ""       },
    { id: 2, date: "03 Mar 2026", number: 3, party: "anando",     dueIn: "-", amount: "₹ 38,000", amountSub: "(₹ 38,000 unpaid)",  status: "Unpaid" },
    { id: 3, date: "03 Mar 2026", number: 2, party: "Cash Sale",  dueIn: "-", amount: "₹ 0",      amountSub: "",                   status: ""       },
    { id: 4, date: "02 Mar 2026", number: 1, party: "anando",     dueIn: "-", amount: "₹ 0",      amountSub: "",                   status: ""       },
  ];

  return (
    <main className="pi-main">

      {/* Topbar */}
      <div className="pi-topbar">
        <h1 className="pi-title">Purchase Invoices</h1>
        <div className="pi-topbar-actions">
          <button className="pi-reports-btn">
            <BarChart2 size={15} />
            <span>Reports</span>
            <ChevronDown size={12} />
          </button>
          <button className="pi-icon-sq"><Settings size={15} /></button>
          <button className="pi-icon-sq"><MessageSquare size={15} /></button>
        </div>
      </div>

      {/* Summary Cards — full width, no outer margin */}
      <div className="pi-cards">
        <div className="pi-card pi-card--total">
          <div className="pi-card-header">
            <RefreshCcw size={13} className="pi-card-icon-total" />
            <span>Total Purchases</span>
          </div>
          <div className="pi-card-amount">₹ 38,000</div>
        </div>
        <div className="pi-card pi-card--paid">
          <div className="pi-card-header">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pi-card-icon-paid">
              <circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" />
            </svg>
            <span>Paid</span>
          </div>
          <div className="pi-card-amount">₹ 0</div>
        </div>
        <div className="pi-card pi-card--unpaid">
          <div className="pi-card-header">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pi-card-icon-unpaid">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Unpaid</span>
          </div>
          <div className="pi-card-amount">₹ 38,000</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="pi-filterbar">
        <button className="pi-search-btn"><Search size={14} /></button>
        <div className="pi-date-select-wrap">
          <Calendar size={13} className="pi-date-cal" />
          <select
            className="pi-date-select"
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
          >
            <option>Last 365 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <ChevronDown size={11} className="pi-date-chev" />
        </div>
        <div className="pi-filterbar-spacer" />
        <button className="pi-create-btn" onClick={onCreateNew}>
          Create Purchase Invoice
        </button>
      </div>

      {/* Table */}
      <div className="pi-table-wrap">
        <table className="pi-table">
          <thead>
            <tr>
              <th>Date <span className="pi-sort">↕</span></th>
              <th>Purchase Invoice Number</th>
              <th>Party Name</th>
              <th>Due In</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_DATA.map(row => (
              <tr key={row.id} className="pi-row">
                <td>{row.date}</td>
                <td>{row.number}</td>
                <td>{row.party}</td>
                <td>{row.dueIn}</td>
                <td>
                  <div>{row.amount}</div>
                  {row.amountSub && <div className="pi-amount-sub">{row.amountSub}</div>}
                </td>
                <td>
                  {row.status && (
                    <span className={`pi-badge pi-badge--${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  )}
                </td>
                <td><button className="pi-menu-btn"><FaEllipsisV /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </main>
  );
};

/* ─────────────────────────────────────────
   CREATE PURCHASE INVOICE PAGE
───────────────────────────────────────── */
const CreatePurchaseInvoice = ({ onBack }) => {
  const [items, setItems]                 = useState([]);
  const [showSmsBanner, setShowSmsBanner] = useState(true);
  const [amountPaid, setAmountPaid]       = useState("0");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const addItem = () =>
    setItems([...items, { id: Date.now(), name: "", hsn: "", qty: 1, price: 0, discount: 0, tax: 0 }]);
  const removeItem = (id) => setItems(items.filter(i => i.id !== id));

  return (
    <main className="cpi-main">
      {/* Header */}
      <div className="cpi-header">
        <div className="cpi-header-left">
          <button className="cpi-back-btn" onClick={onBack}><ArrowLeft size={16} /></button>
          <h1 className="cpi-page-title">Create Purchase Invoice</h1>
        </div>
        <div className="cpi-header-actions">
          <button className="cpi-header-btn"><Keyboard size={15} /></button>
          <button className="cpi-header-btn">
            <Smartphone size={14} /><span>Upload using Phone</span>
          </button>
          <button className="cpi-header-btn cpi-settings-btn">
            <Settings size={14} /><span>Settings</span>
            <span className="cpi-settings-dot" />
          </button>
          <button className="cpi-header-btn cpi-savenew-btn">Save &amp; New</button>
          <button className="cpi-save-btn">Save</button>
        </div>
      </div>

      {/* SMS Banner */}
      {showSmsBanner && (
        <div className="cpi-sms-banner">
          <Share2 size={14} className="cpi-sms-icon" />
          <div className="cpi-sms-text">
            <strong>Invoice Auto-SMS to Party is turned on</strong>
            <span>An SMS with the invoice details and link is sent to the party after the invoice has been created</span>
          </div>
          <button className="cpi-change-settings-btn">Change Settings</button>
          <button className="cpi-sms-close" onClick={() => setShowSmsBanner(false)}><X size={14} /></button>
        </div>
      )}

      <div className="cpi-body">
        {/* Left */}
        <div className="cpi-left">
          <div className="cpi-section-label">Bill From</div>
          <div className="cpi-party-box">
            <button className="cpi-add-party-btn"><Plus size={14} />Add Party</button>
          </div>

          <div className="cpi-items-table">
            <div className="cpi-items-header">
              <span className="cpi-col-no">NO</span>
              <span className="cpi-col-item">ITEMS / SERVICES</span>
              <span className="cpi-col-hsn">HSN / SAC</span>
              <span className="cpi-col-qty">QTY</span>
              <span className="cpi-col-price">PRICE/ITEM (₹)</span>
              <span className="cpi-col-disc">DISCOUNT</span>
              <span className="cpi-col-tax">TAX</span>
              <span className="cpi-col-amt">AMOUNT (₹)</span>
              <button className="cpi-add-col-btn" onClick={addItem}><Plus size={13} /></button>
            </div>
            {items.map((item, idx) => (
              <div className="cpi-item-row" key={item.id}>
                <span className="cpi-col-no">{idx + 1}</span>
                <input className="cpi-col-item cpi-input" placeholder="Item name" />
                <input className="cpi-col-hsn cpi-input" placeholder="HSN" />
                <input className="cpi-col-qty cpi-input" type="number" defaultValue={1} />
                <input className="cpi-col-price cpi-input" type="number" defaultValue={0} />
                <input className="cpi-col-disc cpi-input" type="number" defaultValue={0} />
                <input className="cpi-col-tax cpi-input" placeholder="None" />
                <span className="cpi-col-amt">₹ 0</span>
                <button className="cpi-remove-row" onClick={() => removeItem(item.id)}><X size={12} /></button>
              </div>
            ))}
            <div className="cpi-add-item-row">
              <button className="cpi-add-item-btn" onClick={addItem}>+ Add Item</button>
              <button className="cpi-scan-btn"><ScanLine size={15} />Scan Barcode</button>
            </div>
            <div className="cpi-subtotal-row">
              <span className="cpi-subtotal-label">SUBTOTAL</span>
              <span className="cpi-subtotal-val">₹ 0</span>
              <span className="cpi-subtotal-val">₹ 0</span>
              <span className="cpi-subtotal-val">₹ 0</span>
            </div>
          </div>

          <button className="cpi-add-notes-btn">+ Add Notes</button>
          <div className="cpi-terms-box">
            <div className="cpi-terms-header">
              <span>Terms and Conditions</span>
              <button className="cpi-terms-close"><X size={13} /></button>
            </div>
            <ol className="cpi-terms-list">
              <li>Goods once sold will not be taken back or exchanged</li>
              <li>All disputes are subject to [ENTER_YOUR_CITY_NAME] jurisdiction only</li>
            </ol>
          </div>
          <div className="cpi-bottom-links">
            <button className="cpi-link-btn">+ Add Bank Account</button>
            <button className="cpi-link-btn">+ Add Payment QR</button>
          </div>
        </div>

        {/* Right */}
        <div className="cpi-right">
          <div className="cpi-meta-grid">
            <div className="cpi-meta-field">
              <label>Purchase Inv No.</label>
              <input className="cpi-meta-input" defaultValue="1" />
            </div>
            <div className="cpi-meta-field">
              <label>Purchase Inv Date</label>
              <div className="cpi-date-input">
                <Calendar size={13} /><span>06 Apr 2026</span><ChevronDown size={12} />
              </div>
            </div>
            <div className="cpi-meta-field">
              <label>Original Inv No.</label>
              <input className="cpi-meta-input" placeholder="—" />
            </div>
          </div>
          <div className="cpi-meta-grid cpi-meta-grid--2">
            <div className="cpi-meta-field">
              <label>Payment Terms</label>
              <div className="cpi-payment-terms">
                <input className="cpi-meta-input" defaultValue="30" />
                <span className="cpi-days-label">days</span>
              </div>
            </div>
            <div className="cpi-meta-field">
              <label>Due Date</label>
              <div className="cpi-date-input">
                <Calendar size={13} /><span>06 May 2026</span><ChevronDown size={12} />
              </div>
            </div>
          </div>
          <div className="cpi-divider" />
          <div className="cpi-totals">
            <div className="cpi-total-row">
              <button className="cpi-link-sm">+ Add Additional Charges</button><span>₹ 0</span>
            </div>
            <div className="cpi-total-row">
              <span>Taxable Amount</span><span>₹ 0</span>
            </div>
            <div className="cpi-total-row">
              <button className="cpi-link-sm">+ Add Discount</button>
              <span className="cpi-red">- ₹ 0</span>
            </div>
            <div className="cpi-total-row cpi-checkbox-row">
              <label className="cpi-checkbox-label">
                <input type="checkbox" />Auto Round Off
              </label>
              <div className="cpi-round-add">
                <button className="cpi-link-sm">+ Add</button>
                <ChevronDown size={11} /><span>₹ 0</span>
              </div>
            </div>
          </div>
          <div className="cpi-divider" />
          <div className="cpi-grand-total-row">
            <span className="cpi-grand-label">Total Amount</span>
            <input className="cpi-grand-input" placeholder="Enter Payment amount" />
          </div>
          <div className="cpi-fullpaid-row">
            <label className="cpi-checkbox-label">
              <input type="checkbox" />Mark as fully paid
            </label>
          </div>
          <div className="cpi-amount-paid-row">
            <label>Amount Paid</label>
            <div className="cpi-amount-paid-inputs">
              <div className="cpi-amount-paid-input-wrap">
                <span className="cpi-rupee">₹</span>
                <input className="cpi-amount-input" value={amountPaid} onChange={e => setAmountPaid(e.target.value)} />
              </div>
              <select className="cpi-payment-select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>UPI</option>
                <option>Cheque</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

/* ─────────────────────────────────────────
   ROOT — wired to React Router
───────────────────────────────────────── */
const PurchaseInvoiceApp = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("list");

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        {page === "list"   && <PurchaseInvoicesList   onCreateNew={() => setPage("create")} />}
        {page === "create" && <CreatePurchaseInvoice  onBack={() => setPage("list")} />}
      </div>
    </div>
  );
};

export default PurchaseInvoiceApp;