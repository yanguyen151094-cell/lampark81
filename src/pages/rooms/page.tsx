import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import RoomGalleryModal from './components/RoomGalleryModal';
import { supabase, Room, Hotel } from '../../lib/supabase';

export default function RoomsPage() {
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [galleryRoom, setGalleryRoom] = useState<Room | null>(null);
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setVisible(true), 100);
    fetchData();
  }, []);

  const fetchData = async () => {
    const [{ data: r }, { data: h }] = await Promise.all([
      supabase.from('rooms').select('*').eq('is_active', true).order('hotel_id').order('sort_order'),
      supabase.from('hotels').select('id,name').order('sort_order'),
    ]);
    setRooms(r ?? []);
    setHotels(h ?? []);
    setLoading(false);
  };

  const openGallery = (room: Room) => {
    setGalleryRoom(room);
  };

  const openBooking = (roomName: string) => {
    setGalleryRoom(null);
    setSelectedRoom(roomName);
    setBookingModal(true);
  };

  const filtered = filter === 'all' ? rooms : rooms.filter((r) => r.hotel_id === filter);

  return (
    <main className="bg-cream font-sans min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=luxury%20hotel%20room%20interior%20wide%20angle%2C%20warm%20golden%20lighting%2C%20king%20bed%20white%20linen%2C%20floor%20to%20ceiling%20sea%20view%20window%2C%20elegant%20modern%20decor%2C%20boutique%20hotel%20room%2C%20professional%20photography&width=1920&height=600&seq=rooms-hero&orientation=landscape"
          alt="Rooms"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/30 to-transparent"></div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-10 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Link to="/" className="hover:text-gold transition-colors cursor-pointer">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-gold">Phòng &amp; Giá</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-bold">Phòng &amp; Giá</h1>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Filter */}
          <div className={`flex flex-wrap items-center gap-3 mb-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <button onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${filter === 'all' ? 'bg-gold text-white' : 'bg-cream-dark text-brown/70 hover:bg-cream'}`}>
              Tất Cả
            </button>
            {hotels.map((h) => (
              <button key={h.id} onClick={() => setFilter(h.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${filter === h.id ? 'bg-gold text-white' : 'bg-cream-dark text-brown/70 hover:bg-cream'}`}>
                {h.name}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <i className="ri-loader-4-line animate-spin text-3xl text-gold"></i>
            </div>
          ) : (
            /* Rooms Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((room, i) => {
                const imgCount = room.images?.length ?? 1;
                return (
                  <div
                    key={room.id}
                    className={`group bg-white rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-1 cursor-pointer ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                    onClick={() => openGallery(room)}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-brown/80 text-white text-xs px-3 py-1 rounded-full">{room.hotel_name}</span>
                      </div>
                      {imgCount > 1 && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
                          <i className="ri-image-2-line"></i> {imgCount} ảnh
                        </div>
                      )}
                      {/* View gallery overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 text-brown text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5">
                          <i className="ri-gallery-line text-gold"></i> Xem {imgCount} ảnh
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg text-brown font-bold mb-2">{room.name}</h3>
                      <div className="flex flex-wrap gap-3 text-xs text-brown/60 mb-3">
                        <span className="flex items-center gap-1"><i className="ri-user-line text-gold"></i>{room.capacity} khách</span>
                        <span className="flex items-center gap-1"><i className="ri-hotel-bed-line text-gold"></i>{room.bed_type}</span>
                        <span className="flex items-center gap-1"><i className="ri-layout-4-line text-gold"></i>{room.size}m²</span>
                      </div>
                      <p className="text-brown/50 text-xs mb-4 line-clamp-2">{room.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {room.amenities.slice(0, 3).map((a) => (
                          <span key={a} className="text-xs bg-cream px-2.5 py-1 rounded-full text-brown/60">{a}</span>
                        ))}
                        {room.amenities.length > 3 && (
                          <span className="text-xs bg-cream px-2.5 py-1 rounded-full text-brown/60">+{room.amenities.length - 3}</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-cream">
                        <div>
                          <span className="font-bold text-gold text-xl">{room.price.toLocaleString('vi-VN')}đ</span>
                          <span className="text-brown/40 text-xs"> / đêm</span>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); openBooking(room.name); }}
                          className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-white text-xs font-medium px-4 py-2 rounded-full transition-colors whitespace-nowrap cursor-pointer"
                        >
                          Đặt Ngay
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Room Gallery Modal */}
      {galleryRoom && (
        <RoomGalleryModal
          room={galleryRoom}
          onClose={() => setGalleryRoom(null)}
          onBook={() => openBooking(galleryRoom.name)}
        />
      )}

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setBookingModal(false)}>
          <div className="bg-cream rounded-2xl w-full max-w-md p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-brown/50 hover:text-brown cursor-pointer"
              onClick={() => setBookingModal(false)}
            >
              <i className="ri-close-line text-xl"></i>
            </button>
            <h3 className="font-serif text-xl text-brown font-bold mb-1">Đặt Phòng</h3>
            {selectedRoom && <p className="text-gold text-sm mb-5">{selectedRoom}</p>}
            {bookingSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
                <i className="ri-check-circle-line"></i>
                Đặt phòng thành công! Chúng tôi sẽ liên hệ bạn sớm.
              </div>
            )}
            <form
              method="POST"
              action="https://readdy.ai/api/form/d74cm3ecsbv12mkud2o0"
              data-readdy-form
              id="booking-form-rooms"
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const data = new URLSearchParams(new FormData(form) as unknown as URLSearchParams);
                try {
                  const res = await fetch('https://readdy.ai/api/form/d74cm3ecsbv12mkud2o0', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: data.toString(),
                  });
                  if (res.ok) { setBookingSuccess(true); setTimeout(() => { setBookingModal(false); setBookingSuccess(false); }, 2500); }
                } catch (err) { console.error(err); }
              }}
            >
              <input type="hidden" name="room" value={selectedRoom} />
              <div>
                <label className="text-xs font-medium text-brown/70 block mb-1">Họ và tên *</label>
                <input required name="name" type="text" placeholder="Nguyễn Văn A" className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-brown bg-white focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-xs font-medium text-brown/70 block mb-1">Email *</label>
                <input required name="email" type="email" placeholder="email@example.com" className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-brown bg-white focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-xs font-medium text-brown/70 block mb-1">Số điện thoại *</label>
                <input required name="phone" type="tel" placeholder="0989 800 618" className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-brown bg-white focus:outline-none focus:border-gold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-brown/70 block mb-1">Nhận phòng</label>
                  <input required name="checkin" type="date" className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-brown bg-white focus:outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="text-xs font-medium text-brown/70 block mb-1">Trả phòng</label>
                  <input required name="checkout" type="date" className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-brown bg-white focus:outline-none focus:border-gold" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-brown/70 block mb-1">Ghi chú</label>
                <textarea name="note" maxLength={500} rows={2} placeholder="Yêu cầu đặc biệt..." className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-brown bg-white focus:outline-none focus:border-gold resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-gold hover:bg-gold-dark text-white text-sm font-medium py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap">
                Gửi Yêu Cầu Đặt Phòng
              </button>
              <a
                href={`https://m.me/themusehotelhaiphong?text=${encodeURIComponent(`Xin chào! Tôi muốn đặt phòng ${selectedRoom}. Vui lòng tư vấn thêm cho tôi.`)}`}
                target="_blank"
                rel="nofollow noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white text-sm font-medium py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-facebook-fill"></i> Đặt Phòng Qua Messenger
              </a>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
