import { useNavigate } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';

export default function CTASection() {
  const navigate = useNavigate();
  const { lang } = useLang();

  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <img
        src="https://readdy.ai/api/search-image?query=luxury%20modern%20apartment%20building%20at%20golden%20hour%20sunset%2C%20warm%20orange%20light%2C%20beautiful%20architecture%2C%20premium%20residential%20complex%2C%20Vietnam%20city%20skyline%2C%20dramatic%20sky&width=1920&height=800&seq=cta1&orientation=landscape"
        alt="CTA Background"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          {lang === 'en' ? 'Start today' : 'Bắt đầu ngay hôm nay'}
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          {lang === 'en' ? (
            <>Start Your New Life<br />Today <em className="text-amber-400 not-italic">Right Now</em><br />At LamPark81</>
          ) : (
            <>Bắt Đầu Cuộc Sống Mới<br />Của Bạn <em className="text-amber-400 not-italic">Ngay Hôm Nay</em><br />Tại LamPark81</>
          )}
        </h2>
        <p className="text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto">
          {lang === 'en'
            ? 'Hundreds of beautiful rooms waiting for you. Schedule a free room tour, no brokerage fees.'
            : 'Hàng trăm phòng đẹp đang chờ bạn. Đặt lịch xem phòng miễn phí, không mất phí môi giới.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/search')}
            className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-10 py-5 rounded-full text-base transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
            style={{ boxShadow: '0 8px 30px rgba(251,191,36,0.4)' }}
          >
            {lang === 'en' ? 'Schedule a Room Tour' : 'Đặt lịch xem phòng'}
          </button>
          <a
            href="tel:0377038202"
            className="border-2 border-white/60 hover:border-white text-white font-semibold px-10 py-5 rounded-full text-base transition-all hover:bg-white/10 cursor-pointer whitespace-nowrap flex items-center gap-2 justify-center"
          >
            <i className="ri-phone-line text-xl"></i>
            {lang === 'en' ? 'Call Now: 0377 038 202' : 'Gọi ngay: 0377 038 202'}
          </a>
        </div>
      </div>
    </section>
  );
}
