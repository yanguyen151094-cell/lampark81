import { useEffect, useState, useCallback } from 'react';

type Room = {
  id: string;
  name: string;
  hotel_name?: string;
  hotelName?: string;
  capacity: number;
  price: number;
  size: number;
  bed_type?: string;
  bedType?: string;
  image: string;
  images?: string[];
  amenities: string[];
  description: string;
};

type Props = {
  room: Room;
  onClose: () => void;
  onBook: () => void;
};

export default function RoomGalleryModal({ room, onClose, onBook }: Props) {
  const allImages: string[] = room.images?.length ? room.images : [room.image];
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent(c => (c - 1 + allImages.length) % allImages.length), [allImages.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % allImages.length), [allImages.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [prev, next, onClose]);

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);

  const hotelName = room.hotel_name ?? room.hotelName ?? '';
  const bedType = room.bed_type ?? room.bedType ?? '';

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 flex-shrink-0">
          <div>
            <h2 className="font-serif text-lg text-brown font-bold">{room.name}</h2>
            <p className="text-xs text-stone-400">{hotelName}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 cursor-pointer text-stone-500">
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">
          {/* Main image */}
          <div className="relative bg-stone-900 h-64 md:h-80 flex-shrink-0">
            <img
              src={allImages[current]}
              alt={`${room.name} ${current + 1}`}
              className="w-full h-full object-cover object-top"
            />
            {allImages.length > 1 && (
              <>
                <button onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center cursor-pointer transition">
                  <i className="ri-arrow-left-s-line text-lg"></i>
                </button>
                <button onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center cursor-pointer transition">
                  <i className="ri-arrow-right-s-line text-lg"></i>
                </button>
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
                  {current + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 px-5 py-3 overflow-x-auto flex-shrink-0 border-b border-stone-100">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition cursor-pointer ${i === current ? 'border-amber-500' : 'border-transparent hover:border-stone-300'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}

          {/* Info */}
          <div className="p-5 space-y-4">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: 'ri-user-line', label: `${room.capacity} khách` },
                { icon: 'ri-hotel-bed-line', label: bedType },
                { icon: 'ri-layout-4-line', label: `${room.size}m²` },
              ].map(item => (
                <div key={item.label} className="bg-stone-50 rounded-xl p-3 text-center">
                  <i className={`${item.icon} text-amber-600 text-lg block mb-1`}></i>
                  <span className="text-xs text-stone-600">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            {room.description && (
              <div>
                <h3 className="text-sm font-semibold text-stone-800 mb-1.5">Mô tả phòng</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{room.description}</p>
              </div>
            )}

            {/* Amenities */}
            {room.amenities?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-stone-800 mb-2">Tiện ích</h3>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map(a => (
                    <span key={a} className="text-xs bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-100">{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer sticky */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-stone-100 bg-white flex-shrink-0">
          <div>
            <span className="font-bold text-amber-700 text-xl">{room.price.toLocaleString('vi-VN')}đ</span>
            <span className="text-stone-400 text-xs"> / đêm</span>
          </div>
          <button onClick={onBook}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition cursor-pointer whitespace-nowrap">
            <i className="ri-calendar-check-line"></i> Đặt Ngay
          </button>
        </div>
      </div>
    </div>
  );
}
