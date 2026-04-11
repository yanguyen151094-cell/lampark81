import { Link } from 'react-router-dom';
import { useEffect, useState, FormEvent } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

const properties = [
  {
    name: 'The Muse 1',
    address: 'K1, 12 Khu đô thị quốc tế Đồi Rồng, Đồ Sơn, Hải Phòng',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3730.8!2d106.8312!3d20.7062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sThe%20Muse%201!5e0!3m2!1svi!2svn!4v1',
  },
  {
    name: 'The Muse 2',
    address: 'K2, 3, 22 Khu đô thị quốc tế Đồi Rồng, Đồ Sơn, Hải Phòng',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3730.8!2d106.8322!3d20.7052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sThe%20Muse%202!5e0!3m2!1svi!2svn!4v1',
  },
  {
    name: 'The Muse 3',
    address: 'K2, Khu đô thị quốc tế Đồi Rồng, Đồ Sơn, Hải Phòng',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3730.8!2d106.8302!3d20.7042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sThe%20Muse%203!5e0!3m2!1svi!2svn!4v1',
  },
];

export default function ContactPage() {
  const [visible, setVisible] = useState(false);
  const [activeMap, setActiveMap] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new URLSearchParams(new FormData(form) as unknown as URLSearchParams);
    try {
      const res = await fetch('https://readdy.ai/api/form/d74cm3ecsbv12mkud2ng', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      if (res.ok) {
        setSubmitStatus('success');
        form.reset();
        setCharCount(0);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <main className="bg-cream font-sans min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-64 md:h-72 flex items-end overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=hotel%20reception%20concierge%20desk%2C%20warm%20golden%20light%2C%20elegant%20flowers%2C%20boutique%20hotel%20lobby%20Vietnam%2C%20warm%20welcoming%20atmosphere%2C%20professional%20photography&width=1920&height=500&seq=contact-hero&orientation=landscape"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/30 to-transparent"></div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-10 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Link to="/" className="hover:text-gold transition-colors cursor-pointer">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-gold">Liên Hệ</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-bold">Liên Hệ Với Chúng Tôi</h1>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 lg:grid-cols-5 gap-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Left - Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="inline-block text-gold text-xs font-medium tracking-[0.25em] uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-3">Thông Tin Liên Hệ</span>
                <h2 className="font-serif text-2xl md:text-3xl text-brown font-bold">Chúng Tôi Luôn<br />Sẵn Sàng Hỗ Trợ</h2>
              </div>

              <div className="space-y-4">
                {[
                  { icon: 'ri-phone-line', label: 'Điện thoại', value: '088.880.8818', href: 'tel:0888808818' },
                  { icon: 'ri-mail-line', label: 'Email', value: 'tgpvlong305@gmail.com', href: 'mailto:tgpvlong305@gmail.com' },
                  { icon: 'ri-chat-3-line', label: 'Zalo', value: '088.880.8818', href: 'https://zalo.me/0888808818' },
                  { icon: 'ri-whatsapp-line', label: 'WhatsApp', value: '+84 888 808 818', href: 'https://wa.me/84888808818' },
                  { icon: 'ri-facebook-line', label: 'Facebook', value: 'The Muse Hotel Hải Phòng', href: 'https://www.facebook.com/themusehotelhaiphong' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'nofollow noreferrer' : undefined}
                    className="flex items-center gap-4 bg-white rounded-xl p-4 hover:border-gold border border-transparent transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-gold/10 rounded-lg flex-shrink-0">
                      <i className={`${item.icon} text-gold text-lg`}></i>
                    </div>
                    <div>
                      <div className="text-brown/50 text-xs">{item.label}</div>
                      <div className="text-brown font-medium text-sm">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick Connect */}
              <div className="bg-gold/10 rounded-2xl p-5">
                <h3 className="font-serif text-base font-bold text-brown mb-3">Kết Nối Nhanh</h3>
                <div className="flex gap-3">
                  <a
                    href="https://zalo.me/0888808818"
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white text-sm font-medium py-3 rounded-xl cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-chat-3-fill"></i> Zalo
                  </a>
                  <a
                    href="https://www.facebook.com/themusehotelhaiphong"
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2] text-white text-sm font-medium py-3 rounded-xl cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-facebook-fill"></i> Messenger
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-white rounded-2xl p-5">
                <h3 className="font-serif text-base font-bold text-brown mb-3">Giờ Làm Việc</h3>
                <div className="space-y-2 text-sm text-brown/60">
                  <div className="flex justify-between">
                    <span>Lễ tân</span>
                    <span className="font-medium text-brown">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nhà hàng</span>
                    <span className="font-medium text-brown">6:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spa & Pool</span>
                    <span className="font-medium text-brown">7:00 - 21:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form & Map */}
            <div className="lg:col-span-3 space-y-6">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-6 md:p-8">
                <h3 className="font-serif text-xl text-brown font-bold mb-5">Gửi Tin Nhắn</h3>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
                    <i className="ri-check-circle-line"></i>
                    Cảm ơn! Chúng tôi sẽ phản hồi bạn sớm nhất có thể.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
                    <i className="ri-error-warning-line"></i>
                    Có lỗi xảy ra. Vui lòng thử lại.
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  data-readdy-form
                  id="contact-form"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-brown/70 block mb-1">Họ và tên *</label>
                      <input required name="name" type="text" placeholder="Nguyễn Văn A" className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-brown bg-cream focus:outline-none focus:border-gold transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-brown/70 block mb-1">Số điện thoại *</label>
                      <input required name="phone" type="tel" placeholder="0989 800 618" className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-brown bg-cream focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-brown/70 block mb-1">Email *</label>
                    <input required name="email" type="email" placeholder="email@example.com" className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-brown bg-cream focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-brown/70 block mb-1">Chủ đề</label>
                    <select name="subject" className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-brown bg-cream focus:outline-none focus:border-gold transition-colors cursor-pointer">
                      <option value="">Chọn chủ đề...</option>
                      <option value="booking">Đặt phòng</option>
                      <option value="inquiry">Hỏi thông tin</option>
                      <option value="feedback">Phản hồi dịch vụ</option>
                      <option value="event">Sự kiện & Tiệc</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-brown/70 block mb-1">
                      Tin nhắn *
                      <span className={`ml-2 ${charCount > 450 ? 'text-red-500' : 'text-brown/40'}`}>{charCount}/500</span>
                    </label>
                    <textarea
                      required
                      name="message"
                      maxLength={500}
                      rows={4}
                      placeholder="Nội dung tin nhắn của bạn..."
                      className="w-full border border-cream-dark rounded-xl px-4 py-2.5 text-sm text-brown bg-cream focus:outline-none focus:border-gold transition-colors resize-none"
                      onChange={(e) => {
                        setCharCount(e.target.value.length);
                        if (e.target.value.length > 500) {
                          e.target.value = e.target.value.substring(0, 500);
                        }
                      }}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-dark text-white text-sm font-medium py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    <i className="ri-send-plane-line"></i>
                    Gửi Tin Nhắn
                  </button>
                </form>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden">
                {/* Map Tabs */}
                <div className="flex border-b border-cream-dark">
                  {properties.map((p, i) => (
                    <button
                      key={p.name}
                      onClick={() => setActiveMap(i)}
                      className={`flex-1 text-xs font-medium py-3 px-2 transition-colors whitespace-nowrap cursor-pointer ${activeMap === i ? 'text-gold border-b-2 border-gold' : 'text-brown/60 hover:text-brown'}`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
                <div className="h-64">
                  <iframe
                    src={properties[activeMap].mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Bản đồ ${properties[activeMap].name}`}
                  ></iframe>
                </div>
                <div className="p-4 flex items-center gap-3 text-sm text-brown/60">
                  <i className="ri-map-pin-line text-gold flex-shrink-0"></i>
                  <span>{properties[activeMap].address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
