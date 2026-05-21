const EmptyState = ({ title, description, action }) => (
  <div className="card flex flex-col items-center py-12 text-center">
    <div className="mb-3 text-4xl" aria-hidden="true">
      📦
    </div>
    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    <p className="mt-1 max-w-md text-sm text-slate-500">{description}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;
