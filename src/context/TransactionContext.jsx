// TransactionContext.js
import React, { createContext, useReducer, useEffect } from "react";

// Load initial state from local storage if it exists
const initialState = JSON.parse(localStorage.getItem("transactions")) || [];

export const TransactionContext = createContext();

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return [...state, action.payload];
    case "DELETE_TRANSACTION":
      return state.filter((transaction) => transaction.id !== action.payload);
    default:
      return state;
  }
};

export const TransactionProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(transactionReducer, initialState);

  // Save transactions to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  return (
    <TransactionContext.Provider value={{ transactions, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};
