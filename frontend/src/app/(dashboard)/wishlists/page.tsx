'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { useWishlists } from '@/hooks/useWishlists';
import { WishlistGrid } from '@/components/wishlist/WishlistGrid';

export default function WishlistsPage() {
  const { wishlists, isLoading, createWishlist, isCreating, deleteWishlist } = useWishlists();
  const [newTitle, setNewTitle] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    await createWishlist({ title: newTitle, isPublic });
    setNewTitle('');
    setIsPublic(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this wishlist?')) {
      void deleteWishlist(id);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-semibold">Your Wishlists</h1>
        <p className="mt-2 text-emerald-100/60">
          Organize your tracked products and share them with the world.
        </p>
      </div>

      <div className="rounded-3xl border border-emerald-500/15 bg-emerald-950/20 p-6">
        <h2 className="text-lg font-medium mb-4 text-emerald-50">Create New Wishlist</h2>
        <form onSubmit={handleCreate} className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <Input
              id="wishlist-title"
              label="Wishlist Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Gaming Setup 2026"
              required
            />
          </div>
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <input
              type="checkbox"
              id="is-public"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-4 w-4 rounded accent-emerald-400"
            />
            <label htmlFor="is-public" className="text-sm text-emerald-100/80 cursor-pointer">
              Make Public
            </label>
          </div>
          <Button 
            type="submit" 
            disabled={!newTitle.trim() || isCreating}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Create
          </Button>
        </form>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500/30 border-t-emerald-400"></div>
        </div>
      ) : (
        <WishlistGrid
          wishlists={wishlists}
          onDelete={handleDelete}
          onView={(id) => console.log('Navigate to wishlist detail', id)}
        />
      )}
    </div>
  );
}
