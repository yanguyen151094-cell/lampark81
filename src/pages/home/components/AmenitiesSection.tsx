import { useEffect, useRef, useState } from 'react';

const amenities = [
  { icon: 'ri-swimming-pool-line', title: 'Hồ Bơi Vô Cực', desc: 'Hồ bơi ngoài trời với tầm nhìn panorama ra biển Đông.' },
  { icon: 'ri-spa-line', title: 'Spa & Massage', desc: 'Không gian thư giãn cao cấp với các liệu pháp trị liệu độc đáo.' },
  { icon: 'ri-restaurant-2-line', title: 'Nhà Hàng Cao Cấp', desc: 'Ẩm thực đặc sắc kết hợp tinh hoa Việt Nam và quốc tế.' },
  { icon: 'ri-wifi-line', title: 'Wifi Tốc Độ Cao', desc: 'Kết nối internet tốc độ gigabit trên toàn cơ sở.' },
  { icon: 'ri-service-line', title: 'Dịch Vụ 24/7', desc: 'Đội ngũ nhân viên tận tâm phục vụ suốt ngày đêm.' },
  { icon: 'ri-taxi-line', title: 'Đưa Đón Sân Bay', desc: 'Dịch vụ xe hạng sang đưa đón tận nơi.' },
  { icon: 'ri-sun-line', title: 'Yoga & Thiền', desc: 'Lớp yoga buổi sáng với tầm nhìn ra biển thơ mộng.' },
  { icon: 'ri-parking-box-line', title: 'Bãi Đỗ Xe Rộng', desc: 'Bãi đỗ xe an toàn, tiện lợi ngay trong khuôn viên.' },
];

export default function AmenitiesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream px-6 md:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Left */}
          <div className={`transition-all duration-700 ${visible ? 'translate-x-0' : '-translate-x-10'}`}>
            <span className="inline-block text-gold text-xs font-medium tracking-[0.25em] uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-4">
              Tiện Ích & Dịch Vụ
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-brown font-bold mb-6">
              Mọi Tiện Ích<br />
              <span className="italic font-normal">Cho Kỳ Nghỉ Hoàn Hảo</span>
            </h2>
            <p className="text-brown/60 text-base leading-relaxed mb-8 max-w-md">
              Chúng tôi cung cấp đầy đủ tiện ích và dịch vụ cao cấp để đảm bảo kỳ nghỉ của bạn trở thành trải nghiệm đáng nhớ nhất.
            </p>
            <div className="relative rounded-2xl overflow-hidden h-64">
              <img
                src="https://readdy.ai/api/search-image?query=luxury%20hotel%20amenities%20collage%2C%20spa%20massage%20room%2C%20swimming%20pool%2C%20fine%20dining%20restaurant%2C%20warm%20golden%20light%2C%20boutique%20hotel%20facilities%2C%20coastal%20Vietnam%2C%20elegant%20interior%20design%2C%20professional%20photography&width=600&height=400&seq=amenities-main&orientation=landscape"
                alt="Hotel Amenities"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown/40 to-transparent"></div>
            </div>
          </div>

          {/* Right Grid */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${visible ? 'translate-x-0' : 'translate-x-10'}`}>
            {amenities.map((item, i) => (
              <div
                key={item.title}
                className="bg-cream-dark rounded-xl p-4 hover:bg-white transition-colors duration-200 group"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gold/10 rounded-lg mb-3 group-hover:bg-gold/20 transition-colors">
                  <i className={`${item.icon} text-gold text-lg`}></i>
                </div>
                <h4 className="font-medium text-brown text-sm mb-1">{item.title}</h4>
                <p className="text-brown/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
