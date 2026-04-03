import { useState } from "react";
import "./CreateParty.css";
import Sidebar from "../components/Sidebar/Sidebar";
import PartySettings from "../pages/Partysettings"
import { FaArrowLeft, FaUniversity } from "react-icons/fa";
import { FiSettings, FiSearch, FiX } from "react-icons/fi";

/* ============================================================
   ADD ADDRESS MODAL (Billing / Shipping)
============================================================ */
const AddAddressModal = ({ title, initialData, onClose, onSave }) => {
  const [streetAddress, setStreetAddress] = useState(initialData?.streetAddress || "");
  const [state, setState] = useState(initialData?.state || "Uttar Pradesh");
  const [pincode, setPincode] = useState(initialData?.pincode || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};
    if (!streetAddress.trim()) newErrors.streetAddress = "Enter Street Address";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSave({ streetAddress, state, pincode, city });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}><FiX size={20} /></button>
        </div>
        <div className="modal-divider" />
        <div className="modal-body">
          <div className="field-group">
            <label>Street Address <span className="required">*</span></label>
            <textarea
              className={`street-textarea${errors.streetAddress ? " input-error" : ""}`}
              placeholder="Enter Street Address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
            {errors.streetAddress && <span className="error-msg">{errors.streetAddress}</span>}
          </div>
          <div className="modal-row-2">
            <div className="field-group">
              <label>State</label>
              <div className="state-select-wrap">
                <FiSearch size={13} className="state-search-icon" />
                <select className="state-select" value={state} onChange={(e) => setState(e.target.value)}>
                  <option>Andhra Pradesh</option>
                  <option>Delhi</option>
                  <option>Gujarat</option>
                  <option>Karnataka</option>
                  <option>Maharashtra</option>
                  <option>Rajasthan</option>
                  <option>Tamil Nadu</option>
                  <option>Uttar Pradesh</option>
                  <option>West Bengal</option>
                </select>
              </div>
            </div>
            <div className="field-group">
              <label>Pincode</label>
              <input type="text" placeholder="Enter pin code" value={pincode} onChange={(e) => setPincode(e.target.value)} maxLength={6} />
            </div>
          </div>
          <div className="field-group">
            <label>City</label>
            <input type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
        </div>
        <div className="modal-divider" />
        <div className="modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="modal-save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   ADD BANK ACCOUNT MODAL
