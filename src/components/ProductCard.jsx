import { Link } from 'react-router-dom';
import PriceTrendMini from './PriceTrendMini';

const formatPrice = (price, currency = 'USD') => {
  if (price === null || price === undefined) return '--';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
};

const ProductCard = ({ product, onDelete, onRefresh, refreshing }) => {
  const atTarget =
    product.targetPrice !== null &&
    product.currentPrice !== null &&
    product.currentPrice <= product.targetPrice;

  return (
    <article className="card flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
            No image
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              {product.storeIconUrl ? (
                <img
                  src={product.storeIconUrl}
                  alt={product.store}
                  className="h-5 w-5 rounded-full border border-stone-200 bg-white object-cover"
                  loading="lazy"
                />
              ) : null}
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                {product.store}
              </span>
            </div>

            <h3 className="line-clamp-2 font-semibold text-slate-900">
              <Link to={`/products/${product._id}`} className="hover:text-brand-600">
                {product.title}
              </Link>
            </h3>
            <a
              href={product.url}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block truncate text-xs text-slate-500 hover:underline"
            >
              {product.url}
            </a>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-slate-900">
              {formatPrice(product.currentPrice, product.currency)}
            </p>
            {product.targetPrice !== null && (
              <p className={`text-xs ${atTarget ? 'text-green-600' : 'text-slate-500'}`}>
                Target: {formatPrice(product.targetPrice, product.currency)}
                {atTarget ? ' hit' : ''}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <PriceTrendMini trend={product.trend} />
        </div>

        {product.lastError && (
          <p className="mt-2 text-xs text-amber-600">Last check failed: {product.lastError}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onRefresh(product._id)}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh price'}
          </button>
          <Link to={`/products/${product._id}`} className="btn-secondary">
            View history
          </Link>
          <button
            type="button"
            className="btn-secondary text-red-600 hover:border-red-200 hover:bg-red-50"
            onClick={() => onDelete(product._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
