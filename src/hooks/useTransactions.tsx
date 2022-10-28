import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

interface Transactions {
  id: number,
  title: string,
  value: number,
  type: string,
  category: string,
  createdAt: string,
}

type TransactionInput = Omit<Transactions, 'id' | 'createdAt'>

interface TransactionsContextData {
  transactions: Transactions[],
  createTransaction(transaction: TransactionInput): void,
  removeTransaction(id: number): void,
}

interface TransactionsProviderProps {
  children: ReactNode,
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction
    ])
  }

  function removeTransaction(id: number) {
    const filteredTransactions = transactions.filter(transaction => transaction.id !== id)

    setTransactions(filteredTransactions);
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction,
      removeTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}