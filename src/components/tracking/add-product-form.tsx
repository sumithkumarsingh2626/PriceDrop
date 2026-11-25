import React, { useMemo, useState } from 'react';
import { Bell, Globe, Sparkles, Target } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/context/ToastProvider';
import { useTrackingStore } from '@/store/trackingStore';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';

function NotificationToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-xs text-slate-300 transition-colors hover:border-white/[0.12] cursor-pointer">
      <span className="font-medium">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-white/20 bg-[#07090f] accent-[#00f5a0] cursor-pointer"
      />
    </label>
  );
}

export default function AddProductForm() {
  const { trackProduct, isTracking } = useProducts();
  const { success, error } = useToast();
  const { setAddProductOpen } = useTrackingStore();
  const [url, setUrl] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [variant, setVariant] = useState('');
  const [formError, setFormError] = useState('');
  const [settings, setSettings] = useState({
    whatsapp: true,
    sms: true,
    push: true,
    anyPriceDrop: true,
    targetPriceAlert: true,
  });

  const urlHint = useMemo(() => {
    if (!url) return 'Supported engines: Amazon, Flipkart, BestBuy, Zara';
    try {
      const host = new URL(url).hostname.replace(/^www\./, '');
      return `Detected retail host: ${host}`;
    } catch {
      return 'Enter a complete product URL starting with http:// or https://';
    }
  }, [url]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!url) {
      setFormError('Product URL is required.');
      return;
    }

    setFormError('');

    try {
      await trackProduct({
        url,
        targetPrice: targetPrice ? Number(targetPrice) : null,
        variant: variant || undefined,
        notificationEnabled: true,
        notificationSettings: settings,
      });

      success('Product added and initial telemetry recorded.');
      setUrl('');
      setTargetPrice('');
      setVariant('');
      setAddProductOpen(false);
    } catch (submissionError) {
      error(submissionError instanceof Error ? submissionError.message : 'Unable to track product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-3 rounded-xl border border-[#00f5a0]/20 bg-[#00f5a0]/5 p-3 text-xs text-slate-300">
        <Sparkles className="h-4 w-4 shrink-0 text-[#00f5a0]" />
        <p>Paste any product URL. The scraper extracts title, current price, image, and currency automatically.</p>
      </div>

      <div className="space-y-1">
        <Input
          id="product-url"
          label="Product Retail URL"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://www.amazon.com/... or https://www.bestbuy.com/..."
          leftIcon={<Globe className="h-4 w-4" />}
          error={formError || undefined}
        />
        <p className="font-mono text-[10px] text-slate-500 pl-1">{urlHint}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Input
          id="target-price"
          label="Target Price Alert ($)"
          type="number"
          min="0"
          value={targetPrice}
          onChange={(event) => setTargetPrice(event.target.value)}
          placeholder="e.g. 299"
          leftIcon={<Target className="h-4 w-4" />}
        />
        <Input
          id="variant"
          label="Variant (Optional)"
          value={variant}
          onChange={(event) => setVariant(event.target.value)}
          placeholder="Color, edition, size..."
        />
      </div>

      <div className="space-y-2 pt-1">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Dispatch Channels
          </span>
          <h4 className="text-xs font-bold text-white mt-0.5">Notification Triggers</h4>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <NotificationToggle label="WhatsApp Dispatch" checked={settings.whatsapp} onChange={(whatsapp) => setSettings((prev) => ({ ...prev, whatsapp }))} />
          <NotificationToggle label="SMS Notification" checked={settings.sms} onChange={(sms) => setSettings((prev) => ({ ...prev, sms }))} />
          <NotificationToggle label="In-App Push" checked={settings.push} onChange={(push) => setSettings((prev) => ({ ...prev, push }))} />
          <NotificationToggle label="Any Price Dip" checked={settings.anyPriceDrop} onChange={(anyPriceDrop) => setSettings((prev) => ({ ...prev, anyPriceDrop }))} />
          <NotificationToggle label="Target Price Hit" checked={settings.targetPriceAlert} onChange={(targetPriceAlert) => setSettings((prev) => ({ ...prev, targetPriceAlert }))} />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-2.5 pt-3 border-t border-white/[0.06]">
        <Button variant="ghost" size="sm" onClick={() => setAddProductOpen(false)}>
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          isLoading={isTracking}
          leftIcon={<Bell className="h-3.5 w-3.5" />}
        >
          Deploy Watcher
        </Button>
      </div>
    </form>
  );
}