import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const TransactionList = () => {
  const { transactions, dispatch } = useContext(TransactionContext);

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">Transaction History</h3>
      <ul className="list-group">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{transaction.text} - ${transaction.amount}</span>
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
