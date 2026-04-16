export const ORDER_STAGES = [
  { key: 'placed', label: 'Placed' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'out_for_delivery', label: 'Out for delivery' },
  { key: 'delivered', label: 'Delivered' }
];

export function getTimeline(status) {
  const currentIndex = ORDER_STAGES.findIndex((item) => item.key === status);

  return ORDER_STAGES.map((stage, index) => ({
    ...stage,
    done: index <= currentIndex
  }));
}
