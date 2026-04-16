import { getTimeline } from '../../utils/orderTimeline';

function OrderTimeline({ status }) {
  const timeline = getTimeline(status);

  return (
    <div className="space-y-4">
      {timeline.map((stage, index) => (
        <div key={stage.key} className="flex items-start gap-3">
          <div className="relative mt-1">
            <span
              className={`block h-4 w-4 rounded-full border-2 ${
                stage.done ? 'border-emerald-600 bg-emerald-500' : 'border-slate-300 bg-white'
              }`}
            />
            {index !== timeline.length - 1 ? (
              <span className={`absolute left-1.5 top-4 block h-10 w-0.5 ${stage.done ? 'bg-emerald-400' : 'bg-slate-200'}`} />
            ) : null}
          </div>
          <div>
            <p className={`text-sm font-semibold ${stage.done ? 'text-emerald-700' : 'text-slate-500'}`}>{stage.label}</p>
            <p className="text-xs text-slate-500">{stage.done ? 'Completed' : 'Pending'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderTimeline;
