import { useLang } from '@/context/LanguageContext';

const featuresVi = [
  { icon: 'ri-wifi-line', title: 'Wifi 100Mbps', desc: 'Tốc độ cao, ổn định 24/7', color: 'bg-amber-400' },
  { icon: 'ri-temp-cold-line', title: 'Điều hòa mới', desc: 'Inverter tiết kiệm điện', color: 'bg-sky-400' },
  { icon: 'ri-shield-check-line', title: 'Bảo vệ 24/7', desc: 'Camera + thẻ từ', color: 'bg-emerald-400' },
  { icon: 'ri-map-pin-2-line', title: 'Vị trí đắc địa', desc: 'Gần chợ, trường, viện', color: 'bg-rose-400' },
  { icon: 'ri-car-line', title: 'Bãi xe rộng', desc: 'Mái che, camera', color: 'bg-violet-400' },
  { icon: 'ri-tools-line', title: 'Bảo trì nhanh', desc: 'Xử lý sự cố 2 giờ', color: 'bg-orange-400' },
  { icon: 'ri-water-flash-line', title: 'Điện nước ổn', desc: 'Giá nhà nước', color: 'bg-teal-400' },
  { icon: 'ri-customer-service-2-line', title: 'Hỗ trợ 24/7', desc: 'Zalo, điện thoại', color: 'bg-red-400' },
];

const featuresEn = [
  { icon: 'ri-wifi-line', title: 'Wifi 100Mbps', desc: 'High speed, stable 24/7', color: 'bg-amber-400' },
  { icon: 'ri-temp-cold-line', title: 'New AC Unit', desc: 'Energy-saving inverter', color: 'bg-sky-400' },
  { icon: 'ri-shield-check-line', title: 'Security 24/7', desc: 'CCTV + key card', color: 'bg-emerald-400' },
  { icon: 'ri-map-pin-2-line', title: 'Prime Location', desc: 'Near markets, schools', color: 'bg-rose-400' },
  { icon: 'ri-car-line', title: 'Spacious Parking', desc: 'Covered with CCTV', color: 'bg-violet-400' },
  { icon: 'ri-tools-line', title: 'Fast Maintenance', desc: 'Issues fixed in 2 hrs', color: 'bg-orange-400' },
  { icon: 'ri-water-flash-line', title: 'Stable Utilities', desc: 'Official rates, no surcharge', color: 'bg-teal-400' },
  { icon: 'ri-customer-service-2-line', title: '24/7 Support', desc: 'Zalo, phone, chat', color: 'bg-red-400' },
];

const statsVi = [
  { value: '200+', label: 'Phòng cho thuê', icon: 'ri-building-line' },
  { value: '98%', label: 'Khách hài lòng', icon: 'ri-emotion-happy-line' },
  { value: '5+', label: 'Năm kinh nghiệm', icon: 'ri-award-line' },
  { value: '24/7', label: 'Hỗ trợ liên tục', icon: 'ri-headphone-line' },
];

const statsEn = [
  { value: '200+', label: 'Rooms for rent', icon: 'ri-building-line' },
  { value: '98%', label: 'Satisfied guests', icon: 'ri-emotion-happy-line' },
  { value: '5+', label: 'Years experience', icon: 'ri-award-line' },
  { value: '24/7', label: 'Continuous support', icon: 'ri-headphone-line' },
];

export default function FeaturesSection() {
  const { lang } = useLang();
  const features = lang === 'en' ? featuresEn : featuresVi;
  const stats = lang === 'en' ? statsEn : statsVi;

  return (
    <section className="py-14 md:py-20" style={{ background: 'linear-gradient(135deg, #fff8f0 0%, #fff3e0 40%, #fef9f0 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block bg-amber-100 text-amber-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            {lang === 'en' ? 'Why Choose Us' : 'Tại sao chọn chúng tôi'}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
            {lang === 'en' ? 'Why Choose ' : 'Tại Sao Chọn '}
            <span className="text-amber-500">LamPark81?</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-lg mx-auto text-sm">
            {lang === 'en'
              ? 'Perfect living space with full amenities and professional service.'
              : 'Không gian sống hoàn hảo với đầy đủ tiện nghi và dịch vụ chuyên nghiệp.'}
          </p>
        </div>

        {/* Grid - always 4 columns = exactly 2 rows */}
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 hover:-translate-y-0.5 transition-all duration-300 cursor-default group border border-orange-100/60"
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg md:rounded-xl ${f.color} mb-2 md:mb-3 group-hover:scale-110 transition-transform`}>
                <i className={`${f.icon} text-sm md:text-lg text-white`}></i>
              </div>
              <h3 className="font-bold text-gray-900 text-xs md:text-sm mb-0.5 md:mb-1 leading-tight">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed hidden sm:block">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-orange-100/60">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="w-9 h-9 flex items-center justify-center bg-amber-100 rounded-full mx-auto mb-2">
                <i className={`${stat.icon} text-amber-500 text-base`}></i>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-0.5">{stat.value}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
