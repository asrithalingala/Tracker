import { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const TransactionForm = () => {
  const { dispatch } = useContext(TransactionContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General"); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
      category,
    };

    dispatch({ type: "ADD_TRANSACTION", payload: newTransaction });

    setText("");
    setAmount("");
    setCategory("General");
  };

  return (
   
    <div className="container mt-4">
      <h3 className="fw-bold">Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount ($)</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Salary">Salary</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
