import logoImg from '../assets/logo.svg';

interface HeaderProps {
  onOpenNewTransactionModal(): void,
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <header className='w-full h-44 bg-purple-500'>
      <div className='max-w-[1120px] flex items-center justify-between mx-auto mobile:px-4 laptop:px-12 py-6'>
        <img
          src={logoImg}
          alt="logo dtmoney"
          className='mobile:w-32 laptop:w-44'
        />

        <button
          type="button"
          onClick={onOpenNewTransactionModal}
          className='text-white bg-purple-300 px-6 py-2 rounded hover:brightness-90 duration-200 font-semibold mobile:text-xs laptop:text-base'
        >
          Nova transação
        </button>
      </div>
    </header>
  )
}