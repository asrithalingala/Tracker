import { createContext, useReducer, useEffect } from "react";

// Initial State
const initialState = {
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
};

// Create Context
export const TransactionContext = createContext(initialState);

// Reducer Function
const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return { transactions: [action.payload, ...state.transactions] };
    case "DELETE_TRANSACTION":
      return {
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// Provider Component
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  // Store Transactions in Local Storage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  return (
    <TransactionContext.Provider value={{ transactions: state.transactions, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};
