import { useState, useEffect } from 'react';

export default function FloatingContacts() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="fixed right-4 md:right-6 bottom-24 z-40 flex flex-col gap-3">
      {/* Zalo */}
      <a
        href="https://zalo.me/0377038202"
        target="_blank"
        rel="nofollow noreferrer"
        title="Chat Zalo"
        className="w-12 h-12 flex items-center justify-center text-white rounded-full transition-all hover:scale-110 cursor-pointer"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: '#0068FF' }}
      >
        <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '18px', lineHeight: 1, letterSpacing: '-1px' }}>Z</span>
      </a>

      {/* Phone */}
      <a
        href="tel:0377038202"
        title="Gọi điện"
        className="w-12 h-12 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition-all hover:scale-110 cursor-pointer"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
      >
        <i className="ri-phone-fill text-xl"></i>
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/share/1HtJrPrJY1/?mibextid=wwXIfr"
        target="_blank"
        rel="nofollow noreferrer"
        title="Facebook LamPark81"
        className="w-12 h-12 flex items-center justify-center text-white rounded-full transition-all hover:scale-110 cursor-pointer"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: '#1877F2' }}
      >
        <i className="ri-facebook-fill text-xl"></i>
      </a>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all hover:scale-110 cursor-pointer"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
        >
          <i className="ri-arrow-up-line text-xl"></i>
        </button>
      )}
    </div>
  );
}
