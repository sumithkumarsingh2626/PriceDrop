import { useMemo } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import api from '@/services/api.js';
import { getEnvelopeData } from '@/lib/api-envelope';
import {
  normalizeHistoryPoint,
  normalizeProduct,
} from '@/lib/normalize-product';
import type {
  NotificationItem,
  PriceHistoryPoint,
  Product,
  ProductAnalytics,
  ProductNotificationSettings,
} from '@/types';

function mapNotification(raw: Record<string, unknown>): NotificationItem {
  const product = raw.productId as Record<string, unknown> | undefined;

  return {
    _id: String(raw._id ?? ''),
    productId: product
      ? {
          _id: product._id ? String(product._id) : undefined,
          title: typeof product.title === 'string' ? product.title : undefined,
          productImage:
            typeof product.productImage === 'string' ? product.productImage : undefined,
          currentPrice:
            product.currentPrice === undefined ? undefined : Number(product.currentPrice),
          currency: typeof product.currency === 'string' ? product.currency : undefined,
          storeName: typeof product.storeName === 'string' ? product.storeName : undefined,
        }
      : undefined,
    notificationType:
      raw.notificationType === 'target_price' ||
      raw.notificationType === 'system'
        ? raw.notificationType
        : 'price_drop',
    channel:
      raw.channel === 'sms' ||
      raw.channel === 'whatsapp' ||
      raw.channel === 'push'
        ? raw.channel
        : 'email',
    status:
      raw.status === 'pending' ||
      raw.status === 'failed' ||
      raw.status === 'skipped'
        ? raw.status
        : 'sent',
    sentAt: typeof raw.sentAt === 'string' ? raw.sentAt : undefined,
    messageBody: typeof raw.messageBody === 'string' ? raw.messageBody : '',
    createdAt:
      typeof raw.createdAt === 'string' ? raw.createdAt : new Date().toISOString(),
  };
}

export function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/products');
      const bundle = getEnvelopeData<{ products: Record<string, unknown>[] }>(
        response,
        'Unable to load tracked products',
      );
      return (bundle.products ?? []).map(normalizeProduct);
    },
  });

  const trackProductMutation = useMutation({
    mutationFn: async (payload: {
      url: string;
      targetPrice?: number | null;
      variant?: string;
      notificationEnabled?: boolean;
      notificationSettings?: Partial<ProductNotificationSettings>;
    }) => {
      const response = await api.post('/products/track', payload);
      const bundle = getEnvelopeData<{ product: Record<string, unknown> }>(
        response,
        'Unable to track product',
      );
      return normalizeProduct(bundle.product);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['products'] });
      void queryClient.invalidateQueries({ queryKey: ['notifications-feed'] });
    },
  });

  const updateNotificationsMutation = useMutation({
    mutationFn: async ({
      id,
      notificationEnabled,
      notificationSettings,
    }: {
      id: string;
      notificationEnabled?: boolean;
      notificationSettings?: Partial<ProductNotificationSettings>;
    }) => {
      const response = await api.patch(`/products/${id}/notifications`, {
        notificationEnabled,
        notificationSettings,
      });
      const bundle = getEnvelopeData<{ product: Record<string, unknown> }>(
        response,
        'Unable to update notifications',
      );
      return normalizeProduct(bundle.product);
    },
    onSuccess: (_product, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['products'] });
      void queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });

  const updateTrackingMutation = useMutation({
    mutationFn: async ({
      id,
      trackingStatus,
      targetPrice,
      variant,
    }: {
      id: string;
      trackingStatus?: 'active' | 'paused';
      targetPrice?: number | null;
      variant?: string;
    }) => {
      const response = await api.patch(`/products/${id}/tracking`, {
        trackingStatus,
        targetPrice,
        variant,
      });
      const bundle = getEnvelopeData<{ product: Record<string, unknown> }>(
        response,
        'Unable to update tracking status',
      );
      return normalizeProduct(bundle.product);
    },
    onSuccess: (_product, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['products'] });
      void queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      void queryClient.invalidateQueries({ queryKey: ['product-analytics', variables.id] });
    },
  });

  const refreshProductMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post(`/products/${id}/refresh`);
      const bundle = getEnvelopeData<{ product: Record<string, unknown> }>(
        response,
        'Unable to refresh product',
      );
      return normalizeProduct(bundle.product);
    },
    onSuccess: (_product, id) => {
      void queryClient.invalidateQueries({ queryKey: ['products'] });
      void queryClient.invalidateQueries({ queryKey: ['product', id] });
      void queryClient.invalidateQueries({ queryKey: ['product-history', id] });
      void queryClient.invalidateQueries({ queryKey: ['product-analytics', id] });
      void queryClient.invalidateQueries({ queryKey: ['notifications-feed'] });
    },
  });

  return {
    products: productsQuery.data ?? [],
    isLoading: productsQuery.isLoading,
    isFetching: productsQuery.isFetching,
    refetch: productsQuery.refetch,
    trackProduct: trackProductMutation.mutateAsync,
    isTracking: trackProductMutation.isPending,
    updateNotifications: updateNotificationsMutation.mutateAsync,
    isUpdatingNotifications: updateNotificationsMutation.isPending,
    updateTracking: updateTrackingMutation.mutateAsync,
    isUpdatingTracking: updateTrackingMutation.isPending,
    refreshProduct: refreshProductMutation.mutateAsync,
    isRefreshingProduct: refreshProductMutation.isPending,
  };
}

