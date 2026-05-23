import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { getEnvelopeData } from '@/lib/api-envelope';
import { Product } from '@/types';

interface Recommendation {
  _id: string;
  reason: string;
  score: number;
  product: Product;
}

export function useRecommendations(productId: string | undefined) {
  const enabled = Boolean(productId);

  const query = useQuery<Recommendation[]>({
    queryKey: ['recommendations', productId],
    enabled,
    queryFn: async () => {
      const response = await api.get(`/recommendations/${productId}`);
      const bundle = getEnvelopeData<{ recommendations: Recommendation[] }>(
        response,
        'Unable to load recommendations'
      );
      return bundle.recommendations ?? [];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return {
    recommendations: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
  };
}
