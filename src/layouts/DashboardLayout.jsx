import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/shared/Sidebar.jsx';
import Navbar from '@/components/shared/Navbar.jsx';
import Dialog from '@/components/ui/dialog';
import AddProductForm from '@/components/tracking/add-product-form';
import { useTrackingStore } from '@/store/trackingStore';

export default function DashboardLayout() {
  const isAddProductOpen = useTrackingStore((s) => s.isAddProductOpen);
  const setAddProductOpen = useTrackingStore((s) => s.setAddProductOpen);

  return (
    <div className="relative flex min-h-screen bg-brand-ink text-slate-100 antialiased selection:bg-brand-violet selection:text-white">
      {/* Ambient background light orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-brand-violet/15 blur-[140px]" />
        <div className="absolute right-0 top-10 h-[600px] w-[600px] rounded-full bg-brand-cyan/10 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[130px]" />
      </div>

      <Sidebar />
      <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="grid-premium flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      <Dialog
        isOpen={isAddProductOpen}
        onClose={() => setAddProductOpen(false)}
        title="Track a new product"
        description="Paste a product URL from Amazon, Flipkart, BestBuy, or Zara to begin automated monitoring."
      >
        <AddProductForm />
      </Dialog>
    </div>
  );
}
