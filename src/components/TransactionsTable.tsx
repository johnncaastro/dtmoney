import { useTransactions } from '../hooks/useTransactions';
import classNames from 'classnames';

import { Trash } from 'phosphor-react';
import transactionsEmptyImg from '../assets/transactions-empty.png';
import { TransactionsTableMobile } from './TransactionsTableMobile';

export function TransactionsTable() {
  const { transactions, removeTransaction } = useTransactions();

  return (
    <div className="laptop:mt-16">
      {transactions.length !== 0 ? (
        <>
          <table className="w-full border-separate border-spacing-y-2 mobile:hidden laptop:table">
            <thead>
              <tr>
                <th className="text-gray-300 text-left py-4 px-8">Título</th>
                <th className="text-gray-300 text-left py-4 px-8">Preço</th>
                <th className="text-gray-300 text-left py-4 px-8">Categoria</th>
                <th className="text-gray-300 text-left py-4 px-8">Data</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td
                    className="py-4 px-8 bg-white rounded"
                  >
                    {transaction.title}
                  </td>
                  <td
                    className={classNames("py-4 px-8 bg-white", {
                      'text-green': transaction.type === 'deposit',
                      'text-red': transaction.type === 'withdraw',
                    })}
                  >
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(transaction.value)}
                  </td>
                  <td
                    className="py-4 px-8 bg-white text-gray-300"
                  >
                    {transaction.category}
                  </td>
                  <td
                    className="py-4 px-8 bg-white rounded text-gray-300"
                  >
                    {new Intl.DateTimeFormat('pt-BR').format(
                      new Date(transaction.createdAt)
                    )}
                  </td>
                  <td className="py-4 px-8 bg-white rounded text-gray-300">
                    <button
                      type="button"
                      onClick={() => removeTransaction(transaction.id)}
                      className='hover:brightness-75'
                    >
                      <Trash size={24} color="#ed0707" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          
          <TransactionsTableMobile />
        </>
      ): (
        <div className='w-full flex flex-col items-center gap-4 mobile:mt-4'>
          <img
            src={transactionsEmptyImg}
            alt="Imagem representando transações vazias"
            className='mobile:w-32 mobile:h-32 laptop:w-64 laptop:h-64'
          />

          <p>Você ainda não criou nenhuma transação!</p>
        </div>
      )}
    </div>
  )
}