import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';

import closeImg from '../assets/close.svg';
import incomeImg from '../assets/income.svg';
import outcomeImg from '../assets/outcome.svg';
import { useTransactions } from '../hooks/useTransactions';

interface NewTransactionModalProps {
  isNewTransactionModalOpen: boolean,
  onRequestClose(): void,
}

export function NewTransactionModal({
  isNewTransactionModalOpen,
  onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [type, setType] = useState('deposit');
  const [category, setCategory] = useState('');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      value,
      type,
      category
    })

    setTitle('');
    setValue(0);
    setType('deposit');
    setCategory('');

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isNewTransactionModalOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='w-full max-w-xl bg-white p-12 relative rounded'
    >
      <button
        type="button"
        onClick={onRequestClose}
        className='absolute top-6 right-6 border-0 bg-transparent hover:brightness-90 duration-200'
      >
        <img src={closeImg} alt="Ícone de fechar modal" />
      </button>

      <form onSubmit={handleCreateNewTransaction}>
        <h2 className='text-gray-500 text-2xl mb-8'>
          Cadastrar transação
        </h2>

        <input
          type="text"
          placeholder='Título'
          className='input'
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder='Valor'
          className='input mt-4 mb-4'
          onChange={event => setValue(Number(event.target.value))}
        />

        <div className='my-4 flex items-center justify-between gap-2'>
          <button
            type="button"
            onClick={() => { setType('deposit') }}
            className={classNames('w-full h-16 border border-solid border-gray-200 rounded bg-transparent flex items-center justify-center hover:border-gray-500', {
              'bg-deposit': type === 'deposit'
            })}
          >
            <img src={incomeImg} alt="Entrada" className='w-5 h-5' />
            <span className='inline-block ml-4 text-gray-500'>Entrada</span>
          </button>

          <button
            type="button"
            onClick={() => { setType('withdraw') }}
            className={classNames('w-full h-16 border border-solid border-gray-200 rounded bg-transparent flex items-center justify-center hover:border-gray-500', {
              'bg-withdraw': type === 'withdraw'
            })}
          >
            <img src={outcomeImg} alt="Saída" className='w-5 h-5' />
            <span className='inline-block ml-4 text-gray-500'>Saída</span>
          </button>
        </div>

        <input
          type="text"
          placeholder='Categoria'
          className='input'
          onChange={event => setCategory(event.target.value)}
        />

        <button
          type="submit"
          className='w-full h-16 px-6 bg-green hover:brightness-90 duration-200 text-white rounded border-0 text-base mt-6 font-semibold'
        >
          Cadastrar
        </button>
      </form>
    </Modal>
  )
}