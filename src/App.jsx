import { TransactionProvider } from "./context/TransactionContext";
import TransactionAnalytics from "./components/TransactionAnalytics";
import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

const App = () => {
  return (
    <TransactionProvider>
      <Header />
      <TransactionForm />
      <TransactionList />
    </TransactionProvider>
  );
};

export default App;
