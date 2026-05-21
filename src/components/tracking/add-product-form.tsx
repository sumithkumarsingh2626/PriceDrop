import React, { useMemo, useState } from 'react';
import { Bell, Globe, MessageCircle, Send, Smartphone, Target } from 'lucide-react';
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
    <label className="flex items-center justify-between rounded-2xl border border-emerald-500/10 bg-emerald-950/20 px-4 py-3 text-sm text-emerald-50/85">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-emerald-400/20 bg-transparent accent-emerald-400"
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
    email: true,
    whatsapp: false,
    sms: false,
    push: false,
    anyPriceDrop: true,
    targetPriceAlert: true,
  });

  const urlHint = useMemo(() => {
    if (!url) return 'Supported stores: Amazon, BestBuy, Zara';
    try {
      const host = new URL(url).hostname.replace(/^www\./, '');
      return `Detected host: ${host}`;
    } catch {
      return 'Enter a full product URL';
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

      success('Product added and first scrape completed.');
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
      <div className="rounded-3xl border border-emerald-500/10 bg-emerald-950/20 p-4 text-sm text-emerald-100/65">
        Paste a product page and we will scrape the title, current price, image, availability, and store before saving the first history point.
      </div>

      <Input
        id="product-url"
        label="Product URL"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://www.amazon.com/... or https://www.bestbuy.com/..."
        leftIcon={<Globe className="h-4 w-4" />}
        error={formError || undefined}
      />
      <p className="text-xs text-emerald-100/45">{urlHint}</p>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          id="target-price"
          label="Target price"
          type="number"
          min="0"
          value={targetPrice}
          onChange={(event) => setTargetPrice(event.target.value)}
          placeholder="Optional"
          leftIcon={<Target className="h-4 w-4" />}
        />
        <Input
          id="variant"
          label="Variant"
          value={variant}
          onChange={(event) => setVariant(event.target.value)}
          placeholder="Color, size, storage..."
        />
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-emerald-200/60">Notification channels</p>
          <h4 className="mt-2 text-lg font-semibold text-emerald-50">Alert this product separately</h4>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <NotificationToggle label="Email notification" checked={settings.email} onChange={(email) => setSettings((prev) => ({ ...prev, email }))} />
          <NotificationToggle label="WhatsApp notification" checked={settings.whatsapp} onChange={(whatsapp) => setSettings((prev) => ({ ...prev, whatsapp }))} />
          <NotificationToggle label="SMS notification" checked={settings.sms} onChange={(sms) => setSettings((prev) => ({ ...prev, sms }))} />
          <NotificationToggle label="Push notification" checked={settings.push} onChange={(push) => setSettings((prev) => ({ ...prev, push }))} />
          <NotificationToggle label="Any price drop" checked={settings.anyPriceDrop} onChange={(anyPriceDrop) => setSettings((prev) => ({ ...prev, anyPriceDrop }))} />
          <NotificationToggle label="Target price reached" checked={settings.targetPriceAlert} onChange={(targetPriceAlert) => setSettings((prev) => ({ ...prev, targetPriceAlert }))} />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <Button variant="ghost" onClick={() => setAddProductOpen(false)}>
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isTracking}
          leftIcon={<Bell className="h-4 w-4" />}
        >
          Start tracking
        </Button>
      </div>
    </form>
  );
}
