import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard          from "./pages/Dashboard";
import AllTransactions    from "./pages/AllTransactions";
import BusinessSettings   from "./pages/BuisnessSetting/Business";
import Parties            from "./pages/Parties";
import CreateParty        from "./pages/CreateParty";
import SalesInvoices      from "./pages/SalesInvoices";
import CreateSalesInvoice from "./pages/CreateSalesInvoice";
import Quotation          from "./pages/Quotation";
import CreateQuotation    from "./pages/CreateQuotation";
import PaymentIn          from "./pages/PaymentIn";
import SalesReturn        from "./pages/SalesReturn";
import CreateSalesReturn  from "./pages/CreateSalesReturn";
import Inventory          from "./pages/Inventory";
import Godown             from "./pages/Godown";
import Cash               from "./pages/Cash";
import Expenses           from "./pages/Expenses";
import PurchaseInvoice    from "./pages/PurchaseInvoice";
import PaymentOut         from "./pages/Paymentout";
import PurchaseReturn     from "./pages/PurchaseReturn";
import DebitNote          from "./pages/DebitNote";
import PurchaseOrders     from "./pages/PurchaseOrder";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/"                        element={<Navigate to="/dashboard" replace />} />

        {/* General */}
        <Route path="/dashboard"               element={<Dashboard />} />
        <Route path="/transactions"            element={<AllTransactions />} />
        <Route path="/settings/*"              element={<BusinessSettings />} />
        <Route path="/parties"                 element={<Parties />} />
        <Route path="/create-party"            element={<CreateParty />} />
        <Route path="/inventory"               element={<Inventory />} />
        <Route path="/godown"                  element={<Godown />} />
        <Route path="/cash-bank"               element={<Cash />} />
        <Route path="/expenses"                element={<Expenses />} />
        <Route path="purchase-invoices"        element={<PurchaseInvoice />} />
        <Route path="/payment-out"             element={<PaymentOut />} />
        <Route path="/purchase-return"         element={<PurchaseReturn />} />
        <Route path="/debit-note"              element={<DebitNote />} />
        <Route path="/purchase-orders"         element={<PurchaseOrders />} />

        {/* Sales */}
        <Route path="/sales/invoices"          element={<SalesInvoices />} />
        <Route path="/sales/create-invoice"    element={<CreateSalesInvoice />} />
        <Route path="/sales/quotation"         element={<Quotation />} />
        <Route path="/sales/create-quotation"  element={<CreateQuotation />} />
        <Route path="/sales/payment-in"        element={<PaymentIn />} />
        <Route path="/sales/return"            element={<SalesReturn />} />
        <Route path="/sales/create-return"     element={<CreateSalesReturn />} /> 
      </Routes>
    </Router>
  );
}

export default App;
