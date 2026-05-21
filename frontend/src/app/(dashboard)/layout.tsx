'use client';

import React from 'react';
import Sidebar from '@/components/shared/sidebar';
import Navbar from '@/components/shared/navbar';
import Dialog from '@/components/ui/dialog';
import AddProductForm from '@/components/tracking/add-product-form';
import { useTrackingStore } from '@/store/trackingStore';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAddProductOpen, setAddProductOpen } = useTrackingStore();

  return (
    <div className="flex min-h-screen bg-[#04110d] text-emerald-50">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar />
        <main className="grid-bg flex-1 px-4 py-6 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      <Dialog
        isOpen={isAddProductOpen}
        onClose={() => setAddProductOpen(false)}
        title="Track a new product"
        description="We will scrape the product immediately, create the tracking record, and seed the first price history point."
      >
        <AddProductForm />
      </Dialog>
    </div>
  );
}
