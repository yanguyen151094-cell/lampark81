import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/properties', label: 'Cơ Sở' },
  { href: '/rooms', label: 'Phòng' },
  { href: '/gallery', label: 'Thư Viện' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'Giới Thiệu' },
  { href: '/contact', label: 'Liên Hệ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="https://static.readdy.ai/image/b107d501ab31adf698875488b112872d/52282a1ffd625fd44fa0ac06e7846a57.png"
              alt="The Muse Hotel"
              className="h-10 md:h-12 w-auto object-contain"
            />
            <span className={`font-serif font-bold tracking-widest text-sm md:text-base whitespace-nowrap transition-colors duration-300 ${scrolled ? 'text-brown' : 'text-white'}`}>
              THEMUSEHOTEL
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                  location.pathname === link.href
                    ? 'text-gold'
                    : scrolled
                    ? 'text-brown hover:text-gold'
                    : 'text-white hover:text-gold-light'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            to="/rooms"
            className="hidden md:flex items-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            Đặt Phòng Ngay
            <i className="ri-arrow-right-line text-xs"></i>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden w-10 h-10 flex items-center justify-center cursor-pointer transition-colors ${
              scrolled ? 'text-brown' : 'text-white'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <i className={`text-xl ${mobileOpen ? 'ri-close-line' : 'ri-menu-3-line'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream border-t border-cream-dark">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`py-3 text-sm font-medium border-b border-cream-dark last:border-0 transition-colors cursor-pointer ${
                  location.pathname === link.href ? 'text-gold' : 'text-brown hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/rooms"
              className="mt-3 w-full bg-gold text-white text-sm font-medium px-5 py-3 rounded-full text-center cursor-pointer hover:bg-gold-dark transition-colors whitespace-nowrap"
            >
              Đặt Phòng Ngay
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
