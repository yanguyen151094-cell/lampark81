import { useState } from 'react';

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  area: number;
  floor: number;
  status: string;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  description: string;
  featured: boolean;
}

interface Props {
  room: Room;
  onClose: () => void;
  onBook?: () => void;
}

function formatPrice(price: number): string {
  return (price / 1000000).toFixed(1).replace('.0', '') + ' triệu/tháng';
}

export default function RoomDetailModal({ room, onClose, onBook }: Props) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 md:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-2xl">
          <h3 className="font-bold text-gray-900 text-base md:text-lg">{room.name}</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer flex-shrink-0"
          >
            <i className="ri-close-line text-xl text-gray-500"></i>
          </button>
        </div>

        {/* Main Image */}
        <div className="relative w-full h-56 md:h-80 bg-gray-100 overflow-hidden">
          <img
            src={room.images[activeImg] || room.images[0]}
            alt={room.name}
            className="w-full h-full object-cover object-top"
          />
          {room.images.length > 1 && (
            <>
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full cursor-pointer transition-colors"
                onClick={() => setActiveImg((activeImg - 1 + room.images.length) % room.images.length)}
              >
                <i className="ri-arrow-left-s-line text-xl"></i>
              </button>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full cursor-pointer transition-colors"
                onClick={() => setActiveImg((activeImg + 1) % room.images.length)}
              >
                <i className="ri-arrow-right-s-line text-xl"></i>
              </button>
            </>
          )}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
            {activeImg + 1} / {room.images.length}
          </div>
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${room.status === 'available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {room.status === 'available' ? 'Còn phòng' : 'Đã đặt'}
            </span>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {room.images.length > 1 && (
          <div className="flex gap-2 px-4 md:px-5 py-3 overflow-x-auto">
            {room.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImg === idx ? 'border-amber-400' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>
        )}

        {/* Info */}
        <div className="p-4 md:p-5 space-y-4">
          {/* Price & Rating */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">{formatPrice(room.price)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="ri-star-fill text-amber-400"></i>
              <span className="font-bold text-gray-900">{room.rating}</span>
              <span className="text-gray-400 text-sm">({room.reviewCount} đánh giá)</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: 'ri-ruler-line', label: 'Diện tích', value: `${room.area}m²` },
              { icon: 'ri-building-line', label: 'Tầng', value: `Tầng ${room.floor}` },
              { icon: 'ri-home-4-line', label: 'Loại phòng', value: room.type },
            ].map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                <i className={`${s.icon} text-amber-500 text-lg block mb-1`}></i>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Mô tả</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{room.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Tiện nghi</h4>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map((a) => (
                <span key={a} className="flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full font-medium">
                  <i className="ri-check-line"></i>
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap text-sm"
            >
              Đóng
            </button>
            {room.status === 'available' && onBook && (
              <button
                onClick={() => { onClose(); onBook(); }}
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap text-sm"
              >
                Đặt phòng ngay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
