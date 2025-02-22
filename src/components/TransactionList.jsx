import { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import "../styles/TransactionList.css";

const TransactionList = () => {
  const { transactions, dispatch } = useContext(TransactionContext);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input

  // Filter transactions based on category
  const filteredTransactions = transactions.filter((t) => 
    (filter === "All" || t.category === filter) &&
    t.text.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by search term
  );

  // Build a unique list of categories from transactions
  const categories = ["All", ...new Set(transactions.map((t) => t.category))];

  const handleEdit = (transaction) => {
    const newText = prompt("Edit transaction description:", transaction.text);
    const newAmount = prompt("Edit transaction amount:", transaction.amount);
    if (newText !== null && newAmount !== null) {
      const parsedAmount = parseFloat(newAmount);
      if (isNaN(parsedAmount)) {
        alert("Please enter a valid number for the amount.");
        return;
      }
      const updatedTransaction = {
        ...transaction,
        text: newText.trim() === "" ? transaction.text : newText,
        amount: parsedAmount,
      };
      dispatch({ type: "UPDATE_TRANSACTION", payload: updatedTransaction });
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">Transaction History</h3>

      {/* Search Bar */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter by Category */}
      <div className="mb-3">
        <label className="form-label">Filter by Category:</label>
        <select
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Transaction List */}
      <ul className="list-group">
        {filteredTransactions.map((transaction) => (
          <li
            key={transaction.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{transaction.text} ({transaction.category}) - ${transaction.amount}</span>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(transaction)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  dispatch({
                    type: "DELETE_TRANSACTION",
                    payload: transaction.id,
                  })
                }
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
