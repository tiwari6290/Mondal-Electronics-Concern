import "./Transactions.css";

const Transactions = () => {
  const data = [
    ["10 Mar 2026", "Purchase Invoices", "4", "Aditya", "₹0"],
    ["10 Mar 2026", "Credit Note", "5", "Saktiman", "₹256"],
    ["10 Mar 2026", "Sales Invoices", "29", "Saktiman", "₹256"],
    ["10 Mar 2026", "Credit Note", "4", "Saktiman", "₹256"],
    ["10 Mar 2026", "Payment In", "13", "Saktiman", "₹10,000"],
  ];

  return (
    <div className="transactions">
      <h3>Latest Transactions</h3>

      <table>
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
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((col, j) => (
                <td key={j}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="link">See All Transactions</p>
    </div>
  );
};

export default Transactions;