import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AllTransactions from "./pages/AllTransactions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<AllTransactions />} />
      </Routes>
    </Router>
  );
}

export default App;