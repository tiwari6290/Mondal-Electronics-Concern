import { useState, useRef, useEffect } from "react";
import {
  Search,
  ScanLine,
  ChevronDown,
  Settings,
  LayoutGrid,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  MoreVertical,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  ClipboardList,
  Info,
} from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Godown.css";

const ITEMS = [
  { id: 1, name: "BILLING SOFTWARE MOBILE APP", code: "-", price: "₹ 256" },
  { id: 2, name: "BILLING SOFTWARE WITH GST", code: "-", price: "₹ 3,69,875" },
  { id: 3, name: "BILLING SOFTWARE WITHOUT GST", code: "-", price: "₹ 3,556" },
  { id: 4, name: "GODREJ FRIDGE", code: "34567", price: "₹ 42,000" },
  { id: 5, name: "HERIER AC", code: "1234", price: "₹ 45,000" },
  { id: 6, name: "HISENSE 32 INCH", code: "-", price: "₹ 21,000" },
  { id: 7, name: "HISENSE 43INCG TV", code: "00974", price: "₹ 30,000" },
  { id: 8, name: "Samsung Galaxy A190", code: "kjhgfdsa", price: "₹ 55,000" },
  { id: 9, name: "uayufuy", code: "-", price: "₹ 5,547" },
];

export default function ItemsPage() {
  const [showReportsDropdown, setShowReportsDropdown] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCustomFieldModal, setShowCustomFieldModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [customFieldName, setCustomFieldName] = useState("");
  const [fieldVisible, setFieldVisible] = useState(true);

  const reportsRef = useRef(null);

  const [settings, setSettings] = useState({
    itemBatching: true,
    alertBeforeExpiry: true,
    serialNumber: true,
    mrp: true,
    showDiscount: true,
    wholesalePrice: true,
    partyWiseItemPrice: true,
  });

  const toggleSetting = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const handleClick = (e) => {
      if (reportsRef.current && !reportsRef.current.contains(e.target))
        setShowReportsDropdown(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleRowSelect = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );

  const allSelected = selectedRows.length === ITEMS.length;

  return (
    <div className="page-layout">
      <Sidebar />

      <main className="main-content">
        {/* Header */}
        <div className="content-header">
          <h1 className="page-title">Items</h1>
          <div className="header-actions">
            <div className="reports-wrapper" ref={reportsRef}>
              <button
                className="reports-btn"
                onClick={() => setShowReportsDropdown((v) => !v)}
              >
                <ClipboardList size={14} />
                Reports
                <ChevronDown size={13} />
              </button>
              {showReportsDropdown && (
                <div className="reports-dropdown">
                  {["Rate List", "Stock Summary", "Low Stock Summary", "Item Sales Summary"].map(
                    (label) => (
                      <div key={label} className="dropdown-item">
                        {label}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <button
              className="icon-btn"
              onClick={() => setShowSettingsModal(true)}
              title="Item Settings"
            >
              <Settings size={16} />
            </button>

            <button className="icon-btn" title="View">
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-inner">
              <div className="stat-label">
                <TrendingUp size={13} className="stat-trend-icon" />
                Stock Value
                <Info size={12} className="info-icon" />
              </div>
              <div className="stat-value">₹ 1,02,00,000</div>
            </div>
            <button className="stat-expand">
              <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="stat-card">
            <div className="stat-inner">
              <div className="stat-label">
                <AlertTriangle size={13} className="stat-warn-icon" />
                Low Stock
              </div>
              <div className="stat-value">0</div>
            </div>
            <button className="stat-expand">
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-row">
          <div className="search-box">
            <Search size={14} className="search-icon" />
            <input type="text" placeholder="Search by HSN" />
            <button className="scan-btn">
              <ScanLine size={15} />
            </button>
          </div>

          <div className="category-select">
            <select>
              <option>Search Categories</option>
            </select>
            <ChevronDown size={13} className="select-chevron" />
          </div>

          <div className="filters-right">
            <button className="bulk-actions-btn">
              <LayoutGrid size={14} />
              Bulk Actions
              <ChevronDown size={13} />
            </button>
            <button className="create-item-btn">Create Item</button>
          </div>
        </div>

        {/* Table */}
        <div className="items-table-wrapper">
          <table className="items-table">
            <thead>
              <tr>
                <th className="check-col">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() =>
                      setSelectedRows(allSelected ? [] : ITEMS.map((i) => i.id))
                    }
                  />
                </th>
                <th className="name-col">
                  Service Name <span className="sort-icon">↕</span>
                </th>
                <th>Service Code</th>
                <th>Selling Price</th>
                <th className="action-col" />
              </tr>
            </thead>
            <tbody>
              {ITEMS.map((item) => (
                <tr
                  key={item.id}
                  className={selectedRows.includes(item.id) ? "selected-row" : ""}
                >
                  <td className="check-col">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleRowSelect(item.id)}
                    />
                  </td>
                  <td className="name-col">{item.name}</td>
                  <td className="code-col">{item.code}</td>
                  <td className="price-col">{item.price}</td>
                  <td className="action-col">
                    <div className="row-menu-wrapper">
                      <button
                        className="row-menu-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === item.id ? null : item.id);
                        }}
                      >
                        <MoreVertical size={15} />
                      </button>
                      {openMenuId === item.id && (
                        <div className="row-menu-dropdown">
                          <div className="row-menu-item">Edit</div>
                          <div className="row-menu-item">Duplicate</div>
                          <div className="row-menu-item row-menu-delete">Delete</div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Item Settings Modal */}
      {showSettingsModal && (
        <div className="modal-overlay" onClick={() => setShowSettingsModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Item Settings</h2>
              <button className="modal-close" onClick={() => setShowSettingsModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="setting-row">
                <label>Stock Value Calculation</label>
                <select className="setting-select">
                  <option>Purchase Price with Tax</option>
                </select>
              </div>

              <ToggleRow
                title="Enable Item Batching & Expiry"
                desc="Keep track of multiple prices, expiry and manufacturing dates"
                checked={settings.itemBatching}
                onToggle={() => toggleSetting("itemBatching")}
              />

              <div className="setting-row toggle-row">
                <div className="setting-text">
                  <span className="setting-title">Alert Before Expiry</span>
                  <span className="setting-desc">
                    We will notify you the below selected days before your batch expires
                  </span>
                </div>
                <div className="expiry-controls">
                  <input type="text" className="expiry-input" />
                  <select className="expiry-select"><option>Select</option></select>
                </div>
                <Toggle
                  checked={settings.alertBeforeExpiry}
                  onToggle={() => toggleSetting("alertBeforeExpiry")}
                />
              </div>

              <ToggleRow
                title="Enable Serial Number/IMEI"
                desc="Manage your items by Serial Number or IMEI and track them easily"
                checked={settings.serialNumber}
                onToggle={() => toggleSetting("serialNumber")}
              />
              {settings.serialNumber && (
                <div className="setting-sub-row">
                  <label className="sub-label">Field Name</label>
                  <input type="text" className="field-name-input" defaultValue="IMEI/Serial No" />
                  <p className="sub-desc">
                    Choose a custom field name like IMEI Number, Model Number, Part Number etc. for adding the serial numbers.
                  </p>
                </div>
              )}

              <ToggleRow
                title="MRP"
                checked={settings.mrp}
                onToggle={() => toggleSetting("mrp")}
              />
              {settings.mrp && (
                <div className="setting-sub-row checkbox-row">
                  <input
                    type="checkbox"
                    id="show-discount"
                    checked={settings.showDiscount}
                    onChange={() => toggleSetting("showDiscount")}
                  />
                  <label htmlFor="show-discount">Show Discount(%) on MRP on invoice preview</label>
                </div>
              )}

              <ToggleRow
                title="Wholesale Price"
                checked={settings.wholesalePrice}
                onToggle={() => toggleSetting("wholesalePrice")}
              />

              <ToggleRow
                title={<>Party Wise Item Price <span className="new-badge">New</span></>}
                desc="Set custom Sales Prices for individual Parties"
                checked={settings.partyWiseItemPrice}
                onToggle={() => toggleSetting("partyWiseItemPrice")}
              />

              <button
                className="add-custom-field-link"
                onClick={() => setShowCustomFieldModal(true)}
              >
                + Add Custom Field
              </button>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowSettingsModal(false)}>Cancel</button>
              <button className="btn-save">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Fields Modal */}
      {showCustomFieldModal && (
        <div className="modal-overlay" onClick={() => setShowCustomFieldModal(false)}>
          <div className="modal-box custom-field-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Item Custom Fields</h2>
              <button className="modal-close" onClick={() => setShowCustomFieldModal(false)}>✕</button>
            </div>

            <div className="custom-field-suggestions">
              <div className="suggestion-chip chip-green">Dimensions</div>
              <div className="suggestion-chip chip-yellow">Color</div>
              <div className="suggestion-chip chip-orange">Material</div>
            </div>

            <div className="custom-field-body">
              <label className="cf-label">Field Name</label>
              <div className="cf-input-row">
                <input
                  type="text"
                  className="cf-input"
                  placeholder="Enter Custom Field Name"
                  value={customFieldName}
                  onChange={(e) => setCustomFieldName(e.target.value)}
                />
                <button
                  className="cf-icon-btn"
                  onClick={() => setFieldVisible((v) => !v)}
                  title={fieldVisible ? "Hide field" : "Show field"}
                >
                  {fieldVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button className="cf-icon-btn cf-delete" title="Delete field">
                  <Trash2 size={15} />
                </button>
              </div>
              <button className="add-new-field-btn">
                <Plus size={14} /> Add New Field
              </button>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowCustomFieldModal(false)}>Close</button>
              <button className="btn-save">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Toggle({ checked, onToggle }) {
  return (
    <div className={`toggle ${checked ? "toggle-on" : ""}`} onClick={onToggle} />
  );
}

function ToggleRow({ title, desc, checked, onToggle }) {
  return (
    <div className="setting-row toggle-row">
      <div className="setting-text">
        <span className="setting-title">{title}</span>
        {desc && <span className="setting-desc">{desc}</span>}
      </div>
      <Toggle checked={checked} onToggle={onToggle} />
    </div>
  );
}