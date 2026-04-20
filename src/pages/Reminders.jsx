import { useState } from "react";
import "./Reminders.css";

const ToggleSwitch = ({ checked, onChange }) => (
  <div
    className={`toggle-switch ${checked ? "toggle-on" : ""}`}
    onClick={() => onChange(!checked)}
    role="checkbox"
    aria-checked={checked}
    tabIndex={0}
    onKeyDown={(e) => e.key === " " && onChange(!checked)}
  >
    <div className="toggle-thumb" />
  </div>
);

const Checkbox = ({ checked, onChange }) => (
  <div
    className={`checkbox ${checked ? "checked" : ""}`}
    onClick={() => onChange(!checked)}
    role="checkbox"
    aria-checked={checked}
    tabIndex={0}
    onKeyDown={(e) => e.key === " " && onChange(!checked)}
  >
    {checked && (
      <svg viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4L3.8 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </div>
);

export default function ReminderSettings() {
  const [sendBillingWhatsapp, setSendBillingWhatsapp] = useState(true);
  const [getPaymentReminders, setGetPaymentReminders] = useState(false);

  const [toPartyOpen, setToPartyOpen] = useState(true);
  const [toYouOpen, setToYouOpen] = useState(true);

  // TO PARTY
  const [partyInvoice3Days, setPartyInvoice3Days] = useState(true);
  const [partyInvoiceOnDue, setPartyInvoiceOnDue] = useState(true);

  // TO YOU
  const [youSalesInvoice3Days, setYouSalesInvoice3Days] = useState(true);
  const [youSalesInvoiceOnDue, setYouSalesInvoiceOnDue] = useState(true);
  const [youLowStock, setYouLowStock] = useState(true);
  const [youPurchase3Days, setYouPurchase3Days] = useState(true);
  const [youPurchaseOnDue, setYouPurchaseOnDue] = useState(true);
  const [youDailySummaryOutstanding, setYouDailySummaryOutstanding] = useState(true);
  const [youDailySummaryYesterday, setYouDailySummaryYesterday] = useState(true);

  return (
    <div className="rs-page">
      {/* Header */}
      <div className="rs-header">
        <div className="rs-header-left">
          <h1 className="rs-title">Reminder Settings</h1>
          <p className="rs-subtitle">Select Which Reminders Are Sent To You And Your Parties</p>
        </div>
        <div className="rs-header-actions">
          <button className="rs-btn-chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Chat Support
          </button>
          <button className="rs-btn-cancel">Cancel</button>
          <button className="rs-btn-save">Save Changes</button>
        </div>
      </div>

      {/* Top Toggles */}
      <div className="rs-top-toggles">
        <div className="rs-toggle-card">
          <div className="rs-toggle-info">
            <span className="rs-toggle-label">Send billing Whatsapp/SMS to Party</span>
            <span className="rs-toggle-desc">Send Whatsapp/SMS to your Party on creating any transaction</span>
          </div>
          <ToggleSwitch checked={sendBillingWhatsapp} onChange={setSendBillingWhatsapp} />
        </div>
        <div className="rs-toggle-card">
          <div className="rs-toggle-info">
            <span className="rs-toggle-label">Get payment reminders on WhatsApp</span>
            <span className="rs-toggle-desc">Get WhatsApp alerts when you have to collect payment from customers</span>
          </div>
          <ToggleSwitch checked={getPaymentReminders} onChange={setGetPaymentReminders} />
        </div>
      </div>

      {/* TO PARTY Section */}
      <div className="rs-section">
        <div className="rs-section-header" onClick={() => setToPartyOpen(!toPartyOpen)}>
          <span>
            <strong>TO PARTY</strong>{" "}
            <span className="rs-section-note">(Reminders will be sent through sms)</span>
          </span>
          <span className={`rs-chevron ${toPartyOpen ? "open" : ""}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {toPartyOpen && (
          <div className="rs-section-body">
            <div className="rs-card">
              <div className="rs-card-title">Sales Invoice</div>
              <div className="rs-card-desc">Get reminded to collect payments on time</div>
              <div className="rs-checkbox-row">
                <span>3 days before due date</span>
                <Checkbox checked={partyInvoice3Days} onChange={setPartyInvoice3Days} />
              </div>
              <div className="rs-checkbox-row">
                <span>On due date</span>
                <Checkbox checked={partyInvoiceOnDue} onChange={setPartyInvoiceOnDue} />
              </div>
              <button className="rs-sample-btn">
                View sample SMS
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TO YOU Section */}
      <div className="rs-section">
        <div className="rs-section-header" onClick={() => setToYouOpen(!toYouOpen)}>
          <span>
            <strong>TO YOU</strong>{" "}
            <span className="rs-section-note">(Reminders will be sent on mobile app and whatsapp)</span>
          </span>
          <span className={`rs-chevron ${toYouOpen ? "open" : ""}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {toYouOpen && (
          <div className="rs-section-body rs-you-grid">
            {/* Sales Invoice */}
            <div className="rs-card">
              <div className="rs-card-title">Sales Invoice</div>
              <div className="rs-card-desc">Get reminded to collect payments on time</div>
              <div className="rs-checkbox-row">
                <span>3 days before due date</span>
                <Checkbox checked={youSalesInvoice3Days} onChange={setYouSalesInvoice3Days} />
              </div>
              <div className="rs-checkbox-row">
                <span>On due date</span>
                <Checkbox checked={youSalesInvoiceOnDue} onChange={setYouSalesInvoiceOnDue} />
              </div>
            </div>

            {/* Low Stock */}
            <div className="rs-card">
              <div className="rs-card-title">Low Stock</div>
              <div className="rs-card-desc">Get reminded to buy stock</div>
              <div className="rs-checkbox-row">
                <span>When stock is below low stock level</span>
                <Checkbox checked={youLowStock} onChange={setYouLowStock} />
              </div>
            </div>

            {/* Purchase Invoice */}
            <div className="rs-card">
              <div className="rs-card-title">Purchase Invoice</div>
              <div className="rs-card-desc">Get reminded to send payments on time</div>
              <div className="rs-checkbox-row">
                <span>3 days before due date</span>
                <Checkbox checked={youPurchase3Days} onChange={setYouPurchase3Days} />
              </div>
              <div className="rs-checkbox-row">
                <span>On due date</span>
                <Checkbox checked={youPurchaseOnDue} onChange={setYouPurchaseOnDue} />
              </div>
            </div>

            {/* Daily Summary */}
            <div className="rs-card">
              <div className="rs-card-title">Daily Summary</div>
              <div className="rs-card-desc">Get daily updates about</div>
              <div className="rs-checkbox-row">
                <span>Outstanding Collections and Payments</span>
                <Checkbox checked={youDailySummaryOutstanding} onChange={setYouDailySummaryOutstanding} />
              </div>
              <div className="rs-checkbox-row">
                <span>Yesterday's Sales</span>
                <Checkbox checked={youDailySummaryYesterday} onChange={setYouDailySummaryYesterday} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}