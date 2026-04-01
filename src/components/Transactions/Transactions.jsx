import "./Transactions.css";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const navigate = useNavigate();

  const data = [
    {
      date: "10 Mar 2026",
      type: "Purchase Invoices",
      txn: 4,
      party: "Aditya",
      amount: "₹ 0"
    },
    {
      date: "10 Mar 2026",
      type: "Credit Note",
      txn: 5,
      party: "Saktiman",
      amount: "₹ 256"
    },
    {
      date: "10 Mar 2026",
      type: "Sales Invoices",
      txn: 29,
      party: "Saktiman",
      amount: "₹ 256"
    },
    {
      date: "10 Mar 2026",
      type: "Credit Note",
      txn: 4,
      party: "Saktiman",
      amount: "₹ 256"
    },
    {
      date: "10 Mar 2026",
      type: "Payment In",
      txn: 13,
      party: "Saktiman",
      amount: "₹ 10,000"
    }
  ];

  return (
    <div className="transactions">

      {/* HEADER */}
      <div className="transactions-header">
        <h3>Latest Transactions</h3>
      </div>

      {/* TABLE */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Txn No</th>
            <th>Party Name</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.type}</td>
              <td>{item.txn}</td>
              <td>{item.party}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* SEE ALL BUTTON */}
      <div className="see-all-container">
        <p
          className="see-all"
          onClick={() => navigate("/transactions")}
        >
          See All Transactions
        </p>
      </div>

    </div>
  );
};

export default Transactions;