import { formatCurrency } from '../../utils/formatCurrency';

function WalletPanel({ wallet, onAddMoney, onAddRefund }) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <article className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Wallet Balance</p>
        <p className="mt-2 text-3xl font-black text-slate-900">{formatCurrency(wallet.balance)}</p>
        <p className="mt-1 text-sm text-slate-600">Cashback wallet: {formatCurrency(wallet.cashbackBalance)}</p>
      </article>

      <article className="space-y-3 rounded-2xl border border-orange-100 bg-white p-5">
        <button
          className="w-full rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          onClick={() => onAddMoney(200)}
        >
          Add 200
        </button>
        <button
          className="w-full rounded-xl bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-200"
          onClick={() => onAddRefund(90)}
        >
          Simulate Refund +90
        </button>
      </article>
    </section>
  );
}

export default WalletPanel;
