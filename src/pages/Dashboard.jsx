import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Cards from "../components/Cards/Cards";
import Transactions from "../components/Transactions/Transactions";
import Checklist from "../components/Checklist/Checklist";
import Report from "../components/Report/Report";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Header />
        <Cards />

        <div className="content">
          <Transactions />
          <Checklist />
        </div>

        {/* SALES REPORT */}
        <Report />
      </div>
    </div>
  );
};

export default Dashboard;