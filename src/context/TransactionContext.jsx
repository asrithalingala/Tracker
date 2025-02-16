// TransactionContext.js
import React, { createContext, useReducer, useEffect } from "react";

// Load initial state from local storage if it exists
const initialState = JSON.parse(localStorage.getItem("transactions")) || [];

export const TransactionContext = createContext();

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return [action.payload, ...state];
      case "DELETE_TRANSACTION":
        return state.filter(transaction => transaction.id !== action.payload);
      case "UPDATE_TRANSACTION":
        return state.map(transaction =>
          transaction.id === action.payload.id ? action.payload : transaction
        );
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
