import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { articles } from '../../mocks/articles';

const categories = ['Tất Cả', 'Giới Thiệu', 'Trải Nghiệm', 'Ẩm Thực', 'Kinh Nghiệm', 'Điểm Đến', 'Sự Kiện', 'Lifestyle', 'Gia Đình', 'Hướng Dẫn'];

export default function BlogPage() {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tất Cả');

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setVisible(true), 100);
  }, []);

  const filtered = activeCategory === 'Tất Cả' ? articles : articles.filter(a => a.category === activeCategory);
  const [featured, ...rest] = filtered;

  return (
    <main className="bg-cream font-sans min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=travel%20blog%20beautiful%20Hai%20Phong%20Vietnam%20coastal%20scene%2C%20Doi%20Rong%20resort%20aerial%20view%2C%20turquoise%20sea%20white%20sand%2C%20lush%20tropical%20scenery%2C%20stunning%20panoramic%20coastal%20landscape%20Vietnam&width=1920&height=600&seq=blog-hero&orientation=landscape"
          alt="Blog du lịch Đồi Rồng"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/80 via-brown/30 to-transparent"></div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-10 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <Link to="/" className="hover:text-gold transition-colors cursor-pointer">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-gold">Blog Du Lịch</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-white font-bold">Blog Du Lịch</h1>
            <p className="text-white/70 text-sm mt-2">Khám phá khu du lịch quốc tế Đồi Rồng Hải Phòng</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">

          {/* Category Filter */}
          <div className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${activeCategory === cat ? 'bg-gold text-white' : 'bg-cream-dark text-brown/70 hover:bg-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {featured && (
            <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link to={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300 block">
                <div className="relative h-72 lg:h-auto overflow-hidden">
                  <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-white text-xs px-3 py-1 rounded-full font-medium">Nổi Bật</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-gold font-medium bg-gold/10 px-3 py-1 rounded-full">{featured.category}</span>
                    <span className="text-xs text-brown/40">{featured.readTime} phút đọc</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-brown font-bold mb-3 leading-snug group-hover:text-gold transition-colors">{featured.title}</h2>
                  <p className="text-brown/60 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-brown/40">{new Date(featured.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                    <span className="text-gold text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Đọc thêm <i className="ri-arrow-right-line"></i>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <Link
                key={article.id}
                to={`/blog/${article.slug}`}
                className={`group bg-white rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-500 block ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${(i + 1) * 80}ms` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-brown/80 text-white text-xs px-2.5 py-0.5 rounded-full">{article.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base text-brown font-bold mb-2 leading-snug group-hover:text-gold transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-brown/50 text-xs leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-brown/40">
                    <span>{new Date(article.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1">
                      <i className="ri-time-line"></i> {article.readTime} phút
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-brown/40">
              <i className="ri-article-line text-5xl mb-3 block"></i>
              <p>Không có bài viết trong danh mục này.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 md:px-10 lg:px-16 bg-muse-green">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-white font-bold mb-3">Sẵn Sàng Khám Phá Đồi Rồng?</h2>
          <p className="text-white/60 text-sm mb-6">Đặt phòng tại The Muse Hotel Hải Phòng ngay tại khu du lịch quốc tế Đồi Rồng</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/rooms" className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-medium px-8 py-3.5 rounded-full transition-colors whitespace-nowrap cursor-pointer">
              Đặt Phòng Ngay <i className="ri-arrow-right-line"></i>
            </Link>
            <a href="https://zalo.me/0888808818" target="_blank" rel="nofollow noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:border-gold hover:text-gold text-sm font-medium px-8 py-3.5 rounded-full transition-colors whitespace-nowrap cursor-pointer">
              <i className="ri-chat-3-line"></i> Tư Vấn Qua Zalo
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
