import type { PriceHistoryPoint, Product, ProductNotificationSettings } from '@/types';

function normalizeNotificationSettings(raw: unknown): ProductNotificationSettings {
  const value = raw as Partial<ProductNotificationSettings> | undefined;

  return {
    email: Boolean(value?.email),
    whatsapp: Boolean(value?.whatsapp),
    sms: Boolean(value?.sms),
    push: Boolean(value?.push),
    anyPriceDrop: value?.anyPriceDrop ?? true,
    targetPriceAlert: value?.targetPriceAlert ?? true,
  };
}

export function normalizeProduct(raw: Record<string, unknown>): Product {
  return {
    _id: String(raw._id ?? ''),
    title: typeof raw.title === 'string' ? raw.title : 'Untitled product',
    productImage: typeof raw.productImage === 'string' ? raw.productImage : undefined,
    productUrl: typeof raw.productUrl === 'string' ? raw.productUrl : '',
    currentPrice: Number(raw.currentPrice ?? 0),
    targetPrice:
      raw.targetPrice === null || raw.targetPrice === undefined ? null : Number(raw.targetPrice),
    lowestPrice: Number(raw.lowestPrice ?? raw.currentPrice ?? 0),
    highestPrice: Number(raw.highestPrice ?? raw.currentPrice ?? 0),
    averagePrice: Number(raw.averagePrice ?? raw.currentPrice ?? 0),
    storeName: typeof raw.storeName === 'string' ? raw.storeName : 'Unknown',
    availability:
      raw.availability === 'in_stock' ||
      raw.availability === 'out_of_stock' ||
      raw.availability === 'limited'
        ? raw.availability
        : 'unknown',
    variant: typeof raw.variant === 'string' ? raw.variant : undefined,
    trackingStatus: raw.trackingStatus === 'paused' ? 'paused' : 'active',
    notificationEnabled: raw.notificationEnabled !== false,
    notificationSettings: normalizeNotificationSettings(raw.notificationSettings),
    currency: typeof raw.currency === 'string' ? raw.currency : 'USD',
    lastScrapedAt: typeof raw.lastScrapedAt === 'string' ? raw.lastScrapedAt : undefined,
    lastPriceChange:
      raw.lastPriceChange === undefined ? undefined : Number(raw.lastPriceChange),
    totalPriceDrops: Number(raw.totalPriceDrops ?? 0),
    createdAt:
      typeof raw.createdAt === 'string' ? raw.createdAt : new Date().toISOString(),
    updatedAt:
      typeof raw.updatedAt === 'string' ? raw.updatedAt : new Date().toISOString(),
  };
}

export function normalizeHistoryPoint(raw: Record<string, unknown>): PriceHistoryPoint {
  return {
    _id: raw._id ? String(raw._id) : undefined,
    price: Number(raw.price ?? 0),
    currency: typeof raw.currency === 'string' ? raw.currency : 'USD',
    scrapedAt:
      typeof raw.scrapedAt === 'string' ? raw.scrapedAt : new Date().toISOString(),
    percentageChange: Number(raw.percentageChange ?? 0),
  };
}
