import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Header = () => {
  const { transactions } = useContext(TransactionContext);

  // Calculate Total Balance
  const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="container text-center mt-4">
      <h1 className="display-5">Personal Finance Tracker</h1>
      <h2 className="fw-bold text-primary mt-2">Balance: ${totalBalance.toFixed(2)}</h2>
    </div>
  );
};

export default Header;
