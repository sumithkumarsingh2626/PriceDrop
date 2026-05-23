import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Copy, Check, Twitter, Facebook, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/button';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export function ShareModal({ isOpen, onClose, url, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(`Check out my wishlist: ${title}`);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-[2rem] border border-emerald-500/20 bg-[#0a0f0d] p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold text-emerald-50">Share Wishlist</Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded-full p-2 text-emerald-100/50 transition hover:bg-emerald-500/10 hover:text-emerald-100">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-2 pl-4">
            <span className="flex-1 truncate text-sm text-emerald-100/80">{url}</span>
            <Button
              variant="primary"
              onClick={handleCopy}
              className="py-1.5 px-3 h-auto min-h-0 text-xs"
              leftIcon={copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-emerald-100/60 mb-3">Or share via</p>
            <div className="flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 py-3 rounded-xl border border-emerald-500/10 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-500/10 transition"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 py-3 rounded-xl border border-emerald-500/10 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-500/10 transition"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/?text=${encodedTitle} ${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1 py-3 rounded-xl border border-emerald-500/10 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-500/10 transition"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
