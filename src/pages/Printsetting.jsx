import { useState, useRef } from "react";
import "./Printsetting.css";

const TAX_INVOICE_PREVIEW = () => (
  <div className="ps-invoice">
    <div className="ps-invoice-title">TAX INVOICE</div>
    <div className="ps-invoice-center ps-invoice-bold">Business Name</div>
    <div>Phone No: 7003025622</div>
    <hr className="ps-invoice-hr-solid" />
    <div>Invoice Number: RT/24/272</div>
    <div>Invoice Date:</div>
    <div>Bill To: Cash Sale</div>
    <hr className="ps-invoice-hr-dashed" />
    <div className="ps-invoice-row"><span>SN Items</span></div>
    <div className="ps-invoice-row"><span>Qty &nbsp; Rate &nbsp; MRP</span><span>Amt</span></div>
    <div className="ps-invoice-row"><span>Item Code &nbsp; Disc</span><span>Tax</span></div>
    <hr className="ps-invoice-hr-dashed" />
    <div>1 &nbsp; Cleanic 100% bleach</div>
    <div className="ps-invoice-row"><span>1.0 PCS 168.64 &nbsp;199</span><span>189.05</span></div>
    <div className="ps-invoice-row"><span>- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.00%</span><span>18.00%</span></div>
    <div>2 &nbsp; AP Honey 500g</div>
    <div className="ps-invoice-row"><span>2.0 PCS 211.86 &nbsp;265</span><span>500</span></div>
    <div className="ps-invoice-row"><span>APH28292 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span><span>18.00%</span></div>
    <div>3 &nbsp; Colgate Electric Toothbrush</div>
    <div className="ps-invoice-row"><span>1.0 PCS 651.69 &nbsp;899</span><span>730.55</span></div>
    <div className="ps-invoice-row"><span>RTTE88292 &nbsp;&nbsp;&nbsp; 5.00%</span><span>18.00%</span></div>
    <hr className="ps-invoice-hr-dashed" />
    <div className="ps-invoice-row"><span>Sub Total</span><span>₹1,419.60</span></div>
    <hr className="ps-invoice-hr-dashed" />
    <div className="ps-invoice-row"><span>Taxable Amount</span><span>₹1,203.05</span></div>
    <div className="ps-invoice-row"><span>SGST 9%</span><span>₹108.27</span></div>
    <div className="ps-invoice-row"><span>CGST 9%</span><span>₹108.27</span></div>
    <hr className="ps-invoice-hr-dashed" />
    <div className="ps-invoice-row"><span>Total Amount</span><span>₹1,636.15</span></div>
    <div className="ps-invoice-row"><span>Paid Amount</span><span>₹1,220.60</span></div>
    <div className="ps-invoice-row"><span>Balance Amount</span><span>₹0.00</span></div>
    <hr className="ps-invoice-hr-dashed" />
    <div>Notes</div>
    <div>We offer doorstep delivery for large orders. Enquire at cash counter or call us for details.</div>
    <div style={{ marginTop: "6px" }}>Terms and Conditions</div>
    <div>1. Goods once sold will not be taken back or exchanged</div>
    <div>2. All disputes are subject to PUNE jurisdiction only</div>
  </div>
);

const LabelPrinterIcon = () => (
  <svg width="160" height="140" viewBox="0 0 200 170" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="20" width="140" height="100" rx="14" fill="#2d2d2d"/>
    <rect x="50" y="10" width="100" height="40" rx="8" fill="#3a3a3a"/>
    <rect x="60" y="105" width="80" height="40" rx="4" fill="#f0f0f0"/>
    <rect x="70" y="112" width="60" height="6" rx="2" fill="#888"/>
    <rect x="70" y="122" width="60" height="6" rx="2" fill="#888"/>
    <rect x="70" y="132" width="40" height="6" rx="2" fill="#888"/>
    <circle cx="155" cy="50" r="8" fill="#4f46e5"/>
    <rect x="85" y="55" width="30" height="8" rx="3" fill="#555"/>
  </svg>
);

const A4PrinterIcon = () => (
  <svg width="160" height="150" viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="50" width="160" height="90" rx="12" fill="#2d2d2d"/>
    <rect x="40" y="30" width="120" height="35" rx="6" fill="#3a3a3a"/>
    <rect x="50" y="125" width="100" height="50" rx="4" fill="#f0f0f0"/>
    <rect x="58" y="133" width="84" height="5" rx="2" fill="#bbb"/>
    <rect x="58" y="141" width="84" height="5" rx="2" fill="#bbb"/>
    <rect x="58" y="149" width="84" height="5" rx="2" fill="#bbb"/>
    <rect x="58" y="157" width="60" height="5" rx="2" fill="#bbb"/>
    <rect x="30" y="62" width="140" height="8" rx="3" fill="#555"/>
    <circle cx="160" cy="75" r="7" fill="#4f46e5" opacity="0.7"/>
  </svg>
);

