import { Summary } from "./Summary";
import { TransactionsTable } from "./TransactionsTable";

export function Dashboard() {
  return (
    <div className="max-w-[1120px] mx-auto desktop:px-12 py-6">
      <Summary />
      <TransactionsTable />
    </div>
  )
}