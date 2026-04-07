import { useState } from "react";
import {
  Search,
  ChevronDown,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./Godown.css";

const GODOWN_DATA = [
  { id: 1, name: "HISENSE 32 INCH",    code: "",         batch: "", qty: "37 PCS",  value: "₹ 6,66,000",  sell: "₹ 21000.0",  purchase: "₹ 18000.0" },
  { id: 2, name: "HISENSE 43INCG TV",  code: "00974",    batch: "", qty: "119 PCS", value: "₹ 0",         sell: "₹ 30000.0",  purchase: "₹ 0.0"     },
  { id: 3, name: "GODREJ FRIDGE",      code: "34567",    batch: "", qty: "143 ACS", value: "₹ 0",         sell: "₹ 42000.0",  purchase: "₹ 0.0"     },
  { id: 4, name: "Samsung Galaxy A190",code: "kjhgfdsa", batch: "", qty: "125 PCS", value: "₹ 60,00,000", sell: "₹ 55000.0",  purchase: "₹ 48000.0" },
  { id: 5, name: "HERIER AC",          code: "1234",     batch: "", qty: "93 PCS",  value: "₹ 35,34,000", sell: "₹ 45000.0",  purchase: "₹ 38000.0" },
];

export default function GodownPage() {
  const [showEditModal, setShowEditModal]   = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows]     = useState([]);
  const [search, setSearch]                 = useState("");

  const allSel = selectedRows.length === GODOWN_DATA.length;
  const toggleRow = (id) =>
    setSelectedRows((p) => p.includes(id) ? p.filter((r) => r !== id) : [...p, id]);

  const filtered = GODOWN_DATA.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="gd-layout">
      <Sidebar />

      <main className="gd-main">

        {/* ── Page header ── */}
        <div className="gd-header">
  <h1 className="gd-title">Godown Management</h1>
  <button className="gd-create-btn">Create Godown</button>
</div>

<div className="gd-topbar">
  <div className="gd-left">
    <div className="gd-dropdown">
      mondal electronic <ChevronDown size={14} />
    </div>
    <span className="gd-tag">Main Godown</span>
  </div>

  <div className="gd-right">
    <button className="gd-icon-btn">
      <Pencil size={16} />
    </button>
    <button className="gd-icon-btn gd-icon-del">
      <Trash2 size={16} />
    </button>
  </div>
</div>

        {/* ── Search + Transfer Stock ── */}
        <div className="gd-filterbar">
          <div className="gd-search">
            <Search size={14} className="gd-search-ico" />
            <input
              placeholder="Search Item, Item Code"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="gd-transfer-btn">
            <RefreshCw size={13} />
            Transfer Stock
          </button>
        </div>

        {/* ── Table ── */}
        <div className="gd-tbl-wrap">
          <table className="gd-tbl">
            <thead>
              <tr>
                <th className="gd-col-chk">
                  <input
                    type="checkbox"
                    checked={allSel && filtered.length > 0}
                    onChange={() =>
                      setSelectedRows(allSel ? [] : GODOWN_DATA.map((i) => i.id))
                    }
                  />
                </th>
                <th className="gd-col-name">Item name</th>
                <th>Item Code</th>
                <th>Item Batch</th>
                <th>Stock QTY</th>
                <th>Stock Value</th>
                <th>Selling Price</th>
                <th>Purchase Price</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map((item) => (
                <tr key={item.id} className={selectedRows.includes(item.id) ? "gd-sel" : ""}>
                  <td className="gd-col-chk">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleRow(item.id)}
                    />
                  </td>
                  <td className="gd-col-name">{item.name}</td>
                  <td className="gd-col-code">{item.code}</td>
                  <td className="gd-col-batch">{item.batch}</td>
                  <td className="gd-col-qty">{item.qty}</td>
                  <td className="gd-col-val">{item.value}</td>
                  <td className="gd-col-sell">{item.sell}</td>
                  <td className="gd-col-buy">{item.purchase}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} className="gd-empty">No items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* ══ Edit Godown Modal ══ */}
      {showEditModal && (
        <div className="gd-overlay" onClick={() => setShowEditModal(false)}>
          <div className="gd-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gd-modal-hd">
              <h2>Edit Godown</h2>
              <button className="gd-modal-x" onClick={() => setShowEditModal(false)}>✕</button>
            </div>

            <div className="gd-modal-bd">
              <div className="gd-field">
                <label>Godown Name <span className="gd-req">*</span></label>
                <input defaultValue="mondal electronic" />
              </div>

              <div className="gd-field">
                <label>Street Address</label>
                <input placeholder="Enter Street Address" />
              </div>

              <div className="gd-field-row">
                <div className="gd-field">
                  <label>State</label>
                  <input placeholder="Enter State" />
                </div>
                <div className="gd-field">
                  <label>Pincode</label>
                  <input placeholder="560029" />
                </div>
              </div>

              <div className="gd-field">
                <label>City</label>
                <input placeholder="Bangalore" />
              </div>
            </div>

            <div className="gd-modal-ft">
              <button className="gd-btn-cancel" onClick={() => setShowEditModal(false)}>Close</button>
              <button className="gd-btn-save">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ Delete Confirm Modal ══ */}
      {showDeleteModal && (
        <div className="gd-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="gd-modal gd-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="gd-modal-hd">
              <h2>Delete Godown</h2>
              <button className="gd-modal-x" onClick={() => setShowDeleteModal(false)}>✕</button>
            </div>
            <div className="gd-modal-bd">
              <p className="gd-del-msg">
                Are you sure you want to delete <strong>mondal electronic</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="gd-modal-ft">
              <button className="gd-btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button className="gd-btn-delete">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}