import { useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FloatingContacts from '@/components/feature/FloatingContacts';
import { reels } from '@/mocks/reels';

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export default function ChatReelsPage() {
  const [activeReel, setActiveReel] = useState<typeof reels[0] | null>(null);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedReels((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Header */}
      <div className="pt-20 pb-8 px-4 text-center">
        <span className="inline-block bg-amber-400/20 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          REELS
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Video Giới Thiệu</h1>
        <p className="text-gray-400 text-sm md:text-base">Khám phá LamPark81 qua những video thực tế</p>
      </div>

      {/* Reels Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
              style={{ aspectRatio: '9/16' }}
              onClick={() => setActiveReel(reel)}
            >
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Play */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/50">
                  <i className="ri-play-fill text-white text-xl ml-1"></i>
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-semibold text-xs leading-tight mb-1.5 line-clamp-2">{reel.title}</p>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5 text-white/70 text-xs">
                    <i className="ri-eye-line text-xs"></i>
                    {formatViews(reel.views)}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLike(reel.id); }}
                    className={`flex items-center gap-0.5 text-xs transition-colors cursor-pointer ${likedReels.has(reel.id) ? 'text-red-400' : 'text-white/70'}`}
                  >
                    <i className={likedReels.has(reel.id) ? 'ri-heart-fill' : 'ri-heart-line'}></i>
                    {formatViews(reel.likes + (likedReels.has(reel.id) ? 1 : 0))}
                  </button>
                </div>
              </div>

              {/* Duration */}
              <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-full">{reel.duration}</div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gray-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Liên hệ với chúng tôi</h2>
          <p className="text-gray-400 mb-8">Đội ngũ hỗ trợ 24/7 luôn sẵn sàng giúp bạn</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://zalo.me/0123456789"
              target="_blank"
              rel="nofollow noreferrer"
              className="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-message-2-fill text-xl"></i>
              Chat Zalo
            </a>
            <a
              href="tel:0123456789"
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-phone-fill text-xl"></i>
              Gọi: 0123 456 789
            </a>
            <a
              href="https://facebook.com/lampark81"
              target="_blank"
              rel="nofollow noreferrer"
              className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-facebook-fill text-xl"></i>
              Facebook
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingContacts />

      {/* Video Modal */}
      {activeReel && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setActiveReel(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl cursor-pointer z-10" onClick={() => setActiveReel(null)}>
            <i className="ri-close-line"></i>
          </button>
          <div className="max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '9/16' }}>
              <img src={activeReel.thumbnail} alt={activeReel.title} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-20 h-20 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full border-2 border-white/50">
                  <i className="ri-play-fill text-white text-4xl ml-2"></i>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-bold text-base mb-2">{activeReel.title}</p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-white/70 text-sm">
                    <i className="ri-eye-line"></i>{formatViews(activeReel.views)}
                  </span>
                  <span className="flex items-center gap-1 text-white/70 text-sm">
                    <i className="ri-heart-line"></i>{formatViews(activeReel.likes)}
                  </span>
                  <span className="text-white/50 text-sm ml-auto">{activeReel.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
