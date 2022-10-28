import { useTransactions } from '../hooks/useTransactions';
import classNames from 'classnames';

import incomeImg from '../assets/income.svg';
import outcomeImg from '../assets/outcome.svg';
import totalImg from '../assets/total.svg';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit') {
      acc.deposits += transaction.value;
      acc.totals += transaction.value;
    } else {
      acc.withdraws += transaction.value;
      acc.totals -= transaction.value;
    }

    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    totals: 0
  })

  return (
    <div className='flex items-center justify-between gap-8 -mt-20 mobile:scrollbar desktop:overflow-hidden'>
      <div className='min-w-[300px] bg-white p-6 rounded'>
        <header className='flex items-center justify-between mb-3'>
          <p>Entradas</p>

          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong className='mobile:text-3xl laptop:text-4xl font-medium'>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)}
        </strong>
      </div>

      <div className='min-w-[300px] bg-white p-6 rounded'>
        <header className='flex items-center justify-between mb-3'>
          <p>Saídas</p>

          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong className='mobile:text-3xl laptop:text-4xl font-medium'>
        -{new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdraws)}
        </strong>
      </div>

      <div className={classNames('min-w-[300px] bg-green text-white p-6 rounded', {
        'text-red': Math.sign(summary.totals) === -1,
      })}>
        <header className='flex items-center justify-between mb-3'>
          <p>Total</p>

          <img src={totalImg} alt="Total" />
        </header>
        <strong className='mobile:text-3xl laptop:text-4xl font-medium'>
        {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.totals)}
        </strong>
      </div>
    </div>
  )
}