import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function CTASection() {
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
    <section ref={ref} className="py-20 md:py-28 bg-cream px-6 md:px-10 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=luxury%20hotel%20aerial%20view%2C%20boutique%20hotel%20coastal%20setting%2C%20swimming%20pool%2C%20tropical%20garden%2C%20sea%20in%20background%2C%20warm%20sunset%20golden%20light%2C%20Vietnamese%20coastal%20resort%2C%20professional%20drone%20photography&width=1200&height=500&seq=cta-main&orientation=landscape"
            alt="The Muse Hotel"
            className="w-full h-64 md:h-96 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brown/80 via-brown/50 to-transparent"></div>
          <div className={`absolute inset-0 flex flex-col justify-center px-8 md:px-16 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-block text-gold text-xs font-medium tracking-[0.25em] uppercase border border-gold/40 px-4 py-1.5 rounded-full mb-4 w-fit">
              Ưu Đãi Đặc Biệt
            </span>
            <h2 className="font-serif text-2xl md:text-4xl text-white font-bold mb-3 max-w-md">
              Sẵn Sàng Trải Nghiệm<br />
              <span className="text-gold-light italic font-normal">The Muse Hotel?</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base mb-8 max-w-sm leading-relaxed">
              Đặt phòng ngay hôm nay và nhận ưu đãi đặc biệt. Miễn phí bữa sáng cho 2 khách khi đặt từ 2 đêm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/rooms"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer w-fit"
              >
                Đặt Phòng Ngay
                <i className="ri-arrow-right-line"></i>
              </Link>
              <a
                href="tel:0888808818"
                className="inline-flex items-center gap-2 border border-white/50 hover:border-white text-white text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer w-fit"
              >
                <i className="ri-phone-line"></i>
                Gọi Ngay
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: 'ri-medal-line', text: 'Boutique Hotel 4 Sao' },
            { icon: 'ri-shield-check-line', text: 'An toàn & Sạch sẽ' },
            { icon: 'ri-customer-service-2-line', text: 'Hỗ trợ 24/7' },
            { icon: 'ri-refund-2-line', text: 'Hủy phòng linh hoạt' },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-3 bg-cream-dark rounded-xl p-4">
              <div className="w-10 h-10 flex items-center justify-center bg-gold/10 rounded-lg flex-shrink-0">
                <i className={`${badge.icon} text-gold text-lg`}></i>
              </div>
              <span className="text-brown text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
