import { useTransactions } from "../hooks/useTransactions"
import classNames from "classnames";

import { Trash } from "phosphor-react";

export function TransactionsTableMobile() {
  const { transactions, removeTransaction } = useTransactions();

  return (
    <div className='w-full p-8 laptop:hidden'>
      <header className="flex items-center justify-between mb-8">
        <h2 className="font-medium">Listagem</h2>
        <p className="text-gray-300">{transactions.length > 1 ? `${transactions.length} itens` : '1 item'}</p>
      </header>

      {transactions.map(transaction => (
        <div
          key={transaction.id}
          className="p-4 border-none rounded bg-white mb-4"
        >
          <div className="flex items-center justify-between">
            <h3>{transaction.title}</h3>

            <button
              type="button"
              onClick={() => removeTransaction(transaction.id)}
            >
              <Trash size={20} color="#ed0707" />
            </button>
          </div>

          <p className={classNames("text-lg", {
              'text-green': transaction.type === 'deposit',
              'text-red': transaction.type === 'withdraw',
            })}
          >
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(transaction.value)}
          </p>
    
          <div className="flex items-center justify-between mt-4">
            <p className="text-gray-300">{transaction.category}</p>
            <span className="text-gray-300">
              {new Intl.DateTimeFormat('pt-BR').format(
                new Date(transaction.createdAt)
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}