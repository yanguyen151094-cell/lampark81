import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FloatingContacts from '@/components/feature/FloatingContacts';
import BlogCard from '../components/BlogCard';
import { useLang } from '@/context/LanguageContext';
import { useDataStore } from '@/context/DataStore';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const { blogs } = useDataStore();

  const post = blogs.find((b) => b.slug === slug);
  const related = blogs.filter((b) => b.id !== post?.id && b.category === post?.category).slice(0, 3);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-gray-500 mb-4">{lang === 'en' ? 'Article not found' : 'Bài viết không tồn tại'}</p>
          <Link to="/blog" className="text-amber-500 font-semibold hover:underline cursor-pointer">
            {lang === 'en' ? '← Back to blog' : '← Về danh sách blog'}
          </Link>
        </div>
      </div>
    );
  }

  const title = lang === 'en' ? post.titleEn : post.titleVi;
  const content = lang === 'en' ? post.contentEn : post.contentVi;
  const metaTitle = lang === 'en' ? post.metaTitleEn : post.metaTitleVi;
  const metaDesc = lang === 'en' ? post.metaDescriptionEn : post.metaDescriptionVi;

  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-lg font-bold text-gray-800 mt-6 mb-2">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-gray-900 mt-3">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-gray-700 text-base leading-relaxed ml-4 list-disc">{line.replace('- ', '')}</li>;
      }
      if (line.trim() === '') return <div key={i} className="h-2" />;
      const formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} className="text-gray-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[320px] md:h-[480px] w-full overflow-hidden pt-16">
        <img src={post.image} alt={title} className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">{post.category}</span>
              <span className="text-white/70 text-xs flex items-center gap-1">
                <i className="ri-calendar-line"></i>
                {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="text-white/70 text-xs flex items-center gap-1">
                <i className="ri-time-line"></i>
                {post.readTime} {lang === 'en' ? 'min read' : 'phút đọc'}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">{title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-10" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
              <div className="prose max-w-none space-y-2">
                {renderContent(content)}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-600 mb-3">{lang === 'en' ? 'Share article:' : 'Chia sẻ bài viết:'}</p>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.facebook.com/share/1HtJrPrJY1/?mibextid=wwXIfr`}
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-amber-400 hover:text-gray-900 text-gray-600 rounded-full transition-all cursor-pointer"
                  >
                    <i className="ri-facebook-fill text-base"></i>
                  </a>
                  <a
                    href={`https://zalo.me/0377038202`}
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-amber-400 hover:text-gray-900 rounded-full transition-all cursor-pointer"
                  >
                    <span className="font-black text-sm text-blue-600">Z</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="mt-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-amber-600 font-semibold text-sm hover:text-amber-700 cursor-pointer"
              >
                <i className="ri-arrow-left-line"></i>
                {lang === 'en' ? 'Back to all articles' : 'Xem tất cả bài viết'}
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
            >
              <h3 className="font-bold text-lg text-gray-900 mb-2">LamPark81</h3>
              <p className="text-gray-900/80 text-sm mb-4">
                {lang === 'en'
                  ? 'Modern apartments in central HCMC. Book now for the best price!'
                  : 'Phòng hiện đại tại trung tâm TP.HCM. Đặt phòng ngay để có giá tốt nhất!'}
              </p>
              <Link
                to="/search"
                className="block text-center bg-gray-900 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {lang === 'en' ? 'Book Now' : 'Đặt phòng ngay'}
              </Link>
              <a
                href="tel:0377038202"
                className="block text-center mt-2 text-gray-900 font-semibold text-sm py-2 cursor-pointer"
              >
                <i className="ri-phone-line mr-1"></i> 0377 038 202
              </a>
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-4">
                  {lang === 'en' ? 'Related Articles' : 'Bài viết liên quan'}
                </h3>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to={`/blog/${r.slug}`}
                      className="flex gap-3 group cursor-pointer"
                    >
                      <img
                        src={r.image}
                        alt={lang === 'en' ? r.titleEn : r.titleVi}
                        className="w-20 h-16 object-cover object-top rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
                          {lang === 'en' ? r.titleEn : r.titleVi}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <i className="ri-time-line"></i>
                          {r.readTime} {lang === 'en' ? 'min' : 'phút'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All blogs */}
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <h3 className="font-bold text-gray-900 text-base mb-4">
                {lang === 'en' ? 'Recent Articles' : 'Bài viết mới nhất'}
              </h3>
              <div className="space-y-3">
                {blogs.slice(0, 5).map((b) => (
                  <Link
                    key={b.id}
                    to={`/blog/${b.slug}`}
                    className="flex items-start gap-2 group cursor-pointer"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0"></div>
                    <p className="text-sm text-gray-600 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                      {lang === 'en' ? b.titleEn : b.titleVi}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingContacts />
    </div>
  );
}
