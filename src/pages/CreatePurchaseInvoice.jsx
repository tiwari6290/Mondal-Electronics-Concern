import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import "./CreatePurchaseInvoice.css";
import {
  ChevronDown, Settings, Plus, Calendar,
  ArrowLeft, Keyboard, Smartphone, ScanLine, X, Share2,
} from "lucide-react";
import QuickPurchaseInvoiceSettings from "./Quickpurchaseinvoicesettings";

const CreatePurchaseInvoice = () => {
  const navigate = useNavigate();
  const [items, setItems]                 = useState([]);
  const [showSmsBanner, setShowSmsBanner] = useState(true);
  const [amountPaid, setAmountPaid]       = useState("0");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [showSettings, setShowSettings]   = useState(false);

  const addItem = () =>
    setItems([...items, { id: Date.now(), name: "", hsn: "", qty: 1, price: 0, discount: 0, tax: 0 }]);
  const removeItem = (id) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-content">
        <main className="cpi-main">

          {/* Header */}
          <div className="cpi-header">
            <div className="cpi-header-left">
              <button className="cpi-back-btn" onClick={() => navigate("/purchase-invoices")}>
                <ArrowLeft size={16} />
              </button>
              <h1 className="cpi-page-title">Create Purchase Invoice</h1>
            </div>
            <div className="cpi-header-actions">
              <button className="cpi-header-btn"><Keyboard size={15} /></button>
              <button className="cpi-header-btn">
                <Smartphone size={14} /><span>Upload using Phone</span>
              </button>
              <button
                className="cpi-header-btn cpi-settings-btn"
                onClick={() => setShowSettings(true)}
              >
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
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <QuickPurchaseInvoiceSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default CreatePurchaseInvoice;