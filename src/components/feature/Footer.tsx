import { Link } from 'react-router-dom';

const footerLinks = {
  'Cơ Sở': [
    { label: 'The Muse 1', href: '/properties/muse-1' },
    { label: 'The Muse 2', href: '/properties/muse-2' },
    { label: 'The Muse 3', href: '/properties/muse-3' },
  ],
  'Khám Phá': [
    { label: 'Phòng & Giá', href: '/rooms' },
    { label: 'Thư Viện Ảnh', href: '/gallery' },
    { label: 'Blog Du Lịch', href: '/blog' },
    { label: 'Giới Thiệu', href: '/about' },
  ],
  'Hỗ Trợ': [
    { label: 'Liên Hệ', href: '/contact' },
    { label: 'Đặt Phòng', href: '/rooms' },
    { label: 'Chính sách', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-muse-green text-white">
      <div className="px-6 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="https://static.readdy.ai/image/b107d501ab31adf698875488b112872d/52282a1ffd625fd44fa0ac06e7846a57.png"
              alt="The Muse Hotel"
              className="h-12 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              Trải nghiệm boutique hotel đẳng cấp tại Đồi Rồng, Đồ Sơn, Hải Phòng. Nơi mỗi khoảnh khắc trở thành kỷ niệm đáng nhớ.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://zalo.me/0888808818"
                target="_blank"
                rel="nofollow noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/30 hover:border-gold hover:text-gold transition-colors cursor-pointer"
                aria-label="Zalo"
              >
                <i className="ri-chat-3-line text-sm"></i>
              </a>
              <a
                href="https://wa.me/84888808818"
                target="_blank"
                rel="nofollow noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/30 hover:border-gold hover:text-gold transition-colors cursor-pointer"
                aria-label="WhatsApp"
              >
                <i className="ri-whatsapp-line text-sm"></i>
              </a>
              <a
                href="https://www.facebook.com/themusehotelhaiphong"
                target="_blank"
                rel="nofollow noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/30 hover:border-gold hover:text-gold transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <i className="ri-facebook-line text-sm"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="nofollow noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/30 hover:border-gold hover:text-gold transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-sm"></i>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">
                <a id={`footer-${title.toLowerCase().replace(/\s/g, '-')}`}>{title}</a>
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-gold transition-colors cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-white/60">
              <a href="tel:0888808818" className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-phone-line text-gold"></i>
                088.880.8818
              </a>
              <a href="mailto:tgpvlong305@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-mail-line text-gold"></i>
                tgpvlong305@gmail.com
              </a>
              <span className="flex items-center gap-2 whitespace-nowrap">
                <i className="ri-map-pin-line text-gold"></i>
                Khu đô thị Đồi Rồng, Đồ Sơn, Hải Phòng
              </span>
            </div>
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} The Muse Hotel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
