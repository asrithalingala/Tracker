import { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const TransactionList = () => {
  const { transactions, dispatch } = useContext(TransactionContext);
  const [filter, setFilter] = useState("All");

  // Filter transactions based on the selected category
  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((t) => t.category === filter);

  // Build a unique list of categories from transactions
  const categories = ["All", ...new Set(transactions.map((t) => t.category))];
//return statement

  return (
    <div className="container mt-4" >
      <h3 className="fw-bold">Transaction History</h3>
      <div className="mb-3">
        <label className="form-label">Filter by Category:</label>
        <select
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <ul className="list-group">
        {filteredTransactions.map((transaction) => (
          <li
            key={transaction.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{transaction.text} ({transaction.category}) - ${transaction.amount}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => dispatch({ type: "DELETE_TRANSACTION", payload: transaction.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
