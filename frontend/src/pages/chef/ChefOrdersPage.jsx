import { useMemo } from 'react';
import { useAppStore } from '../../app/store/useAppStore';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';

const statusFlow = ['placed', 'preparing', 'out_for_delivery', 'delivered'];

function getNextStatus(status) {
  const index = statusFlow.indexOf(status);
  if (index === -1 || index === statusFlow.length - 1) {
    return null;
  }
  return statusFlow[index + 1];
}

function ChefOrdersPage() {
  const session = useAppStore((state) => state.session);
  const orders = useAppStore((state) => state.orders);
  const updateOrderStatus = useAppStore((state) => state.updateOrderStatus);

  const chefOrders = useMemo(() => orders.filter((item) => item.chefId === session?.chefId), [orders, session]);

  return (
    <main className="hb-page">
      <SectionTitle
        eyebrow="Kitchen Operations"
        title="Track and manage incoming orders"
        subtitle="Advance orders as your kitchen progresses from prep to delivery."
      />

      <section className="space-y-3" data-reveal="enter">
        {chefOrders.map((order) => {
          const nextStatus = getNextStatus(order.status);
          return (
            <article key={order.id} className="hb-surface rounded-xl border border-orange-100 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">Order {order.id}</p>
                  <p className="font-semibold text-slate-900">{order.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">{order.status.replaceAll('_', ' ')}</p>
                  <p className="text-sm font-semibold text-slate-700">{formatCurrency(order.total)}</p>
                </div>
              </div>

              {nextStatus ? (
                <Button className="mt-3 bg-orange-500 hover:bg-orange-600" onClick={() => updateOrderStatus(order.id, nextStatus)}>
                  Move to {nextStatus.replaceAll('_', ' ')}
                </Button>
              ) : (
                <p className="mt-3 text-sm font-semibold text-emerald-700">Delivered successfully</p>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default ChefOrdersPage;