const CheckIcon = () => (
  <div className="ps-check-circle">
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2.5 6.5L5.5 9.5L10.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export default function PrintSettings() {
  const [activeTab, setActiveTab] = useState("thermal");
  const [thermalSize, setThermalSize] = useState(null);
  const [barcodeType, setBarcodeType] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="ps-page">

      {/* Topbar */}
      <div className="ps-topbar">
        <h2 className="ps-title">Print Settings</h2>
        <div className="ps-topbar-right">
          <button className="ps-icon-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="10" rx="2" stroke="#888" strokeWidth="1.2"/>
              <rect x="3" y="6" width="2" height="1.5" rx="0.5" fill="#888"/>
              <rect x="7" y="6" width="2" height="1.5" rx="0.5" fill="#888"/>
              <rect x="11" y="6" width="2" height="1.5" rx="0.5" fill="#888"/>
              <rect x="5" y="9" width="6" height="1.5" rx="0.5" fill="#888"/>
            </svg>
          </button>
          <button className="ps-chat-btn">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 2h12v10H9l-3 2v-2H2V2z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            </svg>
            Chat Support
          </button>
          <button className="ps-cancel-btn">Cancel</button>
          <button className="ps-save-btn">Save Changes</button>
        </div>
      </div>

      {/* Body */}
      <div className="ps-body">

        {/* Left Panel */}
        <div className="ps-left-panel">
          <div className="ps-tabs">
            <button
              className={`ps-tab ${activeTab === "thermal" ? "active" : ""}`}
              onClick={() => setActiveTab("thermal")}
            >
              Thermal Printer
            </button>
            <button
              className={`ps-tab ${activeTab === "barcode" ? "active" : ""}`}
              onClick={() => setActiveTab("barcode")}
            >
              Barcode Printer
            </button>
          </div>

          {/* Thermal Tab */}
          {activeTab === "thermal" && (
            <>
              <div className="ps-section-label">Select your Invoice theme</div>

              <div
                className={`ps-option-row ${thermalSize === "2inch" ? "selected" : ""}`}
                onClick={() => setThermalSize(thermalSize === "2inch" ? null : "2inch")}
              >
                <span className="ps-option-label">2 Inch</span>
                {thermalSize === "2inch" && <CheckIcon />}
              </div>

              <div
                className={`ps-option-row ${thermalSize === "3inch" ? "selected" : ""}`}
                onClick={() => setThermalSize(thermalSize === "3inch" ? null : "3inch")}
              >
                <span className="ps-option-label">3 Inch</span>
                {thermalSize === "3inch" && <CheckIcon />}
              </div>

              <div className="ps-divider" />
              <div className="ps-section-label">Business Logo</div>

              <div className="ps-upload-box" onClick={() => fileInputRef.current?.click()}>
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="ps-logo-preview" />
                ) : (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" rx="8" fill="#e5e7eb"/>
                    <path d="M16 30l7-9 5 6 3-4 6 7H16z" stroke="#aaa" strokeWidth="1.5" fill="none"/>
                    <circle cx="31" cy="19" r="3" stroke="#aaa" strokeWidth="1.5"/>
                  </svg>
                )}
                <span className="ps-upload-link">
                  {logoPreview ? "Change Logo" : "Upload Monochrome Logo"}
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".bmp,image/*"
                  style={{ display: "none" }}
                  onChange={handleLogoUpload}
                />
              </div>

              <div className="ps-logo-note">
                You can only upload your logo in Monochrome, *.bmp extension and 210px (max width) x 70px (max height) dimensions. To learn how to resize and covert your logo to Monochrome{" "}
                <a href="#">click here.</a>
              </div>
            </>
          )}

          {/* Barcode Tab */}
          {activeTab === "barcode" && (
            <>
              <div
                className={`ps-option-row ${barcodeType === "label" ? "selected" : ""}`}
                onClick={() => setBarcodeType(barcodeType === "label" ? null : "label")}
              >
                <span className="ps-option-label">Label Print</span>
                {barcodeType === "label" && <CheckIcon />}
              </div>
              <div
                className={`ps-option-row ${barcodeType === "a4" ? "selected" : ""}`}
                onClick={() => setBarcodeType(barcodeType === "a4" ? null : "a4")}
              >
                <span className="ps-option-label">A4 Print</span>
                {barcodeType === "a4" && <CheckIcon />}
              </div>
            </>
          )}
        </div>

        {/* Right Panel */}
        <div className="ps-right-panel">
          {activeTab === "thermal" && (
            <>
              <div className="ps-info-banner">
                This is a preview of the Thermal print of your invoice. Some columns might not appear if they don't have the required information.{" "}
                <a href="#">Click here to learn more</a>
              </div>
              <div className="ps-preview-area">
                {thermalSize ? (
                  <TAX_INVOICE_PREVIEW />
                ) : (
                  <div className="ps-preview-placeholder">Select a size to preview the invoice</div>
                )}
              </div>
            </>
          )}

          {activeTab === "barcode" && (
            <div className="ps-barcode-content">
              {barcodeType === null && (
                <div className="ps-barcode-placeholder">Select a print type to see details</div>
              )}

              {barcodeType === "label" && (
                <>
                  <LabelPrinterIcon />
                  <div style={{ textAlign: "center" }}>
                    <div className="ps-how-title">How Does it Work?</div>
                    <p className="ps-how-text">
                      Barcode printing through Label printer works with a roll with barcode dimensions of 50 x 25 mm (2 x 1), having 2 barcodes per row.{" "}
                      <a href="#">Visit Link</a> to see a paper of matching dimensions on Amazon.in
                    </p>
                  </div>
                  <div className="ps-support-bar">
                    Don't know which printer you have? <a href="#">Contact Support</a>
                  </div>
                </>
              )}

              {barcodeType === "a4" && (
                <>
                  <A4PrinterIcon />
                  <div style={{ textAlign: "center" }}>
                    <div className="ps-how-title">How Does it Work?</div>
                    <p className="ps-how-text">
                      Barcode printing on A4 paper works with barcode dimensions of 52.5 x 25 mm, having 4 barcodes per row.{" "}
                      <a href="#">Visit Link</a> to see a paper of matching dimensions on Amazon.in
                    </p>
                  </div>
                  <div className="ps-support-bar">
                    Don't know which printer you have? <a href="#">Contact Support</a>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}