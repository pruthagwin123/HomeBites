function SparklineAreaChart({ data, stroke = '#f97316', fill = 'rgba(249, 115, 22, 0.18)', height = 180 }) {
  const width = 520;
  const max = Math.max(...data.map((item) => item.value), 1);
  const min = Math.min(...data.map((item) => item.value), 0);
  const range = max - min || 1;

  const points = data
    .map((item, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * (width - 30) + 15;
      const y = height - ((item.value - min) / range) * (height - 30) - 15;
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `15,${height - 15} ${points} ${width - 15},${height - 15}`;

  return (
    <div className="space-y-2">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full rounded-xl bg-slate-50 p-2">
        <polyline fill={fill} stroke="none" points={areaPoints} />
        <polyline fill="none" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" points={points} />
      </svg>
      <div className="flex items-center justify-between text-xs text-slate-500">
        {data.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

export default SparklineAreaChart;
