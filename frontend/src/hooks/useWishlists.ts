import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { getEnvelopeData } from '@/lib/api-envelope';
import { WishlistData } from '@/components/wishlist/WishlistGrid';

export function useWishlists() {
  const queryClient = useQueryClient();

  const query = useQuery<WishlistData[]>({
    queryKey: ['wishlists'],
    queryFn: async () => {
      const response = await api.get('/wishlists');
      const bundle = getEnvelopeData<{ wishlists: WishlistData[] }>(
        response,
        'Unable to load wishlists',
      );
      return bundle.wishlists ?? [];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload: { title: string; isPublic: boolean }) => {
      const response = await api.post('/wishlists', payload);
      const bundle = getEnvelopeData<{ wishlist: WishlistData }>(
        response,
        'Failed to create wishlist',
      );
      return bundle.wishlist;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['wishlists'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/wishlists/${id}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['wishlists'] });
    },
  });

  return {
    wishlists: query.data ?? [],
    isLoading: query.isLoading,
    createWishlist: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    deleteWishlist: deleteMutation.mutateAsync,
  };
}

export function usePublicWishlist(slug: string) {
  const query = useQuery<WishlistData>({
    queryKey: ['public-wishlist', slug],
    queryFn: async () => {
      const response = await api.get(`/wishlists/public/${slug}`);
      const bundle = getEnvelopeData<{ wishlist: WishlistData }>(
        response,
        'Unable to load wishlist',
      );
      return bundle.wishlist;
    },
    retry: false, // Don't retry if not found
  });

  return {
    wishlist: query.data,
    isLoading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
  };
}
