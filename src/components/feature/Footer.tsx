import { Link } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';

const LOGO_URL = 'https://static.readdy.ai/image/b107d501ab31adf698875488b112872d/5ec72bfd1f8b9242cb55030dbeddfcfa.jpeg';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={LOGO_URL} alt="LamPark81" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-bold text-xl">LamPark<span className="text-amber-400">81</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {lang === 'en'
                ? 'Modern living space with full amenities. We are committed to bringing residents the best living experience.'
                : 'Không gian sống hiện đại, tiện nghi đầy đủ. Chúng tôi cam kết mang đến trải nghiệm sống tốt nhất cho cư dân.'}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/share/1HtJrPrJY1/?mibextid=wwXIfr"
                target="_blank"
                rel="nofollow noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-amber-400 hover:text-gray-900 rounded-full transition-all cursor-pointer"
              >
                <i className="ri-facebook-fill text-sm"></i>
              </a>
              <a
                href="https://zalo.me/0377038202"
                target="_blank"
                rel="nofollow noreferrer"
                title="Zalo"
                className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-amber-400 hover:text-gray-900 rounded-full transition-all cursor-pointer"
              >
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '14px', lineHeight: 1 }}>Z</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="nofollow noreferrer" className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-amber-400 hover:text-gray-900 rounded-full transition-all cursor-pointer">
                <i className="ri-youtube-fill text-sm"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="nofollow noreferrer" className="w-9 h-9 flex items-center justify-center bg-gray-800 hover:bg-amber-400 hover:text-gray-900 rounded-full transition-all cursor-pointer">
                <i className="ri-instagram-fill text-sm"></i>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              <a href="#services">{lang === 'en' ? 'Services' : 'Dịch vụ'}</a>
            </h4>
            <ul className="space-y-2.5">
              {lang === 'en'
                ? ['Room Rental', 'Online Booking', 'Room Tour', '24/7 Support', 'Free Consultation'].map((item) => (
                    <li key={item}><Link to="/search" className="text-gray-400 hover:text-amber-400 text-sm transition-colors cursor-pointer">{item}</Link></li>
                  ))
                : ['Cho thuê phòng', 'Đặt phòng online', 'Xem phòng thực tế', 'Hỗ trợ 24/7', 'Tư vấn miễn phí'].map((item) => (
                    <li key={item}><Link to="/search" className="text-gray-400 hover:text-amber-400 text-sm transition-colors cursor-pointer">{item}</Link></li>
                  ))}
              <li><Link to="/blog" className="text-amber-400 hover:text-amber-300 text-sm transition-colors cursor-pointer font-semibold">Blog{lang === 'en' ? ' - Travel Guide' : ' - Hướng dẫn du lịch'}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              <a href="#contact">{lang === 'en' ? 'Contact' : 'Liên hệ'}</a>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-map-pin-line text-amber-400 text-sm"></i>
                </div>
                <span className="text-gray-400 text-sm">81 Đường LamPark, Phường X, Quận Y, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-phone-line text-amber-400 text-sm"></i>
                </div>
                <a href="tel:0377038202" className="text-gray-400 hover:text-amber-400 text-sm transition-colors cursor-pointer">0377 038 202</a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center">
                  <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '12px', color: '#0068FF', lineHeight: 1 }}>Z</span>
                </div>
                <a href="https://zalo.me/0377038202" target="_blank" rel="nofollow noreferrer" className="text-gray-400 hover:text-amber-400 text-sm transition-colors cursor-pointer">Zalo: 0377 038 202</a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-facebook-line text-amber-400 text-sm"></i>
                </div>
                <a href="https://www.facebook.com/share/1HtJrPrJY1/?mibextid=wwXIfr" target="_blank" rel="nofollow noreferrer" className="text-gray-400 hover:text-amber-400 text-sm transition-colors cursor-pointer">Facebook LamPark81</a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-mail-line text-amber-400 text-sm"></i>
                </div>
                <a href="mailto:info@lampark81.com" className="text-gray-400 hover:text-amber-400 text-sm transition-colors cursor-pointer">info@lampark81.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-time-line text-amber-400 text-sm"></i>
                </div>
                <span className="text-gray-400 text-sm">{lang === 'en' ? 'Open 24/7' : 'Mở cửa 24/7'}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              <a href="#newsletter">{lang === 'en' ? 'Newsletter' : 'Nhận thông báo'}</a>
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              {lang === 'en' ? 'Subscribe for vacancy updates and latest offers.' : 'Đăng ký nhận thông tin phòng trống và ưu đãi mới nhất.'}
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder={lang === 'en' ? 'Your email...' : 'Email của bạn...'}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm py-2.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                {lang === 'en' ? 'Subscribe' : 'Đăng ký'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">© 2025 LamPark81. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors cursor-pointer">{lang === 'en' ? 'Privacy' : 'Chính sách'}</a>
            <span className="text-gray-700">|</span>
            <a href="#terms" className="text-gray-500 hover:text-gray-300 text-xs transition-colors cursor-pointer">{lang === 'en' ? 'Terms' : 'Điều khoản'}</a>
            <span className="text-gray-700">|</span>
            <Link to="/blog" className="text-gray-500 hover:text-amber-400 text-xs transition-colors cursor-pointer">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
