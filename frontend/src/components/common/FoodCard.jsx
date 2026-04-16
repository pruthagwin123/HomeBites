import Button from '../ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';

const makeFoodFallback = (title) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#f97316'/>
          <stop offset='100%' stop-color='#f59e0b'/>
        </linearGradient>
      </defs>
      <rect width='800' height='500' fill='url(#g)'/>
      <rect width='800' height='500' fill='rgba(15,23,42,0.22)'/>
      <text x='50' y='280' fill='white' font-family='Segoe UI, Arial, sans-serif' font-size='52' font-weight='700'>${title}</text>
    </svg>`
  )}`;

function FoodCard({ item, onAddToCart, onToggleAvailability, onPriceChange, isChefView = false }) {
  return (
    <article className="group hb-hover-lift hb-surface overflow-hidden rounded-2xl border border-orange-100 bg-white" data-reveal="enter">
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = makeFoodFallback(item.title || 'HomeBites Food');
          }}
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-amber-700">
          {item.prepTime}
        </span>
        <span
          className={`absolute left-3 top-3 rounded-full px-2 py-1 text-xs font-semibold ${
            item.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'
          }`}
        >
          {item.isAvailable ? 'Available' : 'Sold out'}
        </span>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
          <p className="text-sm text-slate-700">{item.chefName}</p>
          <p className="text-xs text-slate-500">{item.kitchenName}</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-lg font-black text-emerald-700">{formatCurrency(item.price)}</p>
          <span className="text-sm font-semibold text-orange-600">{item.rating.toFixed(1)} / 5</span>
        </div>

        {item.dietTags?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {item.dietTags.slice(0, 3).map((tag) => (
              <span key={`${item.id}-${tag}`} className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium capitalize text-emerald-700">
                {tag.replace('-', ' ')}
              </span>
            ))}
          </div>
        ) : null}

        {isChefView ? (
          <div className="space-y-2">
            <label className="flex items-center justify-between text-sm text-slate-700">
              Availability
              <input
                checked={item.isAvailable}
                type="checkbox"
                onChange={(event) => onToggleAvailability?.(item.id, event.target.checked)}
                className="h-4 w-4 accent-emerald-600"
              />
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="50"
                defaultValue={item.price}
                onBlur={(event) => onPriceChange?.(item.id, Number(event.target.value || item.price))}
                className="w-full rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm outline-none focus:border-orange-400"
              />
            </div>
          </div>
        ) : (
          <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => onAddToCart?.(item.id)}>
            Add to Cart
          </Button>
        )}
      </div>
    </article>
  );
}

export default FoodCard;
