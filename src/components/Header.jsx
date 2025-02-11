import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Header = () => {
  const { transactions } = useContext(TransactionContext);

  // Calculate Total Credit (Income) and Debit (Expense)
  const totalCredit = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalDebit = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalBalance = totalCredit + totalDebit;

  // Function to determine balance status (positive, negative, or zero)
  const getBalanceStatus = (balance) => {
    if (balance > 0) return "positive";
    if (balance < 0) return "negative";
    return "neutral";
  };

  const balanceStatus = getBalanceStatus(totalBalance);

  return (
    <div className="container text-center mt-4">
      <h1 className="display-4">💸 Personal Finance Tracker 💰</h1>
      <h2 className={`fw-bold mt-3 text-${balanceStatus}`}>
        Balance: ${totalBalance.toFixed(2)}
      </h2>
      <p className="lead">
        {balanceStatus === "positive" && "You're doing great! Keep it up!"}
        {balanceStatus === "negative" && "Uh-oh, looks like you're in the red. Consider reviewing your expenses."}
        {balanceStatus === "neutral" && "Your balance is steady. Let's aim for growth!"}
      </p>

      <div className="mt-4">
        <h3 className="text-success">Total Credit (Income): ${totalCredit.toFixed(2)}</h3>
        <h3 className="text-danger">Total Debit (Expense): ${Math.abs(totalDebit).toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Header;
