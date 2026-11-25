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
    <div className="relative flex min-h-screen bg-[#06070a] text-slate-200 antialiased selection:bg-[#00f5a0] selection:text-[#06070a]">
      {/* Background Precision Grid */}
      <div className="pointer-events-none fixed inset-0 grid-premium opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-[#06070a]/40 to-[#06070a]" />

      <Sidebar />
      <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      <Dialog
        isOpen={isAddProductOpen}
        onClose={() => setAddProductOpen(false)}
        title="Deploy Product Watcher"
        description="Paste an Amazon, Flipkart, BestBuy, or Zara link to initiate automated daily telemetry."
      >
        <AddProductForm />
      </Dialog>
    </div>
  );
}