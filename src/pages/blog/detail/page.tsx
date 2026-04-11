import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import { articles } from '../../../mocks/articles';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = articles.find(a => a.slug === slug);
  const related = articles.filter(a => a.slug !== slug && a.category === article?.category).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!article) navigate('/blog');
  }, [slug, article, navigate]);

  if (!article) return null;

  return (
    <main className="bg-cream font-sans min-h-screen">
      <Navbar />

      {/* Cover */}
      <section className="relative h-72 md:h-[450px] flex items-end overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/40 to-transparent"></div>
        <div className="relative z-10 px-6 md:px-10 lg:px-16 pb-10 w-full">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-3 flex-wrap">
              <Link to="/" className="hover:text-gold transition-colors cursor-pointer">Trang Chủ</Link>
              <i className="ri-arrow-right-s-line"></i>
              <Link to="/blog" className="hover:text-gold transition-colors cursor-pointer">Blog</Link>
              <i className="ri-arrow-right-s-line"></i>
              <span className="text-gold truncate max-w-xs">{article.title}</span>
            </div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="bg-gold/80 text-white text-xs px-3 py-1 rounded-full font-medium">{article.category}</span>
              <span className="text-white/60 text-xs flex items-center gap-1"><i className="ri-time-line"></i>{article.readTime} phút đọc</span>
              <span className="text-white/60 text-xs">{new Date(article.date).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
            <h1 className="font-serif text-2xl md:text-4xl text-white font-bold leading-snug max-w-3xl">{article.title}</h1>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Main Content */}
            <article className="lg:col-span-2">
              <p className="text-brown/70 text-base leading-relaxed italic mb-8 border-l-4 border-gold pl-5">{article.excerpt}</p>

              <div
                className="prose prose-sm max-w-none text-brown/70 leading-relaxed
                  [&_h2]:font-serif [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:text-brown [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
                  [&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-brown [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3
                  [&_p]:mb-4 [&_p]:leading-relaxed
                  [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:space-y-1
                  [&_li]:text-brown/70 [&_li]:text-sm
                  [&_strong]:text-brown [&_strong]:font-semibold
                  [&_em]:text-gold [&_em]:not-italic [&_em]:font-medium"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-cream-dark">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-xs bg-cream-dark px-3 py-1 rounded-full text-brown/60 cursor-pointer hover:bg-gold/10 hover:text-gold transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 p-5 bg-white rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-brown mb-1">Chia sẻ bài viết</p>
                  <p className="text-xs text-brown/40">Hữu ích? Chia sẻ với bạn bè của bạn!</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-[#1877F2]/10 text-[#1877F2] rounded-lg hover:bg-[#1877F2] hover:text-white transition-colors cursor-pointer"
                  >
                    <i className="ri-facebook-fill text-sm"></i>
                  </a>
                  <a
                    href={`https://zalo.me/share/url?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-gold/10 text-gold rounded-lg hover:bg-gold hover:text-white transition-colors cursor-pointer"
                  >
                    <i className="ri-chat-3-fill text-sm"></i>
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Booking CTA */}
              <div className="bg-muse-green rounded-2xl p-6 text-white">
                <h3 className="font-serif text-lg font-bold mb-2">Đặt Phòng Tại Đồi Rồng</h3>
                <p className="text-white/60 text-xs mb-5">The Muse Hotel Hải Phòng – Boutique hotel ngay tại khu du lịch quốc tế Đồi Rồng</p>
                <Link
                  to="/rooms"
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-white text-sm font-medium py-3 rounded-full transition-colors whitespace-nowrap cursor-pointer mb-3"
                >
                  Xem Phòng & Giá <i className="ri-arrow-right-line"></i>
                </Link>
                <a
                  href="https://zalo.me/0888808818"
                  target="_blank"
                  rel="nofollow noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-white/30 text-white hover:border-gold hover:text-gold text-sm font-medium py-3 rounded-full transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-chat-3-line"></i> Tư Vấn Zalo
                </a>
              </div>

              {/* Contact Quick */}
              <div className="bg-white rounded-2xl p-6 border border-cream-dark">
                <h3 className="font-serif text-base font-bold text-brown mb-4">Liên Hệ Nhanh</h3>
                <div className="space-y-3">
                  <a href="tel:0888808818" className="flex items-center gap-3 text-sm text-brown/70 hover:text-gold transition-colors cursor-pointer">
                    <div className="w-8 h-8 flex items-center justify-center bg-gold/10 rounded-lg flex-shrink-0">
                      <i className="ri-phone-line text-gold text-sm"></i>
                    </div>
                    088.880.8818
                  </a>
                  <a href="https://www.facebook.com/themusehotelhaiphong" target="_blank" rel="nofollow noreferrer" className="flex items-center gap-3 text-sm text-brown/70 hover:text-gold transition-colors cursor-pointer">
                    <div className="w-8 h-8 flex items-center justify-center bg-gold/10 rounded-lg flex-shrink-0">
                      <i className="ri-facebook-line text-gold text-sm"></i>
                    </div>
                    Facebook Fanpage
                  </a>
                  <a href="https://zalo.me/0888808818" target="_blank" rel="nofollow noreferrer" className="flex items-center gap-3 text-sm text-brown/70 hover:text-gold transition-colors cursor-pointer">
                    <div className="w-8 h-8 flex items-center justify-center bg-gold/10 rounded-lg flex-shrink-0">
                      <i className="ri-chat-3-line text-gold text-sm"></i>
                    </div>
                    Zalo: 088.880.8818
                  </a>
                </div>
              </div>

              {/* Related Posts */}
              {related.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-cream-dark">
                  <h3 className="font-serif text-base font-bold text-brown mb-4">Bài Viết Liên Quan</h3>
                  <div className="space-y-4">
                    {related.map(rel => (
                      <Link key={rel.id} to={`/blog/${rel.slug}`} className="flex gap-3 group cursor-pointer">
                        <div className="w-16 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                          <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div>
                          <p className="text-xs text-brown/80 font-medium leading-snug group-hover:text-gold transition-colors line-clamp-2">{rel.title}</p>
                          <p className="text-xs text-brown/40 mt-1">{rel.readTime} phút đọc</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* All Articles */}
              <Link to="/blog" className="block w-full text-center border border-gold text-gold hover:bg-gold hover:text-white text-sm font-medium py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap">
                Xem Tất Cả Bài Viết
              </Link>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
