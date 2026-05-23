import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { getEnvelopeData } from '@/lib/api-envelope';

interface ComparisonResult {
  _id?: string;
  platform: string;
  productTitle: string;
  productUrl: string;
  currentPrice: number;
  originalPrice: number;
  image: string;
  inStock: boolean;
  lastChecked: string;
}

export function useComparisons(productId: string | undefined) {
  const queryClient = useQueryClient();
  const enabled = Boolean(productId);

  const query = useQuery<ComparisonResult[]>({
    queryKey: ['comparisons', productId],
    enabled,
    queryFn: async () => {
      const response = await api.get(`/comparison/${productId}`);
      const bundle = getEnvelopeData<{ comparisons: ComparisonResult[] }>(
        response,
        'Unable to load price comparisons',
      );
      return bundle.comparisons ?? [];
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const refreshMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(`/comparison/${productId}/trigger`);
      const bundle = getEnvelopeData<{ comparisons: ComparisonResult[] }>(
        response,
        'Failed to refresh comparisons',
      );
      return bundle.comparisons ?? [];
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['comparisons', productId] });
    },
  });

  return {
    comparisons: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error ? (query.error as Error).message : null,
    refresh: refreshMutation.mutateAsync,
    isRefreshing: refreshMutation.isPending,
  };
}
