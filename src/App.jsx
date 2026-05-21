import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import AppRoutes from './routes/AppRoutes';

const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center text-slate-400">
    <Loader2 className="h-8 w-8 animate-spin text-brand-purple" />
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
