import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { supabase, Hotel } from '../../lib/supabase';

export default function PropertiesPage() {
  const [visible, setVisible] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setVisible(true), 100);
    const fetchHotels = async () => {
      const { data } = await supabase.from('hotels').select('*').order('sort_order');
      setHotels(data ?? []);
      setLoading(false);
    };
    fetchHotels();
  }, []);

  return (
    <main className="bg-cream font-sans min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=luxury%20boutique%20hotel%20buildings%20collage%2C%20three%20elegant%20properties%2C%20warm%20golden%20light%2C%20coastal%20Vietnam%20setting%2C%20modern%20architecture%2C%20professional%20photography&width=1920&height=600&seq=prop-hero&orientation=landscape"
          alt="Properties"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/30 to-transparent"></div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-10 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Link to="/" className="hover:text-gold transition-colors cursor-pointer">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-gold">Cơ Sở</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-bold">Ba Cơ Sở Của Chúng Tôi</h1>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-brown/60 text-base max-w-2xl mx-auto">
              Chuỗi The Muse Hotel gồm 3 cơ sở boutique tọa lạc tại khu đô thị quốc tế Đồi Rồng, Đồ Sơn, Hải Phòng — mỗi nơi mang một nét đặc trưng riêng, tất cả đều hướng đến sự sang trọng và dịch vụ đẳng cấp.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40"><i className="ri-loader-4-line animate-spin text-3xl text-gold"></i></div>
          ) : (
            <div className="space-y-10">
              {hotels.map((hotel, i) => (
                <div
                  key={hotel.id}
                  className={`group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-white transition-all duration-700 hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Image */}
                  <div className={`relative h-64 md:h-80 overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {hotel.badge && (
                      <span className="absolute top-4 left-4 bg-gold text-white text-xs font-medium px-3 py-1 rounded-full">
                        {hotel.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`p-8 md:p-10 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <span className="text-xs text-gold font-medium tracking-[0.2em] uppercase mb-2">{hotel.tagline}</span>
                    <h2 className="font-serif text-2xl md:text-3xl text-brown font-bold mb-3">{hotel.name}</h2>
                    <p className="text-brown/60 text-sm leading-relaxed mb-6">{hotel.short_desc}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-start gap-3 text-sm text-brown/60">
                        <i className="ri-map-pin-line text-gold mt-0.5 flex-shrink-0"></i>
                        <span>{hotel.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-brown/60">
                        <i className="ri-phone-line text-gold flex-shrink-0"></i>
                        <span>{hotel.phone}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {(hotel.amenities ?? []).slice(0, 4).map((a) => (
                        <span key={a} className="text-xs bg-cream px-3 py-1 rounded-full text-brown/70">{a}</span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <Link
                        to={`/properties/${hotel.id}`}
                        className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Xem Chi Tiết <i className="ri-arrow-right-line text-xs"></i>
                      </Link>
                      <Link
                        to="/rooms"
                        className="flex items-center gap-2 border border-gold text-gold hover:bg-gold hover:text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Đặt Phòng
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
