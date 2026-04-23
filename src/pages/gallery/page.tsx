import { useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FloatingContacts from '@/components/feature/FloatingContacts';
import ChatWidget from '@/components/feature/ChatWidget';
import { rooms } from '@/mocks/rooms';

const ALL_IMAGES = rooms.flatMap((room) =>
  room.images.map((img, idx) => ({
    src: img,
    roomName: room.name,
    roomId: room.id,
    price: room.price,
    type: room.type,
    idx,
  }))
);

const EXTRA_IMAGES = [
  { src: 'https://readdy.ai/api/search-image?query=modern%20apartment%20building%20lobby%20with%20elegant%20reception%20desk%2C%20marble%20floor%2C%20warm%20lighting%2C%20luxury%20interior%20design%2C%20Vietnam%20residential&width=800&height=600&seq=ex1&orientation=landscape', roomName: 'Sảnh tòa nhà', roomId: 'extra', price: 0, type: 'common', idx: 0 },
  { src: 'https://readdy.ai/api/search-image?query=apartment%20building%20rooftop%20garden%20with%20plants%2C%20seating%20area%2C%20city%20view%2C%20relaxing%20outdoor%20space%2C%20Vietnam&width=800&height=600&seq=ex2&orientation=landscape', roomName: 'Sân thượng', roomId: 'extra', price: 0, type: 'common', idx: 1 },
  { src: 'https://readdy.ai/api/search-image?query=modern%20apartment%20gym%20fitness%20room%20with%20equipment%2C%20mirrors%2C%20clean%20design%2C%20residential%20building%20amenity&width=800&height=600&seq=ex3&orientation=landscape', roomName: 'Phòng gym', roomId: 'extra', price: 0, type: 'common', idx: 2 },
  { src: 'https://readdy.ai/api/search-image?query=apartment%20building%20parking%20garage%20with%20security%20camera%2C%20clean%20organized%20space%2C%20residential%20parking%20lot&width=800&height=600&seq=ex4&orientation=landscape', roomName: 'Bãi xe', roomId: 'extra', price: 0, type: 'common', idx: 3 },
  { src: 'https://readdy.ai/api/search-image?query=cozy%20studio%20apartment%20bedroom%20with%20soft%20lighting%2C%20comfortable%20bed%2C%20minimalist%20decor%2C%20warm%20atmosphere%2C%20Vietnam%20rental&width=800&height=600&seq=ex5&orientation=landscape', roomName: 'Phòng ngủ Studio', roomId: 'extra', price: 0, type: 'studio', idx: 4 },
  { src: 'https://readdy.ai/api/search-image?query=modern%20apartment%20balcony%20with%20city%20view%2C%20outdoor%20furniture%2C%20plants%2C%20beautiful%20urban%20landscape%2C%20Vietnam&width=800&height=600&seq=ex6&orientation=landscape', roomName: 'Ban công view đẹp', roomId: 'extra', price: 0, type: 'common', idx: 5 },
];

const GALLERY = [...ALL_IMAGES, ...EXTRA_IMAGES];

const CATEGORIES = [
  { value: 'all', label: 'Tất cả' },
  { value: 'studio', label: 'Studio' },
  { value: '1bedroom', label: '1 Phòng ngủ' },
  { value: 'deluxe', label: 'Deluxe' },
  { value: 'premium', label: 'Premium' },
  { value: 'common', label: 'Tiện ích chung' },
];

export default function GalleryPage() {
  const [category, setCategory] = useState('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = category === 'all' ? GALLERY : GALLERY.filter((img) => img.type === category);

  const handlePrev = () => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  };

  const handleNext = () => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % filtered.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gray-900 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Thư Viện Ảnh</h1>
          <p className="text-gray-400">Khám phá không gian sống tại LamPark81 qua từng bức ảnh</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                category === cat.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              style={{ boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}
            >
              {cat.label}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-500 self-center">{filtered.length} ảnh</span>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {filtered.map((img, idx) => (
            <div
              key={`${img.roomId}-${img.idx}-${idx}`}
              className="break-inside-avoid relative overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => setLightbox(idx)}
            >
              <img
                src={img.src}
                alt={img.roomName}
                className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-semibold text-xs">{img.roomName}</p>
                </div>
                <div className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-white/20 rounded-full">
                  <i className="ri-zoom-in-line text-white text-xs"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <FloatingContacts />
      <ChatWidget />

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white text-3xl cursor-pointer z-10" onClick={() => setLightbox(null)}>
            <i className="ri-close-line"></i>
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white text-2xl cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
          <div className="max-w-5xl w-full px-16" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].roomName}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <p className="text-white text-center mt-4 font-medium">{filtered[lightbox].roomName}</p>
            <p className="text-gray-400 text-center text-sm">{lightbox + 1} / {filtered.length}</p>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white text-2xl cursor-pointer z-10"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
      )}
    </div>
  );
}
