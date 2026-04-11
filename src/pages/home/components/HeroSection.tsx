import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section ref={ref} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=luxurious%20boutique%20hotel%20lobby%20at%20golden%20hour%2C%20grand%20interior%20with%20warm%20amber%20light%2C%20elegant%20Vietnamese%20coastal%20resort%2C%20high%20ceiling%20with%20chandelier%2C%20marble%20floors%2C%20tropical%20flowers%20arrangement%2C%20sophisticated%20cream%20and%20gold%20decor%2C%20no%20people%2C%20ultra%20wide%20angle%20photorealistic&width=1920&height=1080&seq=hero-main&orientation=landscape"
          alt="The Muse Hotel Hai Phong"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full text-center px-6 md:px-10 lg:px-20 flex flex-col items-center">
        <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-gold text-xs font-medium tracking-[0.3em] uppercase mb-4 border border-gold/40 px-4 py-1 rounded-full">
            Boutique Hotel · Đồ Sơn · Hải Phòng
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6 max-w-4xl mx-auto">
            Nơi Nghỉ Dưỡng<br />
            <span className="italic font-normal text-gold-light">Sang Trọng</span> Giữa<br />
            Lòng Hải Phòng
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Ba cơ sở boutique hotel đẳng cấp tại khu đô thị Đồi Rồng — nơi mỗi khoảnh khắc đều là trải nghiệm không thể quên.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/rooms"
              className="bg-gold hover:bg-gold-dark text-white text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              Đặt Phòng Ngay
              <i className="ri-arrow-right-line"></i>
            </Link>
            <Link
              to="/properties"
              className="border border-white/50 hover:border-white text-white text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Khám Phá Cơ Sở
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className={`mt-16 md:mt-24 grid grid-cols-3 gap-8 md:gap-16 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { num: '3', label: 'Cơ sở khách sạn' },
            { num: '50+', label: 'Phòng sang trọng' },
            { num: '1000+', label: 'Khách hài lòng' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl md:text-4xl font-bold text-gold mb-1">{stat.num}</div>
              <div className="text-white/60 text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase">Cuộn xuống</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}
