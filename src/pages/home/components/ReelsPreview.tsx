import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';
import { useDataStore } from '@/context/DataStore';

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export default function ReelsPreview() {
  const { reels } = useDataStore();
  const [activeId, setActiveId] = useState<string>(() => reels[0]?.id ?? '');
  const navigate = useNavigate();
  const { lang } = useLang();

  const activeReel = reels.find((r) => r.id === activeId) || reels[0];

  // Build embed URL with playsinline to prevent opening YouTube app
  const buildEmbedUrl = (baseUrl: string) => {
    const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https:${baseUrl}`);
    url.searchParams.set('rel', '0');
    url.searchParams.set('modestbranding', '1');
    url.searchParams.set('autoplay', '1');
    url.searchParams.set('playsinline', '1');
    url.searchParams.set('enablejsapi', '1');
    return url.toString();
  };

  return (
    <section className="py-16 md:py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <span className="inline-block bg-amber-400/20 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              {lang === 'en' ? 'INTRO VIDEOS' : 'VIDEO GIỚI THIỆU'}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              {lang === 'en' ? 'Discover ' : 'Khám Phá '}
              <span className="text-amber-400">LamPark81</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              {lang === 'en' ? 'Watch the amazing living space in real life' : 'Xem thực tế không gian sống tuyệt vời tại đây'}
            </p>
          </div>
          <button
            onClick={() => navigate('/chat')}
            className="flex items-center gap-2 text-gray-400 hover:text-amber-400 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            {lang === 'en' ? 'View all videos' : 'Xem tất cả video'}
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Featured Video Player */}
          <div className="lg:flex-1 rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                key={activeReel.id}
                src={buildEmbedUrl(activeReel.videoUrl)}
                title={activeReel.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              ></iframe>
            </div>
            {/* Video Info */}
            <div className="p-4 md:p-5">
              <h3 className="text-white font-bold text-base md:text-lg leading-tight mb-2">{activeReel.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                <span className="flex items-center gap-1.5">
                  <i className="ri-eye-line text-amber-400"></i>
                  {formatViews(activeReel.views)} {lang === 'en' ? 'views' : 'lượt xem'}
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="ri-heart-line text-rose-400"></i>
                  {formatViews(activeReel.likes)} {lang === 'en' ? 'likes' : 'thích'}
                </span>
                <span className="flex items-center gap-1.5 ml-auto">
                  <i className="ri-time-line text-gray-500"></i>
                  {activeReel.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="lg:w-72 xl:w-80 flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: '420px' }}>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-1 px-1">
              {lang === 'en' ? 'Video Playlist' : 'Danh sách video'}
            </p>
            {reels.map((reel) => (
              <button
                key={reel.id}
                onClick={() => setActiveId(reel.id)}
                className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all text-left group w-full ${
                  activeId === reel.id
                    ? 'bg-amber-500/15 border border-amber-500/40'
                    : 'bg-gray-900 border border-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover object-top"
                  />
                  {activeId === reel.id ? (
                    <div className="absolute inset-0 bg-amber-500/30 flex items-center justify-center">
                      <div className="w-6 h-6 flex items-center justify-center bg-amber-500 rounded-full">
                        <i className="ri-pause-fill text-white text-xs"></i>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full border border-white/40">
                        <i className="ri-play-fill text-white text-xs ml-0.5"></i>
                      </div>
                    </div>
                  )}
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                    {reel.duration}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold leading-tight mb-1 line-clamp-2 ${activeId === reel.id ? 'text-amber-400' : 'text-white'}`}>
                    {reel.title}
                  </p>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <span><i className="ri-eye-line mr-0.5"></i>{formatViews(reel.views)}</span>
                    <span><i className="ri-heart-line mr-0.5"></i>{formatViews(reel.likes)}</span>
                  </div>
                </div>
              </button>
            ))}

            <button
              onClick={() => navigate('/chat')}
              className="mt-1 p-3 rounded-xl bg-gray-900 border-2 border-dashed border-gray-700 hover:border-amber-500/50 text-gray-400 hover:text-amber-400 text-sm font-medium transition-all cursor-pointer flex items-center justify-center gap-2 w-full"
            >
              <i className="ri-video-add-line"></i>
              {lang === 'en' ? 'View more videos' : 'Xem thêm video'}
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-xs text-center mt-6">
          <i className="ri-information-line mr-1"></i>
          {lang === 'en'
            ? 'Admin can update YouTube links in '
            : 'Admin có thể cập nhật link YouTube thực tế trong '}
          <span className="text-amber-600 font-medium">
            {lang === 'en' ? 'Admin Dashboard → Video Reels' : 'Trang Admin → Video Reels'}
          </span>
        </p>
      </div>
    </section>
  );
}
