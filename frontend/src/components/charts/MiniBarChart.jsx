function MiniBarChart({ data, colorClass = 'bg-orange-500', valueFormatter = (value) => value }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const width = `${Math.max(8, (item.value / max) * 100)}%`;
        return (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>{item.label}</span>
              <span className="font-semibold text-slate-800">{valueFormatter(item.value)}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100">
              <div className={`h-2 rounded-full transition-all duration-500 ${colorClass}`} style={{ width }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MiniBarChart;
