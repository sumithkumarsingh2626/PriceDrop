export interface NotificationPreferences {
  email: boolean;
  whatsapp: boolean;
  sms: boolean;
  push: boolean;
}

export interface ProductNotificationSettings extends NotificationPreferences {
  anyPriceDrop: boolean;
  targetPriceAlert: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
  isVerified: boolean;
  notificationPreferences: NotificationPreferences;
  role: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface PriceHistoryPoint {
  _id?: string;
  price: number;
  currency: string;
  scrapedAt: string;
  percentageChange: number;
}

export interface ProductAnalytics {
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  totalPriceDrops: number;
  percentageDifference: number;
  currentPrice: number;
}

export interface Product {
  _id: string;
  title: string;
  productImage?: string;
  productUrl: string;
  currentPrice: number;
  targetPrice?: number | null;
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  storeName: string;
  availability: 'in_stock' | 'out_of_stock' | 'limited' | 'unknown';
  variant?: string;
  trackingStatus: 'active' | 'paused';
  notificationEnabled: boolean;
  notificationSettings: ProductNotificationSettings;
  currency: string;
  lastScrapedAt?: string;
  lastPriceChange?: number;
  totalPriceDrops: number;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationItem {
  _id: string;
  productId?: {
    _id?: string;
    title?: string;
    productImage?: string;
    currentPrice?: number;
    currency?: string;
    storeName?: string;
  };
  notificationType: 'price_drop' | 'target_price' | 'system';
  channel: 'email' | 'sms' | 'whatsapp' | 'push';
  status: 'pending' | 'sent' | 'failed' | 'skipped';
  sentAt?: string;
  messageBody: string;
  createdAt: string;
}
