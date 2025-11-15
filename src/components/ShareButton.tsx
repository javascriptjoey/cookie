'use client';

import { useState } from 'react';
import { Share2, Facebook, Twitter, Mail, Link as LinkIcon, MessageCircle, Check } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  description?: string;
  url?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'icon';
}

export default function ShareButton({
  title,
  description = '',
  url,
  size = 'md',
  variant = 'button'
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = `${title}${description ? ' - ' + description : ''}`;

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'from-[#1877F2] to-[#0C63D4]',
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        );
      }
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'from-[#1DA1F2] to-[#0C85D0]',
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        );
      }
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'from-[#25D366] to-[#128C7E]',
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
          '_blank'
        );
      }
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'from-[#EA4335] to-[#C5221F]',
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
      }
    },
    {
      name: copied ? 'Copied!' : 'Copy Link',
      icon: copied ? Check : LinkIcon,
      color: 'from-[#9B59B6] to-[#FF69B4]',
      action: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      }
    }
  ];

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const buttonSizeClasses = {
    sm: 'p-2',
    md: 'px-4 py-2',
    lg: 'px-6 py-3'
  };

  return (
    <div className="relative">
      {variant === 'button' ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${buttonSizeClasses[size]} flex items-center gap-2 bg-white border-2 border-[#E1BEE7] text-[#9B59B6] font-semibold rounded-xl hover:bg-[#E1BEE7]/30 transition-all`}
        >
          <Share2 className={sizeClasses[size]} />
          <span className="text-sm">Share</span>
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-white/50 rounded-full transition-all"
        >
          <Share2 className={sizeClasses[size]} />
        </button>
      )}

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Share Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-4 border-[#FFB3D9]/50 z-50 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-[#FFB3D9]/20 to-[#E1BEE7]/20 border-b border-[#E1BEE7]/50">
              <h3 className="font-bold text-[#2C1810]">Share this cookie recipe</h3>
            </div>
            <div className="p-2">
              {shareOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.name}
                    onClick={() => {
                      option.action();
                      if (option.name !== 'Copy Link' && option.name !== 'Copied!') {
                        setIsOpen(false);
                      }
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gradient-to-r hover:from-[#FFB3D9]/10 hover:to-[#E1BEE7]/10 rounded-xl transition-all"
                  >
                    <div className={`p-2 bg-gradient-to-r ${option.color} rounded-lg`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-[#2C1810]">
                      {option.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
