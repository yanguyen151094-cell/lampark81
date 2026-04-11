import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { supabase, Room } from '../../../lib/supabase';

export default function FeaturedRooms() {
  const [visible, setVisible] = useState(false);
  const [featured, setFeatured] = useState<Room[]>([]);
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
    const fetch = async () => {
      const { data } = await supabase
        .from('rooms')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
        .limit(3);
      setFeatured(data ?? []);
    };
    fetch();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream-dark px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="inline-block text-gold text-xs font-medium tracking-[0.25em] uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-4">
              Phòng Nổi Bật
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-brown font-bold">
              Không Gian Nghỉ Dưỡng<br />
              <span className="italic font-normal">Được Yêu Thích</span>
            </h2>
          </div>
          <Link to="/rooms" className="flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors whitespace-nowrap cursor-pointer">
            Xem tất cả phòng <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((room, i) => (
            <div
              key={room.id}
              className={`group relative rounded-2xl overflow-hidden h-72 md:h-80 cursor-pointer transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-xs text-gold/80 font-medium">{room.hotel_name}</span>
                <h3 className="font-serif text-lg font-bold text-white mb-1">{room.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gold font-semibold text-base">{room.price.toLocaleString('vi-VN')}đ</span>
                    <span className="text-white/60 text-xs"> / đêm</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <i className="ri-user-line"></i>
                    <span>{room.capacity} khách</span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link to="/rooms" className="bg-gold text-white text-sm font-medium px-6 py-2.5 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300 whitespace-nowrap">
                  Đặt Phòng Này
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
