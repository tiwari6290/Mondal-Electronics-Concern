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
import PaymentIn          from "./pages/Paymentin";
import SalesReturn        from "./pages/SalesReturn";
import CreateSalesReturn  from "./pages/CreateSalesReturn";
import CreditNote         from "./pages/CreditNote";
import CreateCreditNote   from "./pages/CreateCreditNote";
import DeliveryChallan    from "./pages/DeliveryChallan";
import ProformaInvoice    from "./pages/ProformaInvoice";
import CreateProformaInvoice from "./pages/CreateProformaInvoice";
import Inventory          from "./pages/Inventory";
import Godown             from "./pages/Godown";
import Cash               from "./pages/Cash";
import Expenses           from "./pages/Expenses";
import PurchaseInvoice    from "./pages/PurchaseInvoice";
import CreatePurchase     from "./pages/CreatePurchaseInvoice";
import PaymentOut         from "./pages/Paymentout";
import CreatePayment      from "./pages/CreatePaymentOut";
import PurchaseReturn     from "./pages/PurchaseReturn";
import CreatePurchaseReturn from "./pages/CreatePurchaseReturn";
import DebitNote          from "./pages/DebitNote";
import CreateDebit        from "./pages/CreateDebitNote";
import PurchaseOrders     from "./pages/PurchaseOrder";
import CreatePurchaseOrder from "./pages/CreatePurchaseOrder";
import CreatePaymentIn    from "./pages/CreatePaymentIn";  
import AccountSettings    from "./pages/AccountSetting";
import PrintSettings      from "./pages/Printsetting";
import ManageUsers        from "./pages/ManageUsers";
import Reminders          from "./pages/Reminders";
import CA                 from "./pages/CA";
import Refer              from "./pages/Refer";


function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route path="/"                        element={<Navigate to="/dashboard" replace />} />

        {/* General */}
        <Route path="/dashboard"               element={<Dashboard />} />
        <Route path="/transactions"            element={<AllTransactions />} />
        <Route path="/parties"                 element={<Parties />} />
        <Route path="/create-party"            element={<CreateParty />} />
        <Route path="/inventory"               element={<Inventory />} />
        <Route path="/godown"                  element={<Godown />} />
        <Route path="/cash-bank"               element={<Cash />} />
        <Route path="/expenses"                element={<Expenses />} />
        <Route path="purchase-invoices"        element={<PurchaseInvoice />} />
        <Route path="/purchase-invoices/create"element={<CreatePurchase />} />
        <Route path="/payment-out/create"      element={<CreatePayment />} />
        <Route path="/payment-out"             element={<PaymentOut />} />
        <Route path="/purchase-return"         element={<PurchaseReturn />} />
        <Route path="/purchase-return/create"  element={<CreatePurchaseReturn />} />
        <Route path="/debit-note"              element={<DebitNote />} />
        <Route path="/debit-note/create"       element={<CreateDebit />} />
        <Route path="/purchase-orders"         element={<PurchaseOrders />} />
        <Route path="/purchase-orders/create"  element={<CreatePurchaseOrder />} />


        {/* Sales */}
        <Route path="/sales/invoices"          element={<SalesInvoices />} />
        <Route path="/sales/create-invoice"    element={<CreateSalesInvoice />} />
        <Route path="/sales/quotation"         element={<Quotation />} />
        <Route path="/sales/create-quotation"  element={<CreateQuotation />} />
        <Route path="/sales/payment-in"        element={<PaymentIn />} />
        <Route path="//sales/create-payment-in" element={<CreatePaymentIn />} />
        <Route path="/sales/return"            element={<SalesReturn />} />
        <Route path="/sales/create-return"     element={<CreateSalesReturn />} />
        <Route path="/sales/credit-note"        element={<CreditNote />} />
        <Route path="/sales/create-credit-note"  element={<CreateCreditNote />} />
        <Route path="/sales/challan"             element={<DeliveryChallan />} />
        <Route path="/sales/proforma"            element={<ProformaInvoice />} />
        <Route path="/sales/create-proforma"     element={<CreateProformaInvoice />} />

        {/*Settingspage*/}
<Route path="/settings" element={<BusinessSettings />}>
{/*   <Route index element={<ManageBusiness />} /> */}
  <Route path="account" element={<AccountSettings />} />
  <Route path="/settings/print" element={<PrintSettings />} />
  <Route path="/settings/users" element={<ManageUsers />} />
  <Route path="/settings/reminders" element={<Reminders />} />
  <Route path="/settings/reports" element={<CA />} />
  <Route path="/settings/refer" element={<Refer />} />
</Route>
      </Routes>
    </Router>
  );
}

export default App;
