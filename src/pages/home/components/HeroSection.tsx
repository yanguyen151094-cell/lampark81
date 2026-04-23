import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomTypes } from '@/mocks/rooms';
import { useLang } from '@/context/LanguageContext';

const HERO_IMAGES = [
  'https://readdy.ai/api/search-image?query=luxury%20modern%20apartment%20building%20exterior%20at%20night%20with%20warm%20lights%20glowing%20from%20windows%2C%20contemporary%20architecture%2C%20urban%20Vietnam%20city%2C%20beautiful%20sky%2C%20premium%20residential%20complex&width=1920&height=1080&seq=hero1&orientation=landscape',
  'https://readdy.ai/api/search-image?query=beautiful%20modern%20apartment%20interior%20living%20room%20with%20large%20windows%2C%20city%20view%2C%20elegant%20minimalist%20furniture%2C%20warm%20lighting%2C%20cozy%20atmosphere%2C%20premium%20Vietnam%20apartment&width=1920&height=1080&seq=hero2&orientation=landscape',
  'https://readdy.ai/api/search-image?query=rooftop%20terrace%20of%20modern%20apartment%20building%20with%20city%20skyline%20view%2C%20comfortable%20outdoor%20furniture%2C%20evening%20golden%20hour%2C%20Vietnam%20urban%20landscape&width=1920&height=1080&seq=hero3&orientation=landscape',
];

const roomTypesEn = [
  { value: 'all', label: 'All Types' },
  { value: 'studio', label: 'Studio' },
  { value: '1br', label: '1 Bedroom' },
  { value: '2br', label: '2 Bedrooms' },
  { value: 'deluxe', label: 'Deluxe' },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchType, setSearchType] = useState('all');
  const [searchPrice, setSearchPrice] = useState('all');
  const navigate = useNavigate();
  const { lang } = useLang();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    navigate(`/search?type=${searchType}&price=${searchPrice}`);
  };

  const displayRoomTypes = lang === 'en' ? roomTypesEn : roomTypes;

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: idx === currentSlide ? 1 : 0 }}
        >
          <img src={img} alt="LamPark81" className="w-full h-full object-cover object-top" />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <div>
          <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            {lang === 'en' ? 'Open 24/7 · Absolute Security' : 'Mở cửa 24/7 · An ninh tuyệt đối'}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            {lang === 'en' ? (
              <>Modern Living<br /><span className="text-amber-400">Space</span> At<br />LamPark81</>
            ) : (
              <>Không Gian Sống<br /><span className="text-amber-400">Hiện Đại</span> Tại<br />LamPark81</>
            )}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {lang === 'en'
              ? <>Premium rooms · Full amenities · Affordable price<br />24/7 security · Near city center</>
              : <>Phòng trọ cao cấp · Đầy đủ tiện nghi · Giá cả hợp lý<br />Khu vực an ninh 24/7 · Gần trung tâm thành phố</>}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <button
              onClick={() => navigate('/search')}
              className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-8 py-4 rounded-full text-base transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              {lang === 'en' ? 'View Available Rooms' : 'Xem phòng trống'}
            </button>
            <button
              onClick={() => navigate('/chat')}
              className="border-2 border-white/60 hover:border-white text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:bg-white/10 cursor-pointer whitespace-nowrap flex items-center gap-2 justify-center"
            >
              <i className="ri-play-circle-line text-xl"></i>
              {lang === 'en' ? 'Watch Intro Video' : 'Xem video giới thiệu'}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-3xl bg-white rounded-2xl p-4 md:p-5" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                {lang === 'en' ? 'Room Type' : 'Loại phòng'}
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {displayRoomTypes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                {lang === 'en' ? 'Price Range' : 'Khoảng giá'}
              </label>
              <select
                value={searchPrice}
                onChange={(e) => setSearchPrice(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {lang === 'en' ? (
                  <>
                    <option value="all">All Prices</option>
                    <option value="0-3000000">Under 3M VND</option>
                    <option value="3000000-5000000">3M - 5M VND</option>
                    <option value="5000000-999999999">Over 5M VND</option>
                  </>
                ) : (
                  <>
                    <option value="all">Tất cả mức giá</option>
                    <option value="0-3000000">Dưới 3 triệu</option>
                    <option value="3000000-5000000">3 - 5 triệu</option>
                    <option value="5000000-999999999">Trên 5 triệu</option>
                  </>
                )}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                {lang === 'en' ? 'Move-in Date' : 'Ngày vào ở'}
              </label>
              <input
                type="date"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-amber-400 cursor-pointer"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-gray-900 hover:bg-gray-700 text-white font-bold px-8 py-2.5 rounded-xl text-sm transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
              >
                <i className="ri-search-line"></i>
                {lang === 'en' ? 'Search' : 'Tìm kiếm'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${idx === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
