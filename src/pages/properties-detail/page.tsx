import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { supabase, Hotel, Room } from '../../lib/supabase';

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [hotelRooms, setHotelRooms] = useState<Room[]>([]);
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const [{ data: h }, { data: r }, { data: ah }] = await Promise.all([
        supabase.from('hotels').select('*').eq('id', id).maybeSingle(),
        supabase.from('rooms').select('*').eq('hotel_id', id).eq('is_active', true).order('sort_order'),
        supabase.from('hotels').select('*').order('sort_order'),
      ]);
      if (!h) { navigate('/properties'); return; }
      setHotel(h);
      setHotelRooms(r ?? []);
      setAllHotels(ah ?? []);
      setLoading(false);
    };
    fetchData();
  }, [id, navigate]);

  if (loading) {
    return (
      <main className="bg-cream font-sans min-h-screen flex items-center justify-center">
        <i className="ri-loader-4-line animate-spin text-3xl text-gold"></i>
      </main>
    );
  }

  if (!hotel) return null;

  const gallery: string[] = hotel.gallery?.length ? hotel.gallery : [hotel.image];

  return (
    <main className="bg-cream font-sans min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-72 md:h-96 flex items-end overflow-hidden">
        <img
          src={gallery[0]}
          alt={hotel.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/30 to-transparent"></div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-10 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2 flex-wrap">
              <Link to="/" className="hover:text-gold transition-colors cursor-pointer">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line"></i>
              <Link to="/properties" className="hover:text-gold transition-colors cursor-pointer">Cơ Sở</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-gold">{hotel.name}</span>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-gold text-xs tracking-widest uppercase font-medium">{hotel.tagline}</span>
                <h1 className="font-serif text-3xl md:text-5xl text-white font-bold">{hotel.name}</h1>
              </div>
              {hotel.badge && (
                <span className="bg-gold text-white text-sm font-medium px-4 py-1.5 rounded-full whitespace-nowrap">{hotel.badge}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-10 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Gallery */}
              {gallery.length > 0 && (
                <div>
                  <div
                    className="relative rounded-2xl overflow-hidden h-72 md:h-96 mb-3 cursor-pointer"
                    onClick={() => setLightbox(gallery[galleryIndex])}
                  >
                    <img src={gallery[galleryIndex]} alt={hotel.name} className="w-full h-full object-cover object-top" />
                    <div className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
                      {galleryIndex + 1} / {gallery.length}
                    </div>
                    <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                      <span className="text-white text-sm bg-black/40 px-4 py-2 rounded-full flex items-center gap-2">
                        <i className="ri-zoom-in-line"></i> Phóng to
                      </span>
                    </div>
                  </div>
                  {gallery.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {gallery.map((img, i) => (
                        <div
                          key={i}
                          className={`h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${i === galleryIndex ? 'border-gold' : 'border-transparent hover:border-gold/40'}`}
                          onClick={() => setGalleryIndex(i)}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover object-top" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl text-brown font-bold mb-4">Giới Thiệu</h2>
                <p className="text-brown/60 text-base leading-relaxed">{hotel.description}</p>
              </div>

              {/* Amenities */}
              {(hotel.amenities ?? []).length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl text-brown font-bold mb-4">Tiện Ích</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(hotel.amenities ?? []).map((a) => (
                      <div key={a} className="flex items-center gap-2 bg-cream-dark rounded-xl px-3 py-2.5">
                        <i className="ri-check-line text-gold text-sm"></i>
                        <span className="text-brown/70 text-sm">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rooms */}
              {hotelRooms.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl text-brown font-bold mb-4">Loại Phòng</h2>
                  <div className="space-y-4">
                    {hotelRooms.map((room) => (
                      <div key={room.id} className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white rounded-xl overflow-hidden">
                        <div className="h-40 sm:h-auto overflow-hidden">
                          <img src={room.image} alt={room.name} className="w-full h-full object-cover object-top" />
                        </div>
                        <div className="sm:col-span-2 p-4 flex flex-col justify-between">
                          <div>
                            <h3 className="font-serif text-lg text-brown font-bold mb-1">{room.name}</h3>
                            <div className="flex flex-wrap gap-3 text-xs text-brown/60 mb-2">
                              <span className="flex items-center gap-1"><i className="ri-user-line text-gold"></i>{room.capacity} khách</span>
                              <span className="flex items-center gap-1"><i className="ri-hotel-bed-line text-gold"></i>{room.bed_type}</span>
                              <span className="flex items-center gap-1"><i className="ri-layout-4-line text-gold"></i>{room.size}m²</span>
                            </div>
                            <p className="text-brown/50 text-xs mb-3">{room.description}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-gold text-lg">{room.price.toLocaleString('vi-VN')}đ</span>
                              <span className="text-brown/40 text-xs"> / đêm</span>
                            </div>
                            <Link to="/rooms" className="bg-gold hover:bg-gold-dark text-white text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap cursor-pointer transition-colors">
                              Đặt Ngay
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              <div>
                <h2 className="font-serif text-2xl text-brown font-bold mb-4">Vị Trí</h2>
                <div className="rounded-2xl overflow-hidden h-64">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3730.8!2d${hotel.lng}!3d${hotel.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(hotel.name)}!5e0!3m2!1svi!2svn!4v1`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Bản đồ ${hotel.name}`}
                  ></iframe>
                </div>
                <p className="text-brown/60 text-sm mt-2 flex items-center gap-2">
                  <i className="ri-map-pin-line text-gold"></i>
                  {hotel.address}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Booking Card */}
                <div className="bg-white rounded-2xl p-6 border border-cream-dark">
                  <h3 className="font-serif text-lg text-brown font-bold mb-1">Đặt Phòng</h3>
                  <p className="text-brown/50 text-xs mb-4">Liên hệ để nhận giá tốt nhất</p>
                  <Link to="/rooms"
                    className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-medium py-3 rounded-full transition-colors whitespace-nowrap cursor-pointer mb-3">
                    Đặt Phòng Ngay <i className="ri-arrow-right-line"></i>
                  </Link>
                  <a href={`tel:${hotel.phone}`}
                    className="w-full flex items-center justify-center gap-2 border border-gold text-gold hover:bg-gold hover:text-white text-sm font-medium py-3 rounded-full transition-colors whitespace-nowrap cursor-pointer">
                    <i className="ri-phone-line"></i> Gọi Ngay
                  </a>
                </div>

                {/* Contact Card */}
                <div className="bg-white rounded-2xl p-6 border border-cream-dark">
                  <h3 className="font-serif text-base text-brown font-bold mb-4">Liên Hệ</h3>
                  <div className="space-y-3">
                    <a href={`tel:${hotel.phone}`} className="flex items-center gap-3 text-sm text-brown/70 hover:text-gold transition-colors cursor-pointer">
                      <div className="w-8 h-8 flex items-center justify-center bg-gold/10 rounded-lg">
                        <i className="ri-phone-line text-gold text-sm"></i>
                      </div>
                      {hotel.phone}
                    </a>
                    <a href={`mailto:${hotel.email}`} className="flex items-center gap-3 text-sm text-brown/70 hover:text-gold transition-colors cursor-pointer">
                      <div className="w-8 h-8 flex items-center justify-center bg-gold/10 rounded-lg">
                        <i className="ri-mail-line text-gold text-sm"></i>
                      </div>
                      {hotel.email}
                    </a>
                    <a href="https://zalo.me/0888808818" target="_blank" rel="nofollow noreferrer" className="flex items-center gap-3 text-sm text-brown/70 hover:text-gold transition-colors cursor-pointer">
                      <div className="w-8 h-8 flex items-center justify-center bg-gold/10 rounded-lg">
                        <i className="ri-chat-3-line text-gold text-sm"></i>
                      </div>
                      Zalo: 088.880.8818
                    </a>
                    <a href="https://www.facebook.com/themusehotelhaiphong" target="_blank" rel="nofollow noreferrer" className="flex items-center gap-3 text-sm text-brown/70 hover:text-gold transition-colors cursor-pointer">
                      <div className="w-8 h-8 flex items-center justify-center bg-gold/10 rounded-lg">
                        <i className="ri-facebook-line text-gold text-sm"></i>
                      </div>
                      Facebook Fanpage
                    </a>
                  </div>
                </div>

                {/* Other properties */}
                {allHotels.filter(h => h.id !== id).length > 0 && (
                  <div className="bg-white rounded-2xl p-6 border border-cream-dark">
                    <h3 className="font-serif text-base text-brown font-bold mb-4">Cơ Sở Khác</h3>
                    <div className="space-y-2">
                      {allHotels.filter(h => h.id !== id).map((h) => (
                        <Link
                          key={h.id}
                          to={`/properties/${h.id}`}
                          className="flex items-center gap-3 text-sm text-brown/70 hover:text-gold transition-colors cursor-pointer py-2 border-b border-cream last:border-0"
                        >
                          <i className="ri-hotel-line text-gold text-sm"></i>
                          {h.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-full object-contain rounded-lg" />
          <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white cursor-pointer" onClick={() => setLightbox(null)}>
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
}
