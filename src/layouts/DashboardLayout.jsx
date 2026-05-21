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
    <div className="flex min-h-screen bg-brand-ink text-slate-100">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
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
        description="Paste a product URL — we scrape the price and monitor it daily."
      >
        <AddProductForm />
      </Dialog>
    </div>
  );
}
