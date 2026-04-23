import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import FloatingContacts from '@/components/feature/FloatingContacts';
import BlogCard from './components/BlogCard';
import { useLang } from '@/context/LanguageContext';
import { useDataStore } from '@/context/DataStore';

const CATEGORIES_VI = ['Tất cả', 'Du lịch', 'Địa điểm', 'Lịch sử', 'Ẩm thực & Giải trí', 'Kiến trúc', 'Trải nghiệm', 'Văn hóa', 'Giải trí', 'Hướng dẫn', 'LamPark81'];
const CATEGORIES_EN = ['All', 'Travel', 'Places', 'History', 'Food & Entertainment', 'Architecture', 'Experiences', 'Culture', 'Entertainment', 'Guides', 'LamPark81'];

const categoryMap: Record<string, string> = {
  'Du lịch': 'Travel', 'Địa điểm': 'Places', 'Lịch sử': 'History',
  'Ẩm thực & Giải trí': 'Food & Entertainment', 'Kiến trúc': 'Architecture',
  'Trải nghiệm': 'Experiences', 'Văn hóa': 'Culture', 'Giải trí': 'Entertainment',
  'Hướng dẫn': 'Guides', 'LamPark81': 'LamPark81',
};

export default function BlogPage() {
  const { lang } = useLang();
  const { blogs } = useDataStore();
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState('');

  const publishedBlogs = blogs.filter((b) => b.published);

  const categories = lang === 'en' ? CATEGORIES_EN : CATEGORIES_VI;
  const categoriesVi = CATEGORIES_VI;

  const filtered = publishedBlogs.filter((post) => {
    const matchCat = activeCategory === 0 || post.category === categoriesVi[activeCategory];
    const title = lang === 'en' ? post.titleEn : post.titleVi;
    const excerpt = lang === 'en' ? post.excerptEn : post.excerptVi;
    const matchSearch = !search || title.toLowerCase().includes(search.toLowerCase()) || excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = publishedBlogs[publishedBlogs.length - 1];
  const featuredTitle = lang === 'en' ? featured.titleEn : featured.titleVi;
  const featuredExcerpt = lang === 'en' ? featured.excerptEn : featured.excerptVi;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section
        className="relative h-[360px] md:h-[440px] flex items-end pb-12 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://readdy.ai/api/search-image?query=Ho%20Chi%20Minh%20City%20Vietnam%20aerial%20panoramic%20view%20Saigon%20river%20skyline%20buildings%20travel%20photography%20magazine%20cover%20artistic&width=1400&height=600&seq=bloghero&orientation=landscape"
            alt="Blog hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
              {lang === 'en' ? 'Travel Blog' : 'Blog Du Lịch'}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              {lang === 'en'
                ? 'Explore Ho Chi Minh City with LamPark81'
                : 'Khám Phá TP. Hồ Chí Minh Cùng LamPark81'}
            </h1>
            <p className="text-white/80 text-base md:text-lg">
              {lang === 'en'
                ? '15 in-depth articles about tourist attractions, cuisine, and culture of Saigon'
                : '15 bài viết chuyên sâu về địa điểm du lịch, ẩm thực và văn hóa Sài Gòn'}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        {/* Search */}
        <div className="bg-white rounded-2xl p-5 mb-8" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'en' ? 'Search articles...' : 'Tìm kiếm bài viết...'}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(i)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === i
                  ? 'bg-amber-400 text-gray-900'
                  : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600'
              }`}
              style={{ boxShadow: activeCategory === i ? 'none' : '0 1px 8px rgba(0,0,0,0.06)' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {activeCategory === 0 && !search && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group block bg-white rounded-2xl overflow-hidden mb-10 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.08)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-80 overflow-hidden">
                <img
                  src={featured.image}
                  alt={featuredTitle}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                    {lang === 'en' ? 'Featured' : 'Nổi bật'}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-snug mb-3 group-hover:text-amber-600 transition-colors">
                  {featuredTitle}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{featuredExcerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <i className="ri-calendar-line"></i>
                    {new Date(featured.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-time-line"></i>
                    {featured.readTime} {lang === 'en' ? 'min read' : 'phút đọc'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
              <i className="ri-article-line text-2xl text-gray-400"></i>
            </div>
            <p className="text-gray-500 text-base">
              {lang === 'en' ? 'No articles found' : 'Không tìm thấy bài viết nào'}
            </p>
          </div>
        )}
      </div>

      <Footer />
      <FloatingContacts />
    </div>
  );
}
