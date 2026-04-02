import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AllTransactions from "./pages/AllTransactions";
import BusinessSettings from "./pages/BuisnessSetting/Business";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings/*" element={<BusinessSettings />} />
      <Route path="/transactions" element={<AllTransactions />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;