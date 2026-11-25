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
    <div className="relative flex min-h-screen bg-[#050B18] text-[#F8FAFC] antialiased selection:bg-[#00D4FF] selection:text-[#050B18]">
      {/* Background Precision Grid & Radial Cones */}
      <div className="pointer-events-none fixed inset-0 grid-premium opacity-40" />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#2563EB]/15 via-[#00D4FF]/8 to-transparent blur-[140px]" />

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
        title="Deploy Cloud Watcher"
        description="Input any Amazon, Flipkart, BestBuy, or Zara URL to initiate automated price monitoring."
      >
        <AddProductForm />
      </Dialog>
    </div>
  );
}