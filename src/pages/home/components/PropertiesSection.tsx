import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { supabase, Hotel } from '../../../lib/supabase';

export default function PropertiesSection() {
  const [visible, setVisible] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
      const { data } = await supabase.from('hotels').select('*').order('sort_order');
      setHotels(data ?? []);
    };
    fetchHotels();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-gold text-xs font-medium tracking-[0.25em] uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-4">
            Hệ Thống Của Chúng Tôi
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-brown font-bold mb-4">Ba Cơ Sở Đẳng Cấp</h2>
          <p className="text-brown/60 text-base max-w-xl mx-auto">
            Mỗi cơ sở mang một phong cách độc đáo, tất cả đều hướng đến trải nghiệm sang trọng và dịch vụ hoàn hảo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {hotels.map((hotel, i) => (
            <div
              key={hotel.id}
              className={`group bg-white rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {hotel.badge && (
                  <span className="absolute top-3 left-3 bg-brown text-white text-xs font-medium px-3 py-1 rounded-full">
                    {hotel.badge}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <span className="text-xs text-gold font-medium tracking-wider uppercase">{hotel.tagline}</span>
                <h3 className="font-serif text-xl text-brown font-bold mt-1 mb-2">{hotel.name}</h3>
                <p className="text-brown/60 text-sm leading-relaxed mb-5 line-clamp-3">{hotel.short_desc}</p>
                <div className="flex items-center gap-2 text-xs text-brown/50 mb-5">
                  <i className="ri-map-pin-line text-gold"></i>
                  <span className="line-clamp-1">{hotel.address}</span>
                </div>
                <Link
                  to={`/properties/${hotel.id}`}
                  className="w-full flex items-center justify-center gap-2 border border-gold text-gold hover:bg-gold hover:text-white text-sm font-medium py-2.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  Xem Chi Tiết <i className="ri-arrow-right-line text-xs"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
