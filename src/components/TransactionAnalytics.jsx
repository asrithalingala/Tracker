// TransactionAnalytics.js
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const TransactionAnalytics = () => {
  const { transactions } = useContext(TransactionContext);

  if (transactions.length === 0) {
    return (
      <div className="container mt-4">
        <h3 className="fw-bold">Transaction Analytics</h3>
        <p>No transactions to analyze yet. Add some transactions to see insights!</p>
      </div>
    );
  }

  // Separate income and expense transactions
  const incomeTransactions = transactions.filter(t => t.amount > 0);
  const expenseTransactions = transactions.filter(t => t.amount < 0);

  // Find the highest income transaction (largest positive amount)
  const highestIncomeTransaction = incomeTransactions.length > 0
    ? incomeTransactions.reduce((prev, curr) =>
        prev.amount > curr.amount ? prev : curr
      )
    : null;

  // Find the largest expense transaction (most negative amount)
  const largestExpenseTransaction = expenseTransactions.length > 0
    ? expenseTransactions.reduce((prev, curr) =>
        prev.amount < curr.amount ? prev : curr
      )
    : null;

  // Calculate average transaction value
  const totalAmount = transactions.reduce((acc, t) => acc + t.amount, 0);
  const averageTransaction = totalAmount / transactions.length;

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">Transaction Analytics</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Total Transactions:</strong> {transactions.length}
        </li>
        <li className="list-group-item">
          <strong>Highest Income Transaction:</strong>{" "}
          {highestIncomeTransaction
            ? `${highestIncomeTransaction.text} - $${highestIncomeTransaction.amount.toFixed(2)}`
            : "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Largest Expense Transaction:</strong>{" "}
          {largestExpenseTransaction
            ? `${largestExpenseTransaction.text} - $${Math.abs(largestExpenseTransaction.amount).toFixed(2)}`
            : "N/A"}
        </li>
        <li className="list-group-item">
          <strong>Average Transaction:</strong> ${averageTransaction.toFixed(2)}
        </li>
      </ul>
    </div>
  );
};

export default TransactionAnalytics;
