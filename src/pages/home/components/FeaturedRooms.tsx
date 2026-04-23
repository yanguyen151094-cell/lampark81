import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';
import { useDataStore } from '@/context/DataStore';
import RoomDetailModal from './RoomDetailModal';

function formatPrice(price: number, lang: string): string {
  if (lang === 'en') {
    return `${(price / 1000000).toFixed(1).replace('.0', '')}M VND/mo`;
  }
  return `${(price / 1000000).toFixed(1).replace('.0', '')} triệu/tháng`;
}

export default function FeaturedRooms() {
  const navigate = useNavigate();
  const { rooms } = useDataStore();
  const featured = rooms.filter((r) => r.featured);
  const [selectedRoom, setSelectedRoom] = useState<typeof rooms[0] | null>(null);
  const { lang } = useLang();

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block bg-amber-100 text-amber-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              {lang === 'en' ? 'Featured Rooms' : 'Phòng nổi bật'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {lang === 'en' ? (
                <>Most<br /><span className="text-amber-500">Loved Rooms</span></>
              ) : (
                <>Phòng Được<br /><span className="text-amber-500">Yêu Thích Nhất</span></>
              )}
            </h2>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="flex items-center gap-2 text-gray-700 hover:text-amber-500 font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            {lang === 'en' ? 'View all rooms' : 'Xem tất cả phòng'}
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>

        {/* Room Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}
            >
              <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedRoom(room)}>
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${room.status === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {room.status === 'available'
                      ? (lang === 'en' ? 'Available' : 'Còn phòng')
                      : (lang === 'en' ? 'Booked' : 'Đã đặt')}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <i className="ri-image-line text-xs"></i>
                  {room.images.length}
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full">
                    {lang === 'en' ? 'View Photos' : 'Xem ảnh phòng'}
                  </span>
                </div>
              </div>

              <div className="p-4 md:p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight">{room.name}</h3>
                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <i className="ri-star-fill text-amber-400 text-sm"></i>
                    <span className="text-gray-700 text-sm font-semibold">{room.rating}</span>
                    <span className="text-gray-400 text-xs">({room.reviewCount})</span>
                  </div>
                </div>

                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{room.description}</p>

                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <i className="ri-ruler-line"></i>
                    {room.area}m²
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-building-line"></i>
                    {lang === 'en' ? `Floor ${room.floor}` : `Tầng ${room.floor}`}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {room.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a}</span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{room.amenities.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg font-bold text-gray-900">{formatPrice(room.price, lang)}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs px-3 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {lang === 'en' ? 'View Room' : 'Xem phòng'}
                    </button>
                    <button
                      onClick={() => navigate('/search')}
                      className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-xs px-3 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {lang === 'en' ? 'Book Now' : 'Đặt phòng'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRoom && (
        <RoomDetailModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onBook={() => navigate('/search')}
        />
      )}
    </section>
  );
}