export function useProductDetails(
  productId: string | undefined,
  range: '7d' | '1m' | '3m' | 'max' = '1m',
) {
  const enabled = Boolean(productId);

  const productQuery = useQuery<Product>({
    queryKey: ['product', productId],
    enabled,
    queryFn: async () => {
      const response = await api.get(`/products/${productId}`);
      const bundle = getEnvelopeData<{ product: Record<string, unknown> }>(
        response,
        'Unable to load product',
      );
      return normalizeProduct(bundle.product);
    },
  });

  const historyQuery = useQuery<PriceHistoryPoint[]>({
    queryKey: ['product-history', productId, range],
    enabled,
    queryFn: async () => {
      const response = await api.get(`/products/${productId}/history`, {
        params: { range },
      });
      const bundle = getEnvelopeData<{ history: Record<string, unknown>[] }>(
        response,
        'Unable to load price history',
      );
      return (bundle.history ?? []).map(normalizeHistoryPoint);
    },
  });

  const analyticsQuery = useQuery<ProductAnalytics>({
    queryKey: ['product-analytics', productId],
    enabled,
    queryFn: async () => {
      const response = await api.get(`/products/${productId}/analytics`);
      const bundle = getEnvelopeData<{ analytics: ProductAnalytics }>(
        response,
        'Unable to load analytics',
      );
      return bundle.analytics;
    },
  });

  return {
    product: productQuery.data,
    history: historyQuery.data ?? [],
    analytics: analyticsQuery.data,
    isLoading:
      productQuery.isLoading || historyQuery.isLoading || analyticsQuery.isLoading,
    isRefetching:
      productQuery.isFetching || historyQuery.isFetching || analyticsQuery.isFetching,
  };
}

export function useNotificationsFeed() {
  const notificationsQuery = useQuery<NotificationItem[]>({
    queryKey: ['notifications-feed'],
    queryFn: async () => {
      const response = await api.get('/products/notifications/feed');
      const bundle = getEnvelopeData<{ notifications: Record<string, unknown>[] }>(
        response,
        'Unable to load notifications',
      );
      return (bundle.notifications ?? []).map(mapNotification);
    },
  });

  return useMemo(
    () => ({
      notifications: notificationsQuery.data ?? [],
      isLoading: notificationsQuery.isLoading,
      isFetching: notificationsQuery.isFetching,
    }),
    [notificationsQuery.data, notificationsQuery.isFetching, notificationsQuery.isLoading],
  );
}
