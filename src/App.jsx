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
import CreditNote         from "./pages/CreditNote";
import CreateCreditNote   from "./pages/CreateCreditNote";
import DeliveryChallan    from "./pages/DeliveryChallan";
import ProformaInvoice    from "./pages/ProformaInvoice";
import CreateProformaInvoice from "./pages/CreateProformaInvoice";

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

        {/* Sales */}
        <Route path="/sales/invoices"          element={<SalesInvoices />} />
        <Route path="/sales/create-invoice"    element={<CreateSalesInvoice />} />
        <Route path="/sales/quotation"         element={<Quotation />} />
        <Route path="/sales/create-quotation"  element={<CreateQuotation />} />
        <Route path="/sales/payment-in"        element={<PaymentIn />} />
        <Route path="/sales/return"            element={<SalesReturn />} />
        <Route path="/sales/create-return"     element={<CreateSalesReturn />} />
        <Route path="/sales/credit-note"        element={<CreditNote />} />
        <Route path="/sales/create-credit-note"  element={<CreateCreditNote />} />
        <Route path="/sales/challan"             element={<DeliveryChallan />} />
        <Route path="/sales/proforma"            element={<ProformaInvoice />} />
        <Route path="/sales/create-proforma"     element={<CreateProformaInvoice />} />
      </Routes>
    </Router>
  );
}

export default App;
