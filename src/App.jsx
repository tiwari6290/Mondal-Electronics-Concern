import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AllTransactions from "./pages/AllTransactions";
import Parties from "./pages/Parties";
import CreateParty from "./pages/CreateParty"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<AllTransactions />} />
        <Route path="/parties" element={<Parties />} />
        <Route path="/create-party" element={<CreateParty />} />

      </Routes>
    </Router>
  );
}

export default App;