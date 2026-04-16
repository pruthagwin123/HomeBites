import SectionTitle from '../../components/common/SectionTitle';
import WalletPanel from '../../components/common/WalletPanel';
import { useAppStore } from '../../app/store/useAppStore';
import { formatCurrency } from '../../utils/formatCurrency';

function WalletPage() {
  const wallet = useAppStore((state) => state.getWallet());
  const addWalletMoney = useAppStore((state) => state.addWalletMoney);
  const addRefund = useAppStore((state) => state.addRefund);

  return (
    <main className="hb-page">
      <SectionTitle
        eyebrow="Wallet"
        title="Track your balance, cashback, and refunds"
        subtitle="Track every credit and debit with a clean transaction timeline."
      />

      <section data-reveal="enter">
        <WalletPanel wallet={wallet} onAddMoney={addWalletMoney} onAddRefund={addRefund} />
      </section>

      <section className="hb-surface rounded-2xl border border-orange-100 bg-white p-4" data-reveal="enter">
        <h3 className="text-lg font-bold text-slate-900">Recent transactions</h3>
        <div className="mt-3 space-y-2">
          {wallet.transactions.map((txn) => (
            <article key={txn.id} className="flex items-center justify-between rounded-xl border border-orange-100 bg-orange-50/50 p-3">
              <div>
                <p className="text-sm font-semibold capitalize text-slate-800">{txn.type.replace('-', ' ')}</p>
                <p className="text-xs text-slate-500">{txn.note}</p>
              </div>
              <p className="text-sm font-bold text-emerald-700">+ {formatCurrency(txn.amount)}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default WalletPage;
