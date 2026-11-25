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
    <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-slate-200 backdrop-blur-md transition-colors hover:border-white/20 cursor-pointer">
      <span className="font-medium">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-white/20 bg-slate-900 accent-brand-cyan cursor-pointer"
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
    if (!url) return 'Supported stores: Amazon, Flipkart, BestBuy, Zara';
    try {
      const host = new URL(url).hostname.replace(/^www\./, '');
      return `Detected store host: ${host}`;
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

      success('Product added and initial scrape completed.');
      setUrl('');
      setTargetPrice('');
      setVariant('');
      setAddProductOpen(false);
    } catch (submissionError) {
      error(submissionError instanceof Error ? submissionError.message : 'Unable to track product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex items-center gap-3 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/10 p-3.5 text-xs text-slate-300 backdrop-blur-md">
        <Sparkles className="h-5 w-5 shrink-0 text-brand-cyan" />
        <p>Paste any product URL. The intelligence engine extracts price, title, image, and currency automatically.</p>
      </div>

      <div className="space-y-1.5">
        <Input
          id="product-url"
          label="Product URL"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://www.amazon.in/... or https://www.flipkart.com/..."
          leftIcon={<Globe className="h-4 w-4" />}
          error={formError || undefined}
        />
        <p className="text-[11px] font-medium text-slate-500 pl-1">{urlHint}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          id="target-price"
          label="Target Alert Price"
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
          placeholder="Color, size, or edition"
        />
      </div>

      <div className="space-y-3 pt-1">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-purple">
            Dispatch Channels
          </span>
          <h4 className="text-sm font-bold text-white mt-0.5">Notification Triggers</h4>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          <NotificationToggle label="WhatsApp Notification" checked={settings.whatsapp} onChange={(whatsapp) => setSettings((prev) => ({ ...prev, whatsapp }))} />
          <NotificationToggle label="SMS Text Notification" checked={settings.sms} onChange={(sms) => setSettings((prev) => ({ ...prev, sms }))} />
          <NotificationToggle label="In-App Push Alerts" checked={settings.push} onChange={(push) => setSettings((prev) => ({ ...prev, push }))} />
          <NotificationToggle label="Alert on Any Drop" checked={settings.anyPriceDrop} onChange={(anyPriceDrop) => setSettings((prev) => ({ ...prev, anyPriceDrop }))} />
          <NotificationToggle label="Target Price Met" checked={settings.targetPriceAlert} onChange={(targetPriceAlert) => setSettings((prev) => ({ ...prev, targetPriceAlert }))} />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3 pt-3 border-t border-white/[0.06]">
        <Button variant="ghost" onClick={() => setAddProductOpen(false)}>
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isTracking}
          leftIcon={<Bell className="h-4 w-4" />}
        >
          Track Product
        </Button>
      </div>
    </form>
  );
}