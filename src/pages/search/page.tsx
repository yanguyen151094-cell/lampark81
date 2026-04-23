import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FloatingContacts from '@/components/feature/FloatingContacts';
import ChatWidget from '@/components/feature/ChatWidget';
import { roomTypes, priceRanges } from '@/mocks/rooms';
import { useDataStore } from '@/context/DataStore';
import BookingModal from './components/BookingModal';
import RoomDetailModal from '@/pages/home/components/RoomDetailModal';

function formatPrice(price: number): string {
  return price.toLocaleString('vi-VN') + ' VND/Đêm';
}

export default function SearchPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [bookingRoom, setBookingRoom] = useState<ReturnType<typeof useDataStore>['rooms'][0] | null>(null);
  const [viewRoom, setViewRoom] = useState<ReturnType<typeof useDataStore>['rooms'][0] | null>(null);
  const navigate = useNavigate();
  const { rooms } = useDataStore();

  const filtered = useMemo(() => {
    let result = [...rooms];
    if (selectedType !== 'all') result = result.filter((r) => r.type === selectedType);
    if (selectedPrice !== 'all') {
      const [min, max] = selectedPrice.split('-').map(Number);
      result = result.filter((r) => r.price >= min && r.price <= max);
    }
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [selectedType, selectedPrice, sortBy, rooms]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gray-900 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Tìm Kiếm Phòng</h1>
          <p className="text-gray-400">Tìm phòng phù hợp với nhu cầu của bạn tại LamPark81</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 md:p-5 mb-6 flex flex-col md:flex-row gap-4 items-end" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Loại phòng</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {roomTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Khoảng giá</label>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {priceRanges.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div className="flex-1 w-full">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Sắp xếp</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>
          <div className="text-sm text-gray-500 whitespace-nowrap">
            Tìm thấy <strong className="text-gray-900">{filtered.length}</strong> phòng
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setViewRoom(room)}>
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${room.status === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {room.status === 'available' ? 'Còn phòng' : 'Đã đặt'}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <i className="ri-image-line text-xs"></i>
                  {room.images.length} ảnh
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full">Xem ảnh phòng</span>
                </div>
              </div>

              <div className="p-4 md:p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">{room.name}</h3>
                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <i className="ri-star-fill text-amber-400 text-sm"></i>
                    <span className="text-sm font-semibold text-gray-700">{room.rating}</span>
                  </div>
                </div>

                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{room.description}</p>

                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><i className="ri-ruler-line"></i>{room.area}m²</span>
                  <span className="flex items-center gap-1"><i className="ri-building-line"></i>Tầng {room.floor}</span>
                  <span className="flex items-center gap-1"><i className="ri-star-line"></i>{room.reviewCount} đánh giá</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {room.amenities.slice(0, 4).map((a) => (
                    <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a}</span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{room.amenities.length - 4}</span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg font-bold text-gray-900">{formatPrice(room.price)}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewRoom(room)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs px-3 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Xem phòng
                    </button>
                    <button
                      onClick={() => setBookingRoom(room)}
                      disabled={room.status !== 'available'}
                      className={`font-semibold text-xs px-3 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                        room.status === 'available'
                          ? 'bg-amber-400 hover:bg-amber-500 text-gray-900'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {room.status === 'available' ? 'Đặt phòng' : 'Hết phòng'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <i className="ri-search-line text-5xl text-gray-300 mb-4 block"></i>
            <p className="text-gray-500 text-lg">Không tìm thấy phòng phù hợp</p>
            <p className="text-gray-400 text-sm mt-2">Thử thay đổi bộ lọc tìm kiếm</p>
          </div>
        )}
      </div>

      <Footer />
      <FloatingContacts />
      <ChatWidget />
      {bookingRoom && <BookingModal room={bookingRoom} onClose={() => setBookingRoom(null)} />}
      {viewRoom && (
        <RoomDetailModal
          room={viewRoom}
          onClose={() => setViewRoom(null)}
          onBook={() => { setViewRoom(null); setBookingRoom(viewRoom); }}
        />
      )}
    </div>
  );
}
