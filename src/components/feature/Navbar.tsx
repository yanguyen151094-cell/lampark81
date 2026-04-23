import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '@/context/LanguageContext';

const LOGO_URL = 'https://static.readdy.ai/image/b107d501ab31adf698875488b112872d/5ec72bfd1f8b9242cb55030dbeddfcfa.jpeg';

const navLinksVi = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Tìm phòng', path: '/search' },
  { label: 'Thư viện ảnh', path: '/gallery' },
  { label: 'Đánh giá', path: '/reviews' },
  { label: 'Blog', path: '/blog' },
  { label: 'Chat & Reels', path: '/chat' },
];

const navLinksEn = [
  { label: 'Home', path: '/' },
  { label: 'Find Room', path: '/search' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Blog', path: '/blog' },
  { label: 'Chat & Reels', path: '/chat' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang } = useLang();

  const navLinks = lang === 'en' ? navLinksEn : navLinksVi;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img
            src={LOGO_URL}
            alt="LamPark81 Logo"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
          />
          <span
            className={`font-bold text-lg md:text-xl tracking-tight transition-colors ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            LamPark<span className="text-amber-400">81</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                location.pathname === link.path || (link.path === '/blog' && location.pathname.startsWith('/blog'))
                  ? scrolled ? 'text-amber-500' : 'text-amber-300'
                  : scrolled ? 'text-gray-700 hover:text-amber-500' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language Toggle */}
          <div className={`flex items-center rounded-full p-0.5 text-xs font-bold gap-0.5 ${scrolled ? 'bg-gray-100' : 'bg-white/20'}`}>
            <button
              onClick={() => setLang('vi')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${lang === 'vi' ? 'bg-amber-400 text-gray-900' : scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}
            >
              VI
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${lang === 'en' ? 'bg-amber-400 text-gray-900' : scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'}`}
            >
              EN
            </button>
          </div>
          <a
            href="https://zalo.me/0377038202"
            target="_blank"
            rel="nofollow noreferrer"
            title="Zalo"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer ${
              scrolled ? 'bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-500' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '14px', lineHeight: 1 }}>Z</span>
          </a>
          <a
            href="tel:0377038202"
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all cursor-pointer ${
              scrolled ? 'bg-gray-100 text-gray-700 hover:bg-amber-50 hover:text-amber-500' : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <i className="ri-phone-line text-base"></i>
          </a>
          <Link
            to="/search"
            className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-full transition-all cursor-pointer whitespace-nowrap"
          >
            {lang === 'en' ? 'Book Now' : 'Đặt phòng ngay'}
          </Link>
          <Link
            to="/admin"
            className={`text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              scrolled ? 'text-gray-400 hover:text-gray-600' : 'text-white/50 hover:text-white/80'
            }`}
          >
            Admin
          </Link>
        </div>

        {/* Mobile Right */}
        <div className="md:hidden flex items-center gap-2">
          {/* Language Toggle Mobile */}
          <div className={`flex items-center rounded-full p-0.5 text-xs font-bold gap-0.5 ${scrolled ? 'bg-gray-100' : 'bg-white/20'}`}>
            <button
              onClick={() => setLang('vi')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${lang === 'vi' ? 'bg-amber-400 text-gray-900' : scrolled ? 'text-gray-600' : 'text-white/80'}`}
            >
              VI
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${lang === 'en' ? 'bg-amber-400 text-gray-900' : scrolled ? 'text-gray-600' : 'text-white/80'}`}
            >
              EN
            </button>
          </div>
          <button
            className={`w-9 h-9 flex items-center justify-center rounded-full cursor-pointer ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-2 cursor-pointer ${
                location.pathname === link.path ? 'text-amber-500' : 'text-gray-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/search"
            onClick={() => setMenuOpen(false)}
            className="bg-amber-400 text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-full text-center cursor-pointer whitespace-nowrap"
          >
            {lang === 'en' ? 'Book Now' : 'Đặt phòng ngay'}
          </Link>
          <div className="flex items-center gap-3 pt-1">
            <a href="tel:0377038202" className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
              <i className="ri-phone-line text-amber-500"></i> 0377 038 202
            </a>
          </div>
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            className="text-xs text-gray-400 text-center cursor-pointer"
          >
            Admin Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