============================================================ */
const AddBankModal = ({ onClose, onSave }) => {
  const [accountNumber, setAccountNumber]       = useState("");
  const [reAccountNumber, setReAccountNumber]   = useState("");
  const [ifscCode, setIfscCode]                 = useState("");
  const [holderName, setHolderName]             = useState("");
  const [bankName, setBankName]                 = useState("");
  const [branchName, setBranchName]             = useState("");
  const [upiId, setUpiId]                       = useState("");
  const [errors, setErrors]                     = useState({});

  const isFormValid =
    accountNumber.trim() !== "" && reAccountNumber.trim() !== "";

  const handleSubmit = () => {
    const newErrors = {};
    if (!accountNumber.trim()) newErrors.accountNumber = "Enter Bank Account Number";
    if (!reAccountNumber.trim()) newErrors.reAccountNumber = "Re-enter Bank Account Number";
    else if (accountNumber !== reAccountNumber) newErrors.reAccountNumber = "Account numbers do not match";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSave({ accountNumber, ifscCode, holderName, bankName, branchName, upiId });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box bank-modal-box">

        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Add Bank Account</h2>
          <button className="modal-close" onClick={onClose}><FiX size={20} /></button>
        </div>
        <div className="modal-divider" />

        {/* Body */}
        <div className="modal-body">

          {/* Row 1: Account Number | Re-Enter Account Number */}
          <div className="modal-row-2">
            <div className="field-group">
              <label>Bank Account Number <span className="required">*</span></label>
              <input
                type="text"
                placeholder="ex: 123456789"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className={errors.accountNumber ? "input-error" : ""}
              />
              {errors.accountNumber && <span className="error-msg">{errors.accountNumber}</span>}
            </div>
            <div className="field-group">
              <label>Re-Enter Bank Account Number <span className="required">*</span></label>
              <input
                type="text"
                placeholder="ex: 123456789"
                value={reAccountNumber}
                onChange={(e) => setReAccountNumber(e.target.value)}
                className={errors.reAccountNumber ? "input-error" : ""}
              />
              {errors.reAccountNumber && <span className="error-msg">{errors.reAccountNumber}</span>}
            </div>
          </div>

          {/* Row 2: IFSC Code | Account Holder's Name */}
          <div className="modal-row-2">
            <div className="field-group">
              <label>IFSC Code</label>
              <input
                type="text"
                placeholder="ex: ICIC0001234"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
              />
            </div>
            <div className="field-group">
              <label>Account Holder's Name</label>
              <input
                type="text"
                placeholder="ex: Babu Lal"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
              />
            </div>
          </div>

          {/* Row 3: Bank Name | Branch Name */}
          <div className="modal-row-2">
            <div className="field-group">
              <label>Bank Name</label>
              <input
                type="text"
                placeholder="ex: ICICI Bank"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div className="field-group">
              <label>Branch Name</label>
              <input
                type="text"
                placeholder="ex: Mumbai"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
              />
            </div>
          </div>

          {/* Row 4: UPI ID (half width) */}
          <div className="modal-row-half">
            <div className="field-group">
              <label>UPI ID</label>
              <input
                type="text"
                placeholder="ex: babulal@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          </div>

        </div>

        <div className="modal-divider" />

        {/* Footer */}
        <div className="modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>Cancel</button>
          <button
            className={`modal-submit-btn${isFormValid ? " modal-submit-active" : ""}`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

/* ============================================================
   HELPER
============================================================ */
const formatAddress = (addr) => {
  if (!addr) return "";
  return [addr.streetAddress, addr.city, addr.state, addr.pincode].filter(Boolean).join(", ");
};

/* ============================================================
   CREATE PARTY PAGE
============================================================ */
const CreateParty = () => {
  const [showBillingModal, setShowBillingModal]       = useState(false);
  const [showShippingModal, setShowShippingModal]     = useState(false);
  const [showBankModal, setShowBankModal]             = useState(false);
  const [showPartySettings, setShowPartySettings]     = useState(false);
  const [billingAddress, setBillingAddress]           = useState(null);
  const [shippingAddress, setShippingAddress]     = useState(null);
  const [sameAsBilling, setSameAsBilling]         = useState(true);
  const [bankAccounts, setBankAccounts]           = useState([]);

  const handleBillingSave = (data) => {
    setBillingAddress(data);
    if (sameAsBilling) setShippingAddress(data);
    setShowBillingModal(false);
  };

  const handleShippingSave = (data) => {
    setShippingAddress(data);
    setShowShippingModal(false);
  };

  const handleSameAsBilling = (e) => {
    setSameAsBilling(e.target.checked);
    if (e.target.checked) setShippingAddress(billingAddress);
  };

  const handleBankSave = (data) => {
    setBankAccounts((prev) => [...prev, data]);
    setShowBankModal(false);
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <div className="create-party">

          {/* HEADER */}
          <div className="cp-header">
            <div className="cp-left">
              <FaArrowLeft className="back-icon" />
              <h2>Create Party</h2>
            </div>
            <div className="cp-actions">
              <button className="settings-btn" onClick={() => setShowPartySettings(true)}>Party Settings <FiSettings size={14} /></button>
              <button className="outline-btn">Save &amp; New</button>
              <button className="primary-btn">Save</button>
            </div>
          </div>

          {/* GENERAL DETAILS */}
          <div className="section">
            <h3>General Details</h3>
            <div className="row-4">
              <div className="field-group">
                <label>Party Name<span className="required">*</span></label>
                <input placeholder="Enter name" />
              </div>
              <div className="field-group">
                <label>Mobile Number</label>
                <input placeholder="Enter mobile number" />
              </div>
              <div className="field-group">
                <label>Email</label>
                <input placeholder="Enter email" />
              </div>
              <div className="field-group">
                <label>Opening Balance</label>
                <div className="opening-balance-row">
                  <div className="ob-input-wrap">
                    <span className="ob-symbol">₹</span>
                    <input className="ob-input" defaultValue="0" />
                  </div>
                  <select className="ob-select">
                    <option>To Collect</option>
                    <option>To Pay</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row-gst">
              <div className="field-group">
                <label>GSTIN</label>
                <input placeholder="ex: 29XXXXX9438X1XX" />
              </div>
              <div className="get-btn-col">
                <button className="get-btn">Get Details</button>
              </div>
              <div className="field-group">
                <label>PAN Number</label>
                <input placeholder="Enter party PAN Number" />
              </div>
            </div>
            <p className="note">Note: You can auto populate party details from GSTIN</p>
            <div className="row-2 mt-16">
              <div className="field-group">
                <label>Party Type<span className="required">*</span></label>
                <select><option>Customer</option><option>Supplier</option></select>
              </div>
              <div className="field-group">
                <label>Party Category</label>
                <select><option>Search Categories</option></select>
              </div>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="section">
            <h3>Address</h3>
            <div className="address-row">
              <div className="field-group">
                <label>Billing Address</label>
                <textarea
                  placeholder="Enter billing address"
                  value={formatAddress(billingAddress)}
                  readOnly={!!billingAddress}
                  onClick={() => setShowBillingModal(true)}
                  className={billingAddress ? "address-filled" : ""}
                />
                <button className="add-address-link" onClick={() => setShowBillingModal(true)}>
                  {billingAddress ? "Edit Billing Address" : "+ Add Billing Address"}
                </button>
              </div>
              <div className="field-group">
                <div className="shipping-label-row">
                  <label>Shipping Address</label>
                  <label className="same-address-check">
                    <input type="checkbox" checked={sameAsBilling} onChange={handleSameAsBilling} />
                    <span>Same as Billing address</span>
                  </label>
                </div>
                <textarea
                  placeholder="Enter shipping address"
                  value={formatAddress(shippingAddress)}
                  readOnly={sameAsBilling || !!shippingAddress}
                  onClick={() => !sameAsBilling && setShowShippingModal(true)}
                  className={`${sameAsBilling ? "textarea-muted" : ""} ${shippingAddress ? "address-filled" : ""}`}
                />
                {!sameAsBilling && (
                  <button className="add-address-link" onClick={() => setShowShippingModal(true)}>
                    {shippingAddress ? "Edit Shipping Address" : "+ Add Shipping Address"}
                  </button>
                )}
              </div>
            </div>
            <div className="row-2 mt-16">
              <div className="field-group">
                <label>Credit Period</label>
                <div className="credit-period-wrap">
                  <input className="credit-period-input" defaultValue="30" />
                  <span className="days-label">Days</span>
                </div>
              </div>
              <div className="field-group">
                <label>Credit Limit</label>
                <div className="credit-limit-wrap">
                  <span className="cl-symbol">₹</span>
                  <input className="cl-input" defaultValue="0" />
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="section">
            <h3>Contact Person Details</h3>
            <div className="row-2">
              <div className="field-group">
                <label>Contact Person Name</label>
                <input placeholder="Ex: Ankit Mishra" />
              </div>
              <div className="field-group">
                <label>Date of Birth</label>
                <input placeholder="DD-MM-YYYY" />
              </div>
            </div>
          </div>

          {/* BANK ACCOUNT */}
          <div className="section section-centered">
            <h3 className="section-h3-plain">Party Bank Account</h3>

            {/* Show saved bank accounts */}
            {bankAccounts.length > 0 && (
              <div className="bank-accounts-list">
                {bankAccounts.map((acc, i) => (
                  <div key={i} className="bank-account-card">
                    <div className="bank-account-icon">
                      <FaUniversity size={18} color="#6366f1" />
                    </div>
                    <div className="bank-account-info">
                      <span className="bank-account-name">{acc.bankName || "Bank Account"}</span>
                      <span className="bank-account-number">
                        {"*".repeat(Math.max(0, acc.accountNumber.length - 4)) + acc.accountNumber.slice(-4)}
                      </span>
                    </div>
                    <button className="add-address-link" onClick={() => setShowBankModal(true)}>Edit</button>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {bankAccounts.length === 0 && (
              <div className="centered-body">
                <div className="bank-icon-circle">
                  <FaUniversity size={36} color="#9ca3af" />
                </div>
                <p className="centered-desc">Add party bank information to manage transactions</p>
              </div>
            )}

            <div className="bank-add-btn-row">
              <button className="link-btn" onClick={() => setShowBankModal(true)}>
                + Add Bank Account
              </button>
            </div>
          </div>

          {/* CUSTOM FIELD */}
          <div className="section section-centered">
            <h3 className="section-h3-plain">Custom Field</h3>
            <div className="centered-body">
              <div className="custom-preview">
                <input readOnly placeholder="Birthday" className="preview-input" />
                <input readOnly placeholder="Drug license no" className="preview-input" />
                <input readOnly placeholder="" className="preview-input preview-short" />
              </div>
              <p className="centered-desc">
                Store more information about your parties by adding custom fields from <b>Party Settings</b>
              </p>
              <button className="primary-btn">Add Custom Fields</button>
            </div>
          </div>

        </div>
      </div>

      {/* BILLING ADDRESS MODAL */}
      {showBillingModal && (
        <AddAddressModal
          title="Add Billing Address"
          initialData={billingAddress}
          onClose={() => setShowBillingModal(false)}
          onSave={handleBillingSave}
        />
      )}

      {/* SHIPPING ADDRESS MODAL */}
      {showShippingModal && (
        <AddAddressModal
          title="Add Shipping Address"
          initialData={shippingAddress}
          onClose={() => setShowShippingModal(false)}
          onSave={handleShippingSave}
        />
      )}

      {/* BANK ACCOUNT MODAL */}
      {showBankModal && (
        <AddBankModal
          onClose={() => setShowBankModal(false)}
          onSave={handleBankSave}
        />
      )}

      {/* PARTY SETTINGS MODAL */}
      {showPartySettings && (
        <PartySettings onClose={() => setShowPartySettings(false)} />
      )}

    </div>
  );
};

export default CreateParty;
