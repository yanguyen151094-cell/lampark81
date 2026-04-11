import { useEffect, useRef, useState } from 'react';
import { reviews } from '../../../mocks/reviews';

export default function ReviewsSection() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
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
    <section ref={ref} className="py-20 md:py-28 bg-brown px-6 md:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-gold text-xs font-medium tracking-[0.25em] uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-4">
            Đánh Giá Khách Hàng
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-cream font-bold">
            Lời Chia Sẻ Từ<br />
            <span className="italic font-normal text-gold-light">Khách Quý Của Chúng Tôi</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className={`bg-white/5 border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:bg-white/10 ${i === active ? 'ring-1 ring-gold' : ''}`}
              onClick={() => setActive(i)}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, idx) => (
                  <i key={idx} className="ri-star-fill text-gold text-sm"></i>
                ))}
              </div>
              <p className="text-cream/80 text-sm leading-relaxed mb-5 italic">&ldquo;{review.comment}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover object-top"
                />
                <div>
                  <div className="text-cream text-sm font-medium">{review.name}</div>
                  <div className="text-cream/50 text-xs">{review.location} · {review.hotelStayed}</div>
                </div>
                <div className="ml-auto">
                  <span className="text-xs text-cream/40">{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-6 pt-8 border-t border-white/10 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { val: '5.0', sub: 'Điểm đánh giá trung bình' },
            { val: '98%', sub: 'Khách hàng hài lòng' },
            { val: '1000+', sub: 'Đánh giá tích cực' },
          ].map((stat) => (
            <div key={stat.sub} className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-gold mb-1">{stat.val}</div>
              <div className="text-cream/50 text-xs md:text-sm">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
